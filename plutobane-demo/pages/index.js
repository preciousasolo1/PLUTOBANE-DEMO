import { useState, useMemo } from "react";

// PLUTOBANE — minimalist streetwear storefront (DEMO MODE — NO PAYMENT PROCESSING)
// Palette: Black #000000 · White #FFFFFF · Space Grey #8A8D91 · Midnight Blue #0C1A3A
// Type: Arial throughout. Display weight 900 for the wordmark.

const C = {
  black: "#000000",
  white: "#FFFFFF",
  grey: "#8A8D91",
  greyLight: "#D6D8DB",
  greyPale: "#F2F3F4",
  midnight: "#0C1A3A",
};

const PRODUCTS = [
  { id: "p1", name: "Black Hoodie", type: "Pullover", price: 40, colour: "black", desc: "Heavyweight 340gsm brushed fleece. Dropped shoulder, boxy cut. Made in Portugal at a GOTS-certified mill." },
  { id: "p2", name: "Black Tech Zip Hoodie", type: "Full zip", price: 55, colour: "black", desc: "Engraved metal zip pull. Bonded fleece with a flat interior seam. Built for movement." },
  { id: "p3", name: "Grey Hoodie", type: "Pullover", price: 40, colour: "grey", desc: "Space grey marl. Same 340gsm fleece as the black. Ribbed cuff and hem." },
  { id: "p4", name: "Black Baggy Bottoms", type: "Bottoms", price: 35, colour: "black", desc: "Wide straight leg, drawcord waist, deep pockets. Cut to sit over the shoe." },
  { id: "p5", name: "Grey Baggy Bottoms", type: "Bottoms", price: 35, colour: "grey", desc: "Matches the grey hoodie exactly. Same mill, same dye lot." },
  { id: "p6", name: "Black T", type: "Tee", price: 15, colour: "black", desc: "220gsm organic cotton. Plain. Because culture is loud enough." },
  { id: "p7", name: "White T", type: "Tee", price: 15, colour: "white", desc: "220gsm organic cotton. The uniform." },
  { id: "p8", name: "Crew Cap", type: "Accessory", price: 14, colour: "black", desc: "Unstructured six panel. Tonal stitch mark on the inside band." },
  { id: "p9", name: "Socks (3 pack)", type: "Accessory", price: 8, colour: "black", desc: "Ribbed crew length. One black, one grey, one white." },
  { id: "p10", name: "Founding Bundle", type: "Bundle", price: 95, colour: "black", desc: "Hoodie, bottoms, tee and cap. First 500 orders carry the founding tag." },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

// Minimal garment silhouettes drawn in SVG
function Garment({ type, colour, size = 200 }) {
  const fill = colour === "black" ? C.black : colour === "grey" ? C.grey : C.white;
  const stroke = colour === "white" ? C.greyLight : fill;
  const common = { fill, stroke, strokeWidth: 2, strokeLinejoin: "round" };
  return (
    <svg width="100%" viewBox="0 0 200 200" role="img" aria-label={`${colour} ${type}`}>
      <rect width="200" height="200" fill={C.greyPale} />
      {(type === "Pullover" || type === "Full zip") && (
        <g>
          <path d="M60 60 L40 70 L28 120 L52 126 L52 178 L148 178 L148 126 L172 120 L160 70 L140 60 Q100 82 60 60 Z" {...common} />
          <path d="M72 58 Q100 44 128 58 Q118 74 100 76 Q82 74 72 58 Z" {...common} />
          {type === "Full zip" && <line x1="100" y1="76" x2="100" y2="178" stroke={colour === "black" ? C.grey : C.black} strokeWidth="2" />}
          <rect x="70" y="140" width="60" height="26" fill="none" stroke={colour === "black" ? "#222" : colour === "grey" ? "#6E7175" : C.greyLight} strokeWidth="1.5" />
        </g>
      )}
      {type === "Bottoms" && (
        <g>
          <path d="M62 30 L138 30 L146 178 L108 178 L100 90 L92 178 L54 178 Z" {...common} />
          <rect x="62" y="30" width="76" height="10" fill={colour === "black" ? "#222" : colour === "grey" ? "#6E7175" : C.greyLight} />
        </g>
      )}
      {type === "Tee" && (
        <path d="M66 52 L44 62 L36 96 L58 102 L58 168 L142 168 L142 102 L164 96 L156 62 L134 52 Q100 68 66 52 Z" {...common} />
      )}
      {type === "Accessory" && (
        <g>
          <path d="M50 120 Q50 70 100 70 Q150 70 150 120 Z" {...common} />
          <path d="M40 120 L160 120 L172 132 L28 132 Z" {...common} />
        </g>
      )}
      {type === "Bundle" && (
        <g>
          <path d="M40 60 L100 40 L160 60 L160 150 L100 170 L40 150 Z" fill={C.midnight} stroke={C.midnight} strokeWidth="2" />
          <path d="M40 60 L100 80 L160 60" fill="none" stroke={C.white} strokeWidth="2" />
          <line x1="100" y1="80" x2="100" y2="170" stroke={C.white} strokeWidth="2" />
        </g>
      )}
    </svg>
  );
}

function fmt(n) {
  return `£${n.toFixed(2)}`;
}

export default function PlutobaneSite() {
  const [view, setView] = useState("home");
  const [selected, setSelected] = useState(null);
  const [size, setSize] = useState("M");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [payMethod, setPayMethod] = useState("card");
  const [placed, setPlaced] = useState(null);
  const [email, setEmail] = useState("");

  const subtotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]);
  const shipping = subtotal === 0 ? 0 : subtotal >= 80 ? 0 : 4.5;
  const total = subtotal + shipping;
  const fund = total * 0.05;

  const BTC_GBP = 76500;
  const ETH_GBP = 2950;

  function addToCart(p, sz) {
    setCart((c) => {
      const key = `${p.id}-${sz}`;
      const found = c.find((i) => i.key === key);
      if (found) return c.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { key, id: p.id, name: p.name, price: p.price, size: sz, qty: 1, type: p.type, colour: p.colour }];
    });
    setSelected(null);
    setCartOpen(true);
  }

  function setQty(key, qty) {
    setCart((c) => (qty <= 0 ? c.filter((i) => i.key !== key) : c.map((i) => (i.key === key ? { ...i, qty } : i))));
  }

  function placeOrder() {
    const ref = `PB-${Date.now().toString().slice(-6)}`;
    setPlaced({ ref, method: payMethod, total, fund });
    setCart([]);
    setCheckout(false);
    setCartOpen(false);
  }

  const nav = [
    ["shop", "Shop"],
    ["mission", "Mission"],
    ["crew", "Crew"],
    ["journal", "Journal"],
  ];

  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", color: C.black, background: C.white, minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 30, background: C.white, borderBottom: `1px solid ${C.greyLight}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => setView("home")} style={{ background: "none", border: 0, cursor: "pointer", fontWeight: 900, fontSize: 20, letterSpacing: 2, color: C.black }}>
            PLUTOBANE
          </button>
          <nav style={{ display: "flex", gap: 22 }}>
            {nav.map(([k, label]) => (
              <button key={k} onClick={() => setView(k)} style={{ background: "none", border: 0, cursor: "pointer", fontSize: 14, fontWeight: view === k ? 700 : 400, color: view === k ? C.black : C.grey }}>
                {label}
              </button>
            ))}
          </nav>
          <button onClick={() => setCartOpen(true)} style={{ background: "none", border: 0, cursor: "pointer", fontSize: 14, fontWeight: 700, position: "relative" }}>
            Bag {cart.length > 0 && <span style={{ position: "absolute", top: -8, right: -12, background: C.midnight, color: C.white, width: 18, height: 18, borderRadius: "50%", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{cart.length}</span>}
          </button>
        </div>
      </header>

      {placed && (
        <div style={{ background: C.greyPale, padding: 20, textAlign: "center", borderBottom: `1px solid ${C.greyLight}` }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 8 }}>Order confirmed</div>
            <div style={{ color: C.grey }}>Reference: <span style={{ fontWeight: 700, color: C.black }}>{placed.ref}</span></div>
            <div style={{ color: C.grey, marginTop: 8, fontSize: 14 }}>Total: <span style={{ fontWeight: 700, color: C.black }}>{fmt(placed.total)}</span> • Community fund: <span style={{ fontWeight: 700 }}>{fmt(placed.fund)}</span></div>
            <div style={{ marginTop: 12, color: C.grey, fontSize: 13 }}>In demo mode. Real orders will include payment processing and dispatch tracking.</div>
            <button onClick={() => setPlaced(null)} style={{ marginTop: 12, background: C.black, color: C.white, border: 0, padding: "8px 16px", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>Dismiss</button>
          </div>
        </div>
      )}

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: 40 }}>
        {view === "home" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: 3, marginBottom: 20 }}>PLUTOBANE</div>
              <div style={{ fontSize: 20, lineHeight: 1.6, maxWidth: 600, margin: "0 auto", color: C.grey }}>
                Plain basics. Made properly. At a named mill in Portugal from certified organic cotton at a living wage. Five percent of every order goes to the crew to vote on, every month. No advertising. Just culture.
              </div>
              <button onClick={() => setView("shop")} style={{ marginTop: 30, background: C.black, color: C.white, border: 0, padding: "14px 28px", cursor: "pointer", fontSize: 16, fontWeight: 700 }}>Shop now</button>
            </div>
          </div>
        )}

        {view === "shop" && (
          <div>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 24 }}>Shop</div>
              <ProductGrid products={PRODUCTS} onOpen={(p) => setSelected(p)} />
            </div>
          </div>
        )}

        {view === "mission" && (
          <div style={{ maxWidth: 700 }}>
            <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 24 }}>Mission</div>
            <div style={{ lineHeight: 1.8, color: C.grey, fontSize: 15 }}>
              <p>PLUTOBANE is a plain basics brand for UK street culture. We make ten pieces in black, space grey and white. All are made at a named mill in Portugal from GOTS-certified organic cotton, cut and sewn at a living wage.</p>
              <p>We publish the full cost of every product on the page. We grow through a Discord community rather than through paid advertising. We use pre-orders rather than overproduction, so we destroy nothing.</p>
              <p>Five percent of every order goes into a fund that the crew votes on each month. The money has paid for murals, skate spots and studios across London.</p>
              <p>We are run by Precious (Temi) Asolo, who spent five years in transformation consulting at TCS, Grant Thornton, King and Wood Mallesons and Continuate. PLUTOBANE applies that operating discipline to a culture that has never had institutional backing.</p>
              <p style={{ marginTop: 24, fontWeight: 700 }}>The creed: plain clothes, made properly, at a named mill. Five percent of every order to the streets. Nothing we cannot prove. Early access and a vote for everyone in the room.</p>
            </div>
          </div>
        )}

        {view === "crew" && (
          <div style={{ maxWidth: 700 }}>
            <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 24 }}>Crew</div>
            <div style={{ lineHeight: 1.8, color: C.grey, fontSize: 15 }}>
              <p>PLUTOBANE is run by a small crew. Members include designers, photographers, makers, and culture workers across London, Manchester, Bristol, and beyond.</p>
              <p>We use Discord as our operating system. It is where the crew votes on designs, where the community fund is allocated, and where early access happens. No algorithm. No advertising.</p>
              <p>We are always looking for collaborators. If you want to work with us on production, photography, events, or community, reach out to the Discord.</p>
            </div>
          </div>
        )}

        {view === "journal" && (
          <div style={{ maxWidth: 700 }}>
            <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 24 }}>Journal</div>
            <div style={{ lineHeight: 1.8, color: C.grey, fontSize: 15 }}>
              <p>The PLUTOBANE Journal is a monthly publication of photography, interviews, and essays from the crew and community. It documents the streets, the culture, and the people who make it.</p>
              <p>Every edition is available free to the Discord community. Print editions are made in limited runs and sold through the site.</p>
              <p>Recent editions have featured skate spots, murals, and studio visits across London. Upcoming editions will expand to Manchester, Bristol, and beyond.</p>
            </div>
          </div>
        )}
      </main>

      {/* Product detail modal */}
      {selected && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={() => setSelected(null)} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)" }} />
          <div style={{ position: "relative", zIndex: 41, background: C.white, padding: 40, maxWidth: 600, width: "90%", maxHeight: "90vh", overflowY: "auto", borderRadius: 0 }}>
            <button onClick={() => setSelected(null)} style={{ position: "absolute", top: 20, right: 20, background: "none", border: 0, cursor: "pointer", fontSize: 20 }}>✕</button>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
              <div><Garment type={selected.type} colour={selected.colour} /></div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>{selected.name}</div>
                <div style={{ color: C.grey, fontSize: 14, marginBottom: 16 }}>{selected.type}</div>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{fmt(selected.price)}</div>
                <div style={{ color: C.grey, fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>{selected.desc}</div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Size</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                    {SIZES.map((s) => (
                      <button key={s} onClick={() => setSize(s)} style={{ padding: 10, border: `1px solid ${size === s ? C.black : C.greyLight}`, background: size === s ? C.black : C.white, color: size === s ? C.white : C.black, cursor: "pointer", fontWeight: size === s ? 700 : 400, fontSize: 13 }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={() => addToCart(selected, size)} style={{ width: "100%", background: C.black, color: C.white, border: 0, padding: 16, cursor: "pointer", fontWeight: 700, fontSize: 15 }}>Add to bag</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart sidebar */}
      {cartOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 40, display: "flex" }}>
          <div onClick={() => { setCartOpen(false); setCheckout(false); }} style={{ flex: 1, background: "rgba(0,0,0,0.5)" }} />
          <div style={{ width: "min(480px, 100%)", background: C.white, height: "100%", overflowY: "auto", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: 20, borderBottom: `1px solid ${C.greyLight}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 900, fontSize: 20 }}>{checkout ? "Checkout" : "Your bag"}</div>
              <button onClick={() => { setCartOpen(false); setCheckout(false); }} style={{ background: "none", border: 0, cursor: "pointer", fontSize: 14, color: C.grey }}>Close</button>
            </div>

            {!checkout ? (
              <div style={{ padding: 20, flex: 1 }}>
                {cart.length === 0 ? (
                  <div style={{ color: C.grey }}>Your bag is empty. Add something from the shop.</div>
                ) : (
                  cart.map((i) => (
                    <div key={i.key} style={{ display: "grid", gridTemplateColumns: "64px 1fr auto", gap: 12, alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${C.greyLight}` }}>
                      <div style={{ width: 64 }}><Garment type={i.type} colour={i.colour} /></div>
                      <div>
                        <div style={{ fontWeight: 700 }}>{i.name}</div>
                        <div style={{ color: C.grey, fontSize: 13 }}>Size {i.size}</div>
                        <div style={{ display: "flex", gap: 6, marginTop: 6, alignItems: "center" }}>
                          <button onClick={() => setQty(i.key, i.qty - 1)} style={qtyBtn}>−</button>
                          <span style={{ fontSize: 14, minWidth: 18, textAlign: "center" }}>{i.qty}</span>
                          <button onClick={() => setQty(i.key, i.qty + 1)} style={qtyBtn}>+</button>
                        </div>
                      </div>
                      <div style={{ fontWeight: 700 }}>{fmt(i.price * i.qty)}</div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div style={{ padding: 20, flex: 1 }}>
                <div style={{ fontSize: 13, marginBottom: 8 }}>Pay with</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {[["card", "Card"], ["klarna", "Klarna"], ["btc", "Bitcoin"], ["eth", "Ethereum"]].map(([k, label]) => (
                    <button key={k} onClick={() => setPayMethod(k)} style={{ padding: 12, border: `1px solid ${payMethod === k ? C.black : C.greyLight}`, background: payMethod === k ? C.midnight : C.white, color: payMethod === k ? C.white : C.black, cursor: "pointer", fontSize: 14, fontWeight: payMethod === k ? 700 : 400 }}>{label}</button>
                  ))}
                </div>

                <div style={{ marginTop: 20 }}>
                  {payMethod === "card" && (
                    <div style={{ display: "grid", gap: 8 }}>
                      <div style={{ fontSize: 12, color: C.grey, padding: 12, background: C.greyPale }}>DEMO MODE: Payment processing not enabled. In production, Stripe Checkout would open here.</div>
                    </div>
                  )}
                  {payMethod === "klarna" && (
                    <div style={{ padding: 16, background: C.greyPale }}>
                      <div style={{ fontWeight: 700 }}>3 interest free payments of {fmt(total / 3)}</div>
                      <div style={{ fontSize: 13, color: C.grey, marginTop: 6, lineHeight: 1.5 }}>DEMO: In production, you would be taken to Klarna to confirm.</div>
                    </div>
                  )}
                  {payMethod === "btc" && (
                    <div style={{ padding: 16, background: C.greyPale }}>
                      <div style={{ fontWeight: 700 }}>Send {(total / BTC_GBP).toFixed(6)} BTC</div>
                      <div style={{ fontSize: 12, color: C.grey, marginTop: 4 }}>DEMO MODE: In production, Coinbase Commerce would handle crypto payments and auto-convert to GBP.</div>
                    </div>
                  )}
                  {payMethod === "eth" && (
                    <div style={{ padding: 16, background: C.greyPale }}>
                      <div style={{ fontWeight: 700 }}>Send {(total / ETH_GBP).toFixed(5)} ETH</div>
                      <div style={{ fontSize: 12, color: C.grey, marginTop: 4 }}>DEMO MODE: In production, Coinbase Commerce would handle crypto payments and auto-convert to GBP.</div>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: 20, display: "grid", gap: 8 }}>
                  <input placeholder="Email for your receipt" style={inp} aria-label="Email" />
                  <input placeholder="Delivery address" style={inp} aria-label="Address" />
                  <input placeholder="Postcode" style={inp} aria-label="Postcode" />
                </div>
              </div>
            )}

            <div style={{ padding: 20, borderTop: `1px solid ${C.greyLight}`, background: C.white }}>
              <Row label="Subtotal" value={fmt(subtotal)} />
              <Row label="Shipping" value={shipping === 0 ? (subtotal > 0 ? "Free" : "£0.00") : fmt(shipping)} />
              <Row label="Community fund (5%)" value={fmt(fund)} muted />
              <Row label="Total" value={fmt(total)} bold />
              {!checkout ? (
                <button disabled={cart.length === 0} onClick={() => setCheckout(true)} style={{ marginTop: 12, width: "100%", background: cart.length === 0 ? C.greyLight : C.black, color: C.white, border: 0, padding: 16, cursor: cart.length === 0 ? "default" : "pointer", fontWeight: 700, fontSize: 15 }}>
                  Go to checkout
                </button>
              ) : (
                <button onClick={placeOrder} style={{ marginTop: 12, width: "100%", background: C.midnight, color: C.white, border: 0, padding: 16, cursor: "pointer", fontWeight: 700, fontSize: 15 }}>
                  {payMethod === "card" ? `Pay ${fmt(total)}` : payMethod === "klarna" ? "Continue with Klarna" : "I have sent the payment"}
                </button>
              )}
              <div style={{ marginTop: 12, fontSize: 11, color: C.grey, textAlign: "center" }}>Demo mode. No real charges.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const qtyBtn = { width: 26, height: 26, border: `1px solid ${C.greyLight}`, background: C.white, cursor: "pointer", fontSize: 14 };
const inp = { padding: 12, border: `1px solid ${C.greyLight}`, fontSize: 14, fontFamily: "inherit", width: "100%", boxSizing: "border-box" };

function Row({ label, value, bold, muted }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: bold ? 17 : 14, fontWeight: bold ? 900 : 400, color: muted ? C.grey : C.black }}>
      <span>{label}</span><span>{value}</span>
    </div>
  );
}

function ProductGrid({ products, onOpen }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
      {products.map((p) => (
        <button key={p.id} onClick={() => onOpen(p)} style={{ textAlign: "left", background: "none", border: 0, padding: 0, cursor: "pointer", fontFamily: "inherit", color: C.black }}>
          <Garment type={p.type} colour={p.colour} />
          <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</div>
              <div style={{ color: C.grey, fontSize: 13 }}>{p.type}</div>
            </div>
            <div style={{ fontWeight: 700 }}>{fmt(p.price)}</div>
          </div>
        </button>
      ))}
    </div>
  );
}
