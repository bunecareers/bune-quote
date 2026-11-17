# Bune Quote website (quote.buneautomation.com)

Landing page for the AI RFQ and order processing service, a Bune Automation speciality.
Built on the same stack as buneautomation.com: Next.js 16 + TypeScript + Tailwind CSS on Cloudflare Workers. English (default) and Hungarian.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. It redirects to `/hu` or `/en` based on the visitor's country or browser language.

## Deploy to Cloudflare Workers

```bash
npm run preview   # build and run locally in the Workers runtime
npm run deploy    # build and deploy with your own Cloudflare login
```

The Worker is named `bune-quote` (see `wrangler.jsonc`). Set `NEXT_PUBLIC_SITE_URL=https://quote.buneautomation.com` as a build variable and `LEAD_NOTIFY_EMAIL` as a Worker secret. Then add `quote.buneautomation.com` as a custom domain of the Worker.

Always use the npm scripts above rather than plain `wrangler dev` or `wrangler deploy`: they also upload the prerendered pages, which the sharing images need.

## Offer requests

`src/app/api/lead/route.ts` stores every request in Cloudflare D1, then emails a notification to `LEAD_NOTIFY_EMAIL` and a confirmation to the visitor. A failed email never loses a request.

- The D1 database `bune-automation-leads` is **shared with buneautomation.com**. Rows from this site have `kind = 'rfq'` and `"site": "bunequote"` in `payload`.
- Emails are sent from `MAIL_FROM` (`wrangler.jsonc`), for now `hello@buneautomation.com`, which is already set up for the Cloudflare Email Service.
- Local table: `npm run db:migrate:local`

List this site's requests:

```bash
npx wrangler d1 execute bune-automation-leads --remote --command "SELECT created_at, name, email, company, payload FROM leads WHERE kind = 'rfq' ORDER BY created_at DESC"
```

## Where things are

| What | Where |
|---|---|
| All texts (translations) | `src/i18n/messages/hu.json`, `en.json` |
| Page sections | `src/components/Sections.tsx`, `Header.tsx` |
| Offer request form | `src/components/ContactForm.tsx` |
| Request API (store + email) | `src/app/api/lead/route.ts`, `src/lib/schemas.ts` |
| Company details, contact email | `src/lib/company.ts` |
| Legal texts (drafts, need legal review) | `src/content/legal.ts` |
| Colours | `src/app/globals.css` |

## Image credits

- `public/hero-warehouse.jpg`: photo by CHUTTERSNAP on Unsplash (https://unsplash.com/photos/BNBA1h-NgdY), Unsplash License.
