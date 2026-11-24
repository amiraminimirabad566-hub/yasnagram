# YASNAGRAM — Cloudflare MVP

Cloudflare Pages + Pages Functions + D1 starter. Includes bilingual UI, email/password registration and login, secure HttpOnly session cookies, text feed and publishing.

Follow `README_FA.md` to create D1, run `migrations/0001_init.sql`, deploy the repository to Cloudflare Pages, and bind the D1 database using the binding name `DB`.

This is an early MVP, not production-ready. Add rate limiting, email verification, password recovery, moderation/reporting, appeals, privacy documentation and security testing before public launch. Media uploads are intentionally disabled.
