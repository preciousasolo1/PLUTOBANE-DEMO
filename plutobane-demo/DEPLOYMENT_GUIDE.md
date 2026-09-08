# PLUTOBANE Deployment Guide

## 🚀 Deploy in 3 minutes

### Step 1: Push to GitHub

```bash
# Navigate to this folder
cd plutobane-demo

# Initialize git (if not already done)
git init
git add .
git commit -m "PLUTOBANE storefront demo"
git branch -M main

# Add your GitHub repo (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/plutobane-demo.git
git push -u origin main
```

### Step 2: Connect Vercel

1. Go to **[vercel.com](https://vercel.com)**
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Select **plutobane-demo** repository
5. Vercel auto-detects Next.js ✅
6. Click **"Deploy"**

**That's it.** Your site is live in 2–3 minutes.

Vercel gives you a URL like: `https://plutobane-demo-abc123.vercel.app`

### Step 3 (Optional): Connect Custom Domain

In Vercel Dashboard → Settings → Domains:
- Add your domain (e.g., `plutobane.co.uk`)
- Update DNS records (Vercel shows exact steps)
- Done

---

## 🔄 Updates

Every time you push to `main`, Vercel automatically redeploys.

```bash
# Make a change
# Edit pages/index.js, for example
git add .
git commit -m "Update product prices"
git push

# Vercel deploys in ~30 seconds. No manual trigger needed.
```

---

## 🛡️ Security

- HTTPS by default (Vercel)
- Security headers enabled (vercel.json)
- No hardcoded secrets
- No environment variables needed for demo mode

---

## 📋 What's included

| Feature | Status |
|---------|--------|
| Shop page | ✅ Live |
| Product grid | ✅ Live |
| Shopping bag | ✅ Live |
| Checkout flow | ✅ Live (demo) |
| Payment UI | ✅ Shows all methods |
| Real Stripe payment | ❌ Not enabled |
| Real crypto payment | ❌ Not enabled |
| Order confirmation | ✅ Live (demo) |
| Mobile responsive | ✅ Live |
| Accessibility | ✅ Live |

---

## 🔌 Add Real Payments (Later)

When ready, contact the PLUTOBANE crew for:
- Stripe API keys
- Coinbase Commerce API key
- Backend setup guide

Then:
1. Create `/pages/api/create-checkout.js` for Stripe
2. Create `/pages/api/create-charge.js` for Coinbase
3. Add environment variables to Vercel
4. Update checkout logic in `pages/index.js`

Detailed payment integration guide: See `PLUTOBANE_Digital_Assets_and_Payments_Policy.docx`

---

## 📞 Support

- GitHub Issues: Report bugs
- Discord: Contact PLUTOBANE crew
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)

---

**You're live. Now go sell some basics.**
