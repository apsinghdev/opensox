# jackedAJ static pages (talk-to-me)

These files live in the Opensox repo so the guest checkout API and the jackedAJ pages ship together. Copy them into the jackedAJ Cloudflare Pages site root (same place as `newsletter.html`).

| file | public URL |
| --- | --- |
| `talk-to-me.html` | `https://www.jackedaj.com/talk-to-me` |
| `talk-to-me-confirmed.html` | `https://www.jackedaj.com/talk-to-me-confirmed.html` |
| `talk-to-me.js` | loaded by the buy page |

They call Opensox API at `https://api2.opensox.ai` (same as the newsletter form):

- `GET /talk-to-me/config`
- `POST /talk-to-me/create-order`
- `POST /talk-to-me/verify`

## required opensox API env

See `apps/api/.env.example`. At minimum:

- existing Razorpay + ZeptoMail vars
- `JACKEDAJ_FROM_*` (already used by newsletter)
- `TALK_TO_ME_*` product/price/cal settings
- `CORS_ORIGINS` must include `https://www.jackedaj.com` and `https://jackedaj.com`

## flow

1. visitor opens `/talk-to-me` (no opensox login)
2. enters name + email, clicks buy
3. razorpay checkout opens
4. on success, API verifies payment, sends email with cal.com link, browser redirects to confirmation page
