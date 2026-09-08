# PLUTOBANE — Quick Start Guide

## Run locally (1 minute)

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:3000
```

Done. Make changes to `pages/index.js` and see them update instantly.

---

## What you can do right now

✅ Browse products  
✅ Add items to bag  
✅ View checkout flow  
✅ Select payment methods  
✅ See order confirmation  
✅ Test on mobile  

---

## Make quick changes

### Change product prices

In `pages/index.js`, find the `PRODUCTS` array:

```javascript
const PRODUCTS = [
  { id: "p1", name: "Black Hoodie", type: "Pullover", price: 40, ... },
  // Change 40 to any number
];
```

Save. It updates instantly.

### Add a new product

```javascript
const PRODUCTS = [
  // ... existing products ...
  { id: "p11", name: "Your new product", type: "Tee", price: 20, colour: "black", desc: "Description here." },
];
```

### Change brand colors

In `pages/index.js`, find the `C` object:

```javascript
const C = {
  black: "#000000",
  white: "#FFFFFF",
  grey: "#8A8D91",
  greyLight: "#D6D8DB",
  greyPale: "#F2F3F4",
  midnight: "#0C1A3A",
};
```

Edit hex values. Colors update everywhere.

### Change text (Mission, Crew, Journal sections)

Find the sections in the component:

```javascript
{view === "mission" && (
  <div style={{ maxWidth: 700 }}>
    <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 24 }}>Mission</div>
    <div style={{ lineHeight: 1.8, color: C.grey, fontSize: 15 }}>
      <p>Edit this text...</p>
    </div>
  </div>
)}
```

Edit the `<p>` content. Saves instantly.

---

## Test payment flow

1. Click "Shop now"
2. Click a product
3. Choose size, click "Add to bag"
4. Click "Bag" (top right)
5. Click "Go to checkout"
6. Select a payment method (Card, Klarna, Bitcoin, Ethereum)
7. Click "Pay" button
8. See order confirmation

All of this works in demo mode. No real charges.

---

## Ready to deploy?

See `DEPLOYMENT_GUIDE.md` for one-click Vercel deployment.

---

## Need help?

- React/Next.js: [nextjs.org/docs](https://nextjs.org/docs)
- JavaScript: [developer.mozilla.org](https://developer.mozilla.org)
- Styling: All CSS is inline (`style={{}}` syntax). No external CSS files.

---

**Have fun building. 🖤**
