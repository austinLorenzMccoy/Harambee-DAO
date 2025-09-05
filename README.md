# Harambee DAO — Monorepo

A modern, end-to-end reference implementation of an AI‑audited, multi‑sig governed community treasury with SMS governance. This monorepo contains:

- frontend/ — Next.js 15 + React 19 + Tailwind v4 app (marketing + governance UX)
- backend/ — FastAPI service for audit webhooks, SMS vote ingest, and orchestration
- contracts/ — Hardhat workspace with Solidity contracts and tests
- docs/ — Product Requirements Doc (PRD) and planning artifacts

The goal is to help community savings groups reduce embezzlement by releasing funds only when verifiable milestones are met, combining on‑chain controls (Safe multi‑sig) with off‑chain AI audit attestations and accessible SMS voting.

---

## Monorepo Structure

```
HarambeeDAO/
├─ frontend/           # Next.js + Tailwind + shadcn/ui
├─ backend/            # FastAPI app + pytest
├─ contracts/          # Hardhat + Solidity + tests
└─ docs/               # PRD and planning
```

Key entry points:

- frontend/app/layout.tsx, frontend/app/page.tsx — App Router entry and global styles
- backend/app/main.py — FastAPI app entry (launched via uvicorn)
- contracts/contracts/HarambeeSafeTrigger.sol — sample contract emitting attestation events

---

## Tech Stack

- Web: Next.js 15 (App Router), React 19, TypeScript 5, Tailwind CSS v4, shadcn/ui (Radix primitives)
- API: FastAPI, Pydantic v2, Uvicorn
- Smart contracts: Solidity 0.8.x, Hardhat, Ethers v6
- Tooling: PNPM, Pytest + Coverage, TypeScript strict mode
- Integrations (planned): Safe (Gnosis Safe) Transaction Service, Twilio (SMS), IPFS/Filecoin, Celestia DA, Chainlink or custom AI oracle

---

## Quick Start (local)

Run each workspace independently. Recommended versions: Node 18.18+ (or 20+), PNPM 8+, Python 3.11.

1) Frontend

```
cd frontend
pnpm install
pnpm dev
# Visit http://localhost:3000
```

2) Backend

```
# Create a virtual environment (conda or venv)
# Example with conda:
# conda create -n harambee-backend -y python=3.11 && conda activate harambee-backend

# Install backend in editable mode with dev extras from repo root
pip install -U pip
pip install -e backend/[dev]

# Run FastAPI with uvicorn (from repo root)
uvicorn app.main:app --reload --port 8000 --app-dir backend
# Health checks
curl http://127.0.0.1:8000/health
curl http://127.0.0.1:8000/api/ping
```

3) Contracts

```
cd contracts
npm install
npx hardhat compile
npx hardhat test

# (Optional) local node + deploy
npx hardhat node
# in another shell
npx hardhat run scripts/deploy.ts --network localhost
```

---

## Environments & Configuration

Create `.env` files where applicable. Examples:

- backend/.env

```
APP_ENV=dev
LOG_LEVEL=INFO
IPFS_API_URL=http://localhost:5001
ORACLE_SIGNER=0x0000000000000000000000000000000000000000
CELESTIA_ENDPOINT=http://localhost:26658
GROQ_API_KEY=your_groq_api_key_here
GROQ_API_URL=https://api.groq.com/openai/v1/chat/completions
```

- frontend/.env.local (client‑visible vars must be prefixed with NEXT_PUBLIC_)

```
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

- contracts/.env (if you later add networks/private keys)

```
# Example placeholders
ALCHEMY_API_KEY=
PRIVATE_KEY=
```

Security note: never commit secrets. `.env*` files are already git‑ignored within workspaces.

---

## Development Workflows

- Frontend
  - Tech: Next.js App Router, Tailwind v4 via `@tailwindcss/postcss`, shadcn/ui components.
  - Useful scripts: `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint`.
  - Global styles: `frontend/app/globals.css`. Update tokens/utilities here.

- Backend
  - Layout: `app/api`, `app/core`, `app/models`, `app/services`, `app/utils`.
  - Run: `uvicorn app.main:app --reload --port 8000 --app-dir backend` from repo root.
  - Tests: `cd backend && pytest --cov=app --cov-report term-missing --cov-report html`.

- Contracts
  - Build/test: `npx hardhat compile`, `npx hardhat test`.
  - Deploy example: see `contracts/scripts/deploy.ts`.

---

## Testing & Quality

- Backend
  - Pytest defaults to 100% coverage thresholds (see `backend/pyproject.toml`).
  - Coverage report HTML at `backend/htmlcov/index.html` after running coverage.

- Web/Contracts
  - No web unit tests configured yet; recommended to add Vitest/Jest + RTL and Playwright for E2E.
  - Contracts use Hardhat + Chai; extend with coverage and linters (solhint) as desired.

---

## Build & Deployment

- Frontend
  - Production: `pnpm build && pnpm start`.
  - Hosted on Vercel or any Node host; see `frontend/next.config.mjs` (images.unoptimized is true by default).

- Backend
  - Uvicorn/Gunicorn behind a reverse proxy (NGINX/Caddy). Containerize for production.
  - Add Postgres/Redis if persisting votes/membership beyond in‑memory stubs.

- Contracts
  - Use proper networks and secrets in `contracts/.env`. Run audits before mainnet/testnet use.

---

## Architecture Highlights

- AI audit flow (planned): model generates evidence bundle → store assets on IPFS/Filecoin → anchor hash on Celestia/chain → oracle verifies and produces a signed attestation → contract/Safe flow creates payout tx conditioned on votes.
- Governance UX: SMS voting via Twilio webhooks + web dashboard; votes are verified and tallied server‑side, optionally anchored as signed hashes for auditability.
- Safe integration: use Safe Transaction Service API to manage multi‑sig transactions and signer approvals.

See `docs/HarambeeDAOPRD.md` for a deeper product/technical specification, KPIs, roadmap, and references.

---

## Troubleshooting

- Port in use: run `pnpm dev -- -p 3001` (frontend) or change uvicorn port for the backend.
- TypeScript errors: the frontend build tolerates type errors (`ignoreBuildErrors=true` in `next.config.mjs`) during iteration; fix during development to avoid runtime issues.
- CSS not applying: ensure `app/globals.css` is imported by `app/layout.tsx` and Tailwind classes are correct.
- Slow Node installs: prefer PNPM (lockfile present). Avoid mixing package managers unless you remove the existing lockfile.

---

## Contributing

1. Create a feature branch from `main`.
2. Keep components accessible (Radix/shadcn) and code typed (TS/pyright/mypy where applicable).
3. Write tests for backend features; maintain coverage thresholds.
4. Open a PR with a clear description, screenshots (frontend), and test instructions.

---

## License

See the applicable license(s) in each workspace. If unspecified, treat as proprietary/pilot and replace with your chosen license before public release.
