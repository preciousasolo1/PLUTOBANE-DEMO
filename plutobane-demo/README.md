# PLUTOBANE Storefront — Demo Mode

A fully functional e-commerce demo for PLUTOBANE, a plain basics brand for UK street culture.

**No environment variables. No setup. Deploy with one click.**

## What's included

✅ Full storefront (Shop, Mission, Crew, Journal)  
✅ Product catalog (10 pieces: hoodies, tees, bottoms, accessories)  
✅ Shopping bag and checkout flow  
✅ Payment method selector (Card, Klarna, Bitcoin, Ethereum)  
✅ Order confirmation  
✅ Community fund transparency (5% of every order)  
✅ Responsive design (mobile + desktop)  
✅ Security headers (no sniff, no frame, strict referrer)  

**Demo mode:** All orders are simulated locally. No real payments are processed. Perfect for testing, demos, and client reviews.

## Deploy to Vercel (one click)

### Option 1: Direct Vercel Import (Fastest)

1. Click here to deploy: **[Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/YOUR-USERNAME/plutobane-demo)**
   - (First, push this repo to GitHub)

2. Vercel will automatically:
   - Create a production deployment
   - Set up a live URL
   - Enable automatic deploys on every push

Done. Your storefront is live.

### Option 2: Manual GitHub + Vercel

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial PLUTOBANE storefront"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/plutobane-demo.git
   git push -u origin main
   ```

2. **Connect Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Select your GitHub repository
   - Framework preset: **Next.js** (auto-detected)
   - Build command: (leave default)
   - Output directory: (leave default)
   - Click "Deploy"

3. **Wait 2–3 minutes. Your site is live.**

### Option 3: Deploy from this folder (if you have Vercel CLI)

```bash
npm i -g vercel
vercel
```

Follow prompts. Done.

## Local development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
```

## File structure

```
plutobane-demo/
├── pages/
│   └── index.js              # Main storefront component
├── package.json              # Dependencies (Next.js + React)
├── vercel.json              # Security headers
├── README.md                # This file
└── .gitignore              # Git ignore rules
```

## How it works

- **No backend.** Everything runs in the browser.
- **No database.** Orders are simulated locally.
- **No payment processing.** The UI shows all payment methods, but no real charges happen.
- **No environment variables.** Works immediately after deploy.

## Next steps: Add real payments

When you're ready to accept real payments:

1. **Stripe + Klarna:** Get API keys from [dashboard.stripe.com](https://dashboard.stripe.com)
2. **Bitcoin + Ethereum:** Get API key from [commerce.coinbase.com](https://commerce.coinbase.com)
3. Create API routes in `/pages/api/` to handle:
   - `create-checkout.js` (Stripe Checkout sessions)
   - `create-charge.js` (Coinbase Commerce charges)
4. Update `pages/index.js` to call your API routes on checkout
5. Add environment variables to Vercel (Settings → Environment Variables)
6. Redeploy

See the **PLUTOBANE_Digital_Assets_and_Payments_Policy.docx** for the complete policy on payments, crypto, refunds, and accounting.

## Customization

- **Change prices:** Edit `PRODUCTS` array in `pages/index.js`
- **Change colors:** Edit the `C` object (palette)
- **Add product images:** Replace the `<Garment>` SVG with `<img>` tags
- **Change copy:** Edit text in each view section

## Brand guidelines

- **Palette:** Black `#000000`, White `#FFFFFF`, Space Grey `#8A8D91`, Midnight Blue `#0C1A3A`
- **Type:** Arial throughout, 900 weight for wordmark
- **Tone:** Plain. Direct. No fluff.

## Support

For questions or changes, contact the PLUTOBANE crew on Discord.

---

**Version 1.0 | September 2026 | Plutobane Ltd, Gravesend, Kent**
