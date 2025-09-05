# Harambee DAO Backend

AI-audited, multi-sig governed community treasury. This backend provides FastAPI endpoints for:

- AI/Oracle audit result ingestion and verification.
- SMS-like vote ingest and tallying (simulated).
- Evidence anchoring placeholders (IPFS, Celestia) for future integration.

This repo also contains a `contracts/` workspace (Hardhat) with a sample contract to verify oracle attestations and emit Safe-triggering events.

---

## Features

- FastAPI app with modular layout: `api/`, `core/`, `services/`, `models/`, `utils/`.
- Config via Pydantic Settings (`.env`, not committed).
- Test suite (pytest + coverage) and demo script (`api_demo.py`).
- Contracts (Hardhat + Solidity) with unit tests.

---

## Project layout

```
HarambeeDAO/
├─ backend/
│  ├─ app/
│  │  ├─ api/            # FastAPI routes
│  │  ├─ core/           # config, logging
│  │  ├─ models/         # pydantic schemas
│  │  ├─ services/       # domain logic (audit, votes)
│  │  └─ utils/          # integrations (ipfs, oracle, celestia)
│  ├─ tests/             # pytest suite
│  ├─ api_demo.py        # simple /api/testall client
│  ├─ pyproject.toml     # packaging & dev tools
│  ├─ setup.py
│  ├─ pytest.ini
│  └─ README.md          # this file
└─ contracts/
   ├─ contracts/         # Solidity sources
   ├─ test/              # Hardhat tests
   ├─ scripts/           # deploy scripts
   ├─ hardhat.config.ts
   └─ package.json
```

---

## Conda environment setup (Python)

Create and activate a conda environment, then install deps:

```bash
conda create -n harambee-backend -y python=3.11
conda activate harambee-backend

# From repo root
pip install -U pip
pip install -e backend/[dev]
```

If you prefer without editable install:

```bash
cd backend
pip install -U pip
pip install -r <(python - <<'PY'
from tomllib import load
import sys
with open('pyproject.toml','rb') as f:
    data = load(f)
print('\n'.join(data['project']['dependencies']))
print('\n'.join(data['project']['optional-dependencies']['dev']))
PY
)
```

---

## Environment variables

Create `backend/.env` locally (not committed):

```
APP_ENV=dev
LOG_LEVEL=INFO
IPFS_API_URL=http://localhost:5001
ORACLE_SIGNER=0x0000000000000000000000000000000000000000
CELESTIA_ENDPOINT=http://localhost:26658
GROQ_API_KEY=your_groq_api_key_here
GROQ_API_URL=https://api.groq.com/openai/v1/chat/completions
```

---

## Run the API

From repo root:

```bash
uvicorn app.main:app --reload --port 8000 --app-dir backend
```

Check it’s alive:

```bash
curl http://127.0.0.1:8000/health
curl http://127.0.0.1:8000/api/ping
```

Smoke everything:

```bash
# Using curl
curl -s http://127.0.0.1:8000/api/testall | jq

# Using demo script
python backend/api_demo.py --base-url http://127.0.0.1:8000
```

---

## Tests & coverage

```bash
cd backend
pytest -q
pytest --cov=app --cov-report term-missing --cov-report html
# Coverage HTML in backend/htmlcov/index.html
```

---

## Contracts (Hardhat)

Install Node deps and run tests:

```bash
cd contracts
npm install
npx hardhat compile
npx hardhat test
```

Deploy (example to local network):

```bash
npx hardhat node
# In another shell
npx hardhat run scripts/deploy.ts --network localhost
```

---

## Architecture notes

- `app/core/config.py`: Pydantic `Settings` for runtime config.
- `app/services/audit_service.py`: verifies oracle attestation (stub), pins IPFS CID (stub), returns normalized result.
- `app/services/vote_service.py`: simple in-memory vote registry and tallying.
- `app/utils/*`: placeholders for IPFS, oracle, Celestia integrations—swap with real clients.

Future integrations:

- Replace `verify_attestation()` with EVM signature verification against `ORACLE_SIGNER`.
- Replace `pin_cid()` with a pinning service or IPFS HTTP API client.
- Add Safe Transaction Service client; integrate contract events.

---

## Fancy roadmap sparkle ✨

- Phase 1: API + SMS webhook + Safe integration.
- Phase 2: AI Auditor adapter + oracle attestation flow.
- Phase 3: Evidence anchoring to Celestia DA and on-chain event feeds.
- Phase 4: Production hardening (HSM, audits, monitoring) and pilot launch.

---

## License

Proprietary (pilot). Replace with your preferred license.
