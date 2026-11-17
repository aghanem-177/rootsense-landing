# RootSense website — handover

This is how to run the site, change the everyday things, and look after the preorder waitlist. No coding experience is needed for most of it, only careful editing of the files named below.

## Run it on your computer

```bash
npm install
npm run dev
```

Open the address it prints (for example `http://localhost:5173`). Changes you save show up straight away. To check that the live version will build:

```bash
npm run build
```

## Where things live

| What | File |
|---|---|
| Names, prices, colours, lock/button options, box contents, product photos | `src/data/products.ts` |
| Parts and labels on the Solo Sense and Flow Sense + breakdowns | `src/data/breakdowns.ts` |
| Figures and sources on the Why page | `src/data/sources.ts` |
| Pages | `src/pages/` (Home, Why, Shop, ProductPage, Waitlist) |
| Section colours (Solo, Flow, Terra) and button styles | `src/index.css` |

## Change a price

Open `src/data/products.ts`, find the model, and change the number after `price:` (for example `price: 2950,`). Write it without commas. The new price appears everywhere at once: the Shop, the product page, the Home sections, the waitlist summary and the price saved with each sign-up.

## Add a testimonial

The site currently says that growers tried the product and shaped it ("Tried by growers" on every product page, "Shaped by growers" on Home and the Why page), but it shows no quotes. To add a real quote, only with the grower's permission, open `src/pages/ProductPage.tsx`, find the "Tried by growers" section and add this under its paragraph:

```tsx
<blockquote className="mt-6 border-l-4 border-line pl-4">
  <p className="text-lg">“The quote, in the grower's own words.”</p>
  <footer className="mt-2 text-sm text-muted">Name, crop, town</footer>
</blockquote>
```

## Swap or add a product photo

1. Put the image in the `public/` folder. A transparent background works best. `.webp` keeps it small.
2. In `src/data/products.ts`, find the model's `images:` line and point the colour at the file, for example:
   `images: { 'onyx-black': '/flow-sense-onyx-black.webp', 'camel-brown': '/flow-sense-camel-brown.webp' },`
   Terra Sense has no colours, so it uses `default:`.

A colour with no photo shows an "Image coming soon" spot. Photos still missing: Flow Sense in Onyx Black and Flow Sense + in Camel Brown. The Solo Sense Onyx Black photo is a digital recolour of the Camel Brown one, so replace it with a real photo when you have one.

The breakdown photos and label positions are in `src/data/breakdowns.ts`. Each label has an `x` and `y` given as a percentage across and down the exploded photo.

## The preorder waitlist

Every sign-up is saved as one new row in a private Google Sheet, with these columns in this order:

Date and time (Cairo) · Name · Email · Model · Colour · Lock or button · Add-ons selected · Price shown (EGP) · Test row

Rows are only ever added, never overwritten. The visitor sees "You're on the list" only after the row has been saved. If saving fails, they see an error and keep what they typed. Any sign-up made with an `@example.com` email is marked `TEST` in the last column so it can be deleted.

### One-time setup (about 10 minutes)

1. **Create the sheet.** In your Google account, create a new Google Sheet called "RootSense waitlist".
2. **Add the script.** In the sheet, go to Extensions → Apps Script. Delete what is there, paste in everything from `waitlist/google-apps-script.js`, and press Save.
3. **Add the secret.** In Apps Script, open Project Settings (the gear) → Script properties → Add script property. Name: `WAITLIST_SECRET`. Value: a long random password you make up just for this. Save.
4. **Publish the script.** Deploy → New deployment → choose "Web app". Set "Execute as" to **Me** and "Who has access" to **Anyone**. Press Deploy, allow the permissions Google asks for, then copy the Web app URL.
5. **Tell the website.** In Vercel, open the RootSense project → Settings → Environment Variables and add:
   - `WAITLIST_SHEET_URL` = the Web app URL from step 4
   - `WAITLIST_SECRET` = the same password as step 3

   Then redeploy the site so it picks them up.
6. **Test it.** On the live site, preorder any model using an email ending in `@example.com`. A row marked `TEST` should appear in the sheet within a few seconds. Delete it afterwards.

"Anyone" in step 4 is safe. The script only accepts entries that carry the secret, and only Vercel's server knows the secret. The script never sends data back, so nobody can read the sheet through it. The sheet itself stays private.

### View, sort, export and share

- **View:** open the sheet. The header row stays frozen at the top as you scroll.
- **Sort or filter:** Data → Create a filter, then use the arrow on any column header.
- **Export:** File → Download → Microsoft Excel (.xlsx) or Comma-separated values (.csv).
- **Share:** press Share and add the people you choose, as Viewer (can look) or Editor (can change). Keep "General access" set to **Restricted**.
- **Remove test rows:** filter the "Test row" column to `TEST` and delete those rows.

### When previewing on your computer

Sign-ups made in the local preview are not sent to Google. They are saved to `waitlist-dev.csv` in this folder, with the same columns. That file stays on your computer and is never uploaded.

## Putting changes live

The live site (rootsense.co) is built by Vercel from the `main` branch on GitHub, and a push to `main` may publish straight away. This redesign is on the `site-restructure` branch. Preview it first, then merge it into `main` when you are happy. `vercel.json` makes direct links such as `rootsense.co/shop` work.

## Still to decide

- What "Lock and key" and "Press-down button" do on the device, so a one-line explanation can go under each option.
- Real photos for the missing colours (see above).
- Whether Flow charges by solar panel as well as its battery. The site currently says "Rechargeable battery".
- The descriptions on the Flow Sense + breakdown were written from the labelled diagram. Please check the RS485 converter and boost converter wording.
- Old, unused images still in `public/` (`product.png`, `product-exploded.png`, the `*-raw.png` files, `iot-product.png`, `rootsense-logo-raw.jpg`) can be deleted once you are sure they aren't needed. `product.png` is still the image shown when the site is shared on social media.
