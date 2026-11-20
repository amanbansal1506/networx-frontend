# NetworX Classic — original-style frontend

This edition returns to the look of the **original Networx 2.zip** provided by the project owner:
white background, blue NetworX branding, original landing headline and hero image, centered login card, and a three-column social feed.

The UI uses the same lightweight Next.js API client from the reconstructed-backend-compatible frontend, so authentication, feed, profiles, search, connections and notifications target the Express endpoints shipped in `networx-backend-complete.zip`.

## Run

1. Run the reconstructed Express backend and PostgreSQL database (see the backend README).
2. In this folder:

```bash
npm install
npm run dev
```

3. Open http://localhost:3000 and sign in. `/health` on http://localhost:8000 must be reachable.
4. If your API is on another port, edit `.env.local`:

```env
NEXT_PUBLIC_HOST_IP=http://localhost:8000
```

Restart Next.js after editing `.env.local`. Both apps should use `localhost` to keep cookies consistent. Set backend `FRONTEND_URL=http://localhost:3000`.

## Scope, intentionally fresher-friendly

- Original-style public landing page, sign-in / sign-up
- Home feed (posts, likes and comments), profiles, connections and notifications
- Simple user search and basic profile editing
- Jobs and Messages are clearly labeled placeholders, because the current backend has no APIs for them
- No fake metrics, no social OAuth buttons (unsupported), no chat sockets, no microservices, no extra dashboard widgets

This is a visual return to the original design, not a byte-for-byte copy of the old frontend: old components that called deleted backend microservices were replaced with simple API-compatible ones.

## Status

Static checks verify JavaScript syntax and import resolution, but full `npm install`, Next.js build, and PostgreSQL integration must be verified on your computer.
