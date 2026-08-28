# Multi-stage build, run from the project root:
#   docker build -t dev-toolkit .
#   docker run --rm -p 3000:3000 dev-toolkit
#
# APP_URL is baked in at build time (it feeds the prerendered SEO metadata — canonical /
# OpenGraph / robots / sitemap URLs), so pass it as a build arg when the public origin is
# not http://localhost:3000 (Coolify: set it as a build-time variable).
FROM node:24-alpine AS builder

RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV CI=true
# Skip the husky `prepare` hook — there is no .git in the build context.
ENV HUSKY=0

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# corepack resolves pnpm from the `packageManager` field, so the image matches the lockfile.
RUN corepack enable
RUN pnpm install --frozen-lockfile

COPY . .

ARG APP_URL
ENV APP_URL=$APP_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm run build

# ---- Runner ----
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1

# Standalone output (includes server.js + a minimal node_modules), owned by the non-root user
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
# Carries the bcrypt worker and its vendored library, which are served as static files
COPY --from=builder --chown=node:node /app/public ./public

# Drop privileges: run the server as the unprivileged `node` user shipped in the base image.
USER node

EXPOSE 3000

# 127.0.0.1, not localhost: that also resolves to ::1, which the IPv4-only server refuses.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1

CMD ["node", "server.js"]
