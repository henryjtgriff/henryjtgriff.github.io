# Budget Birdies — website files

## Pages
- `index.html` — Home
- `shop.html` — Shop hub (choose Brands or Bundles)
  - `shop-brands.html` — Brands hub → `shop-titleist.html`, `shop-callaway.html`, `shop-srixon.html`, `shop-taylormade.html`
  - `shop-bundles.html` — Bundles hub → `shop-prime-picks.html`, `shop-daily-drivers.html`, `shop-flashy-finds.html`
- `faq.html` — FAQ (grading, sourcing, preparation)
- `about.html` — About

All pages share `css/style.css` and your logo in `assets/logo.png` (now cropped to just the bird, transparent background).

## Pricing — where the numbers came from
Prices are set just under typical UK second-hand market rates (researched at build time — e.g. Grade A dozens around £24.99 vs. new at £49.99, with per-ball prices from roughly £0.20 up to £2 depending on grade and brand). Every brand and bundle is priced so a **higher quantity is always better value per ball** — check the "Best value" tag on the largest option in each table.

**To edit a price:** open the relevant page (e.g. `shop-titleist.html`), find the grade/quantity row, and update it in **three places** so everything stays in sync:
1. The visible price cell (`class="price-cell"`, e.g. `£22.99`)
2. The per-ball note just above it (`class="per-ball"`, e.g. `£1.92/ball`)
3. The hidden PayPal `amount` field in that row's form, a few lines below

## SEO
Each brand/bundle page has unique, keyword-rich copy in the `seo-copy` block near the top — edit this text directly to adjust tone or add detail. The FAQ page also includes hidden structured data (an `FAQPage` schema block) so Google can potentially show your FAQs directly in search results; you don't need to touch this unless you change the FAQ questions.

## 1. Put this on GitHub
1. Create a new repository — since you don't have a domain yet, name it `yourusername.github.io` (replace with your actual GitHub username) so it publishes at the cleanest URL.
2. Upload all these files, **keeping the folder structure** (`css/`, `assets/` must stay as folders, not flattened).
3. Go to **Settings → Pages**, set Source to your main branch, root folder. Save.
4. Your site goes live at `https://yourusername.github.io` within a minute or two.

## 2. When you buy your domain
1. In **Settings → Pages**, enter your custom domain (e.g. `www.budgetbirdies.co.uk`).
2. At your domain registrar, add a CNAME record pointing to `yourusername.github.io`.
3. Tick "Enforce HTTPS" once it's available (can take a few hours after the domain is added).

## 3. Before you go live — update these
- **PayPal email**: every buy button across all shop pages uses `budgetbirdies@outlook.com`. Double check this matches your PayPal **Business** account exactly.
- **Prices**: see the "Pricing" section above — these are researched estimates, not your actual costs. Update them once you know your real margins.
- **Product photos**: each brand/bundle page currently shows a placeholder golf-ball graphic with a "photo coming soon" tag. To swap in a real photo:
  1. Add your image to the `assets/` folder (e.g. `assets/titleist.jpg`)
  2. On that page, replace the `<div class="card-art">...</div>` block near the top with:
     `<div class="card-art" style="border-radius:16px;"><img src="assets/titleist.jpg" alt="Used Titleist golf balls" style="width:100%;height:100%;object-fit:cover;border-radius:16px;"></div>`
- **Social links**: currently say "coming soon" in the footer — once your Instagram/TikTok are live, replace that footer line with real links (it appears in every page's footer, so update once and copy to the rest, or ask Claude to update all of them).

## 4. Testing payments
PayPal buttons built this way go to PayPal's real checkout — test with a small real payment first, or use a PayPal Sandbox account (via developer.paypal.com) if you want to test without moving real money.

## 5. Adding more brands, bundles, or grade/quantity options
- **New quantity row** on an existing brand/bundle page: copy one `<tr>...</tr>` block inside the `price-table`, update the quantity, per-ball price, price, and the hidden `amount`/`item_name` fields in its form.
- **New brand or bundle page entirely**: easiest to come back and ask Claude to add it — copying and adapting one of the existing brand/bundle pages by hand works too, but there are several places (nav, hub tile, pricing table, PayPal forms) that all need to stay in sync.
