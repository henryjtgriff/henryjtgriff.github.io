# Budget Birdies — website files

Three pages: `index.html` (Home), `shop.html` (Shop), `about.html` (About), sharing `css/style.css` and your logo in `assets/logo.png`.

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
- **PayPal email**: every buy button in `shop.html` uses `budgetbirdies@outlook.com`. Double check this matches your PayPal **Business** account exactly.
- **Bundle names, descriptions, prices**: search `shop.html` for `Bundle 1` through `Bundle 6` and swap in your real line-up.
- **Product photos**: each product card currently shows a placeholder golf-ball graphic with a "photo coming soon" tag. To swap in a real photo:
  1. Add your image to the `assets/` folder (e.g. `assets/bundle-1.jpg`)
  2. In `shop.html`, replace the `<div class="card-art">...</div>` block for that product with:
     `<div class="card-art"><img src="assets/bundle-1.jpg" alt="Bundle 1" style="width:100%;height:100%;object-fit:cover;"></div>`
- **Social links**: currently say "coming soon" in the footer — once your Instagram/TikTok are live, replace that footer line with real links.

## 4. Testing payments
PayPal buttons built this way go to PayPal's real checkout — test with a small real payment first, or use a PayPal Sandbox account (via developer.paypal.com) if you want to test without moving real money.

## 5. Adding more products later
Copy one whole `<article class="card">...</article>` block in `shop.html`, paste it before `</div>` (closing the `.grid`), and update the name, description, price (in two places — the visible price and the hidden `amount` field), and `item_name`.
