# Conversion Notes

This repository has been converted from the original `peacprotocol/peac-server` repository.

## Changes Made:

### 1. Branding Replacements
- All instances of "peac" → "verix402"
- All instances of "PEAC" → "VERIX402"
- All instances of "Peac" → "Verix402"
- All instances of "@peacprotocol" → "@verix402protocol"
- All instances of "peacprotocol" → "verix402protocol"

### 2. Cleaned Codebase
- Removed all external branding references

### 3. Files Included
- Source code (TypeScript): 45 files
- Configuration files: package.json, tsconfig.json, .eslintrc.json, jest.config.js
- Documentation: README.md, LICENSE
- Environment: .env.example, .gitignore

## Repository Structure

```
verix402-server/
├── src/
│   ├── agents/          # Agent identity management
│   ├── config/          # Configuration
│   ├── core/            # Core session logic
│   ├── crypto/          # Cryptographic utilities
│   ├── http/            # HTTP routes and handlers
│   ├── logging/         # Logging utilities
│   ├── mcp/             # MCP adapter
│   ├── metrics/         # Prometheus metrics
│   ├── middleware/      # Express middleware
│   ├── negotiation/     # Protocol negotiation engine
│   ├── payments/        # Payment integration
│   ├── property/        # Property rights
│   ├── rate/            # Rate limiting
│   ├── utils/           # Utilities (Redis, SSRF protection)
│   ├── x402/            # X402 protocol
│   └── index.ts         # Main entry point
├── tests/
│   ├── setup.ts
│   └── unit/            # Unit tests
├── package.json
├── tsconfig.json
├── .eslintrc.json
├── jest.config.js
├── .env.example
├── .gitignore
├── LICENSE
└── README.md
```

## Next Steps

1. Install dependencies: `npm install`
2. Build: `npm run build`
3. Configure environment: Copy `.env.example` to `.env` and configure
4. Start server: `npm start`

## Original Repository

Original source: https://github.com/peacprotocol/peac-server
Commit: 4cd39de (v0.9.3 - Aug 12, 2025)
