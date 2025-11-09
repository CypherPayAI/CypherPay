# CypherPay - Cryptocurrency Payment Protocol for Autonomous Agents

## 📋 Project Summary

CypherPay is a comprehensive cryptocurrency payment framework that enables autonomous agents to conduct secure, transparent commercial transactions on-chain. The protocol provides standardized payment flows, verification mechanisms, and settlement processes for Agent-to-Agent (A2A) commerce.

## 🔑 Key Information

- **Version**: 1.0.0
- **License**: Apache 2.0
- **Language**: Python 3.10+
- **Protocol Spec**: v0.2 (Latest)
- **Status**: Production Ready

## 📦 Repository Contents

### Core Components
- **`spec/`** - Complete protocol specification (v0.1 and v0.2)
- **`python/x402_a2a/`** - Production-ready Python implementation
- **`schemes/`** - Payment scheme specifications (Exact, Lightning, Spark, UMA)
- **`python/examples/`** - Working demonstration applications

### Documentation
- **README.md** - Main project documentation
- **ABOUT.md** - Project overview and features
- **CONTRIBUTING.md** - Contribution guidelines
- **CODE_OF_CONDUCT.md** - Community guidelines
- **SECURITY.md** - Security policy

### Development
- **`.github/workflows/`** - CI/CD automation
- **`python/x402_a2a/tests/`** - Comprehensive test suite

## 🚀 Quick Start

### Installation
```bash
cd python/x402_a2a
pip install -e .
```

### Basic Usage
```python
from x402_a2a import create_payment_requirements

# Create payment requirements
requirements = create_payment_requirements(
    price="$5.00",
    pay_to_address="0x...",
    resource="/api/service"
)
```

## 🏗️ Architecture

### Core Protocol
- Payment requirements creation
- Cryptographic signing and verification  
- Multi-scheme payment support
- State management utilities

### Extension System
- Modular payment schemes
- Custom implementation support
- Flexible executor middleware

### Security
- EIP-712 typed data signing
- Multi-chain blockchain support
- Built-in fraud prevention

## 📊 Features

✅ **Production Ready** - Battle-tested protocol and implementation  
✅ **Type Safe** - Full Python type hints and validation  
✅ **Async First** - Native async/await support  
✅ **Well Documented** - Comprehensive specs and examples  
✅ **Extensible** - Plugin architecture for custom schemes  
✅ **Tested** - Full test coverage with pytest

## 🔗 Payment Schemes

- **Exact** - Direct token transfers with EIP-3009 authorization
- **Lightning** - Bitcoin Lightning Network payments
- **Spark** - Fast, low-fee microtransactions
- **UMA** - Universal Money Address protocol

## 🤝 Community & Support

- **GitHub**: Issues and Pull Requests welcome
- **Email**: support@cypherpay.com
- **Security**: security@cypherpay.com
- **Conduct**: conduct@cypherpay.com

## 📄 License

Apache License 2.0 - See LICENSE file for full terms.

## 🎯 Use Cases

- AI service monetization
- API call payments
- Data processing fees
- Decentralized marketplace transactions
- Agent-to-agent commerce
- Micropayment systems

---

**CypherPay** - Powering the future of autonomous agent commerce.
