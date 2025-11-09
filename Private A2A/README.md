# CypherPay Protocol

The **CypherPay Protocol** is a comprehensive cryptocurrency payment framework for Agent-to-Agent (A2A) communication, enabling autonomous agents to monetize their services through secure on-chain payments. Built on the principles of HTTP 402 "Payment Required", CypherPay brings commercial transactions to the decentralized agent ecosystem.

## 🎯 **Goal**

Enable **seamless agent commerce** by providing a battle-tested, production-ready protocol for agents to charge for their services and receive payments on-chain. CypherPay transforms any A2A agent into a commercial service that can monetize API calls, data processing, AI inference, and other valuable capabilities.

## 🗂️ **Repository Structure**

This repository contains the specification, core libraries, and example implementations for the A2A x402 extension, supporting multiple languages.

```
x402-a2a/
├── spec/
│   └── v0.1/
│       └── spec.md         # The official x402 extension specification
│
├── schemes/                # Directory contains experimental x402 payment schemes drafted by partners and other contributors
│
└── {language}/             # Language-specific implementations (e.g., python/, typescript/)
    ├── x402_a2a/           # The core library for the x402 extension
    │
    └── examples/
        └── {demo}/         # Demonstrations for each language implementation
```

## 🤔 **How It Works**

The x402 extension defines a simple, robust payment flow between agents:

1.  **Payment Required:** A merchant agent, when payment is required for a service, responds with a `payment-required` message.
2.  **Payment Submitted:** The client agent signs the payment details and sends them back to the merchant in a `payment-submitted` message.
3.  **Payment Completed:** The merchant verifies the payment, settles it on-chain, and responds with a `payment-completed` message, delivering the requested service.

This flow is designed to be implemented in any language, allowing developers to focus on their agent's core logic.

## 🚀 **Getting Started**

Each language-specific implementation (e.g., `python/x402_a2a`) contains its own `README.md` with detailed instructions on how to install dependencies, run tests, and use the library.

The `examples/` directory contains various demonstrations of the x402 extension. Each example also has its own `README.md` with instructions on how to run it.

## 🏗️ **Architecture**

The `x402_a2a` libraries follow a **functional core, imperative shell** architecture:

*   **Core Protocol:** The fundamental data structures and functions for creating, signing, and verifying payments.
*   **Executors:** Middleware that automates the payment flow, making it easy to add payment capabilities to any agent.

This design provides both flexibility and ease of use, allowing developers to either build custom payment logic with the core protocol or use the executors for a more hands-off approach.

## 📚 **Documentation**

*   **[Technical Specification](spec/v0.2/spec.md)**: Complete protocol specification and implementation guidelines.
*   **[Python Library](python/x402_a2a/README.md)**: Full documentation for the Python implementation.
*   **[Example Applications](python/examples/)**: Production-ready demonstration applications and integration examples.
*   **[Payment Schemes](schemes/)**: Supported payment schemes including Lightning, Spark, and UMA.

## 🤝 **Contributing**

We welcome contributions from the community! Please read our [specification](spec/v0.2/spec.md) and [contributing guidelines](CONTRIBUTING.md) to understand the project architecture and development workflow. Submit pull requests for bug fixes, features, or documentation improvements.
