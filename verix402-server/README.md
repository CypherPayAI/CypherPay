# @verix402protocol/server (v0.9.3)

Optional reference server for the VERIX402 Protocol.
- Identity verification (JWK/JWKS, DPoP)
- Session mint/verify (JWT)
- Payments via X402 provider (+ Stripe bridge)
- GDPR export, rate limiting, metrics
- Emits X-VERIX402-Version: 0.9.3

This server **does not** replace the JavaScript SDK or `verix402.txt`. It complements `@verix402protocol/core` when policies require verification, sessions, or payments.

## Quickstart
```bash
npm install
npm run build
npm start
Endpoints

POST /verify - Agent identity verification
POST /pay - Payment processing
GET /.well-known/verix402 - Server capabilities
GET /gdpr-export - GDPR data export
GET /healthz - Health check
GET /metrics - Prometheus metrics

Environment Variables

VERIX402_PORT (default: 3000)
VERIX402_REDIS_URL (for rate limiting)
VERIX402_LOG_LEVEL (info|debug|warn|error)

License: Apache-2.0
