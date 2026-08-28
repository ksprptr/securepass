# Dev Toolkit

> Password, hash, JWT and URL utilities that run entirely in your browser — no backend and no tracking.

- [Prerequisites](#prerequisites)
- [Features](#features)
- [Installation](#installation)
- [Run](#run)
- [Docker](#docker)
- [Configuration](#configuration)
- [License](#license)

## Prerequisites

- Node.js 24+ ([Download](https://nodejs.org/en/download/))
- IDE ([VS Code](https://code.visualstudio.com/), WebStorm, ...)
- Package manager ([pnpm (recommended)](https://pnpm.io/installation), npm, ...)
- Optional: [Docker](https://docs.docker.com/get-started/get-docker/) (to run the app in a container)

## Features

- **12 tools in 5 categories** — passwords & secrets, hashing, JWT, URLs and time
- **Passwords & secrets** — a password generator (strong, symbol-free or memorable) that reports the
  entropy of the result, a bit-length secret generator (hex + base64) for API keys and JWT secrets,
  and UUID v1, v4, v7, nil, GUID and CUID
- **Hashing** — bcrypt hashing and verification with a selectable cost factor and an explanation of
  what each one buys, plus MD5, SHA-1, SHA-256 and SHA-512 checksums computed all at once
- **JWT** — sign a header and payload into an HS256/HS384/HS512 token, or decode one and read its
  claims, its `exp`/`iat`/`nbf` as real dates and whether it has expired
- **URLs** — a cleaner that strips tracking parameters (utm\_\*, fbclid, gclid, …) with a
  before / after diff and an aggressive mode, a percent-encoder / decoder and a slug generator
- **Time** — a Unix timestamp converter, both directions, in UTC and local time
- **Privacy-first** — everything runs in your browser, nothing is ever uploaded
- **Logo page** (`/logo`) — download the app logo as a vector SVG
- **SEO ready** — OpenGraph/Twitter cards with a generated OG image, JSON-LD, manifest, robots,
  sitemap

## Installation

1. Clone the repository and navigate to the root: `cd dev-toolkit/`
2. Install all dependencies: `pnpm install`

## Run

- Development mode: `pnpm dev`
- Production mode: `pnpm build && pnpm start`
- Lint: `pnpm lint`
- Type check: `pnpm typecheck`
- Format: `pnpm format`

## Docker

The app ships a multi-stage `Dockerfile` (Next.js standalone output, non-root user) and a
`docker-compose.yml`.

```bash
cp .env.example .env          # optional — defaults work for localhost
docker compose up -d --build  # http://localhost:3000
docker compose logs -f dev-toolkit
docker compose down
```

Without compose:

```bash
docker build -t dev-toolkit --build-arg APP_URL=https://toolkit.ksprptr.dev .
docker run --rm -p 3000:3000 -e APP_URL=https://toolkit.ksprptr.dev dev-toolkit
```

`APP_URL` is inlined at **build time** — it feeds the prerendered canonical / OpenGraph / robots /
sitemap URLs and enables the `Strict-Transport-Security` header when it is an `https://` origin — so
pass it as a build arg for any non-localhost deployment, and keep the runtime value identical.
Request headers (`X-Forwarded-Host`) are deliberately not trusted: they are client-supplied, and
honoring them would let anyone put a foreign domain into the app's own canonical/OpenGraph URLs.

The compose file binds the published port to `127.0.0.1` (the container is meant to sit behind a
reverse proxy on the same host); drop that prefix to expose it on the network directly.

## Configuration

| Description       | Values                                          |
| ----------------- | ----------------------------------------------- |
| **Port:**         | 3000                                            |
| **Technologies:** | Next.js, React, Tailwind CSS                    |
| **URL:**          | http://localhost:3000                           |
| **Health check:** | http://localhost:3000/api/health                |
| **Env:**          | `APP_URL` (public origin), `APP_PORT` (compose) |

## License

> This software is developed by **Petr Kašpar** and is licensed under the MIT License.  
> For more details, please refer to the [LICENSE](./LICENSE) file.
