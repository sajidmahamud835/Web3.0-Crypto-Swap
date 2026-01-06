# 🔄 Web3.0 Crypto Swap

A decentralized exchange (DEX) interface for seamless cryptocurrency token swaps, built with Next.js 15 and Ethers.js.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=ethereum)](https://ethereum.org/)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.24-363636?style=for-the-badge&logo=solidity)](https://soliditylang.org/)

**🔗 [Live Demo](https://web3-0-crypto-swap.vercel.app)** | **📂 [Source Code](https://github.com/sajidmahamud835/Web3.0-Crypto-Swap)**

---

## ✨ Features

- 🦊 **MetaMask Integration** — Connect your wallet with one click
- 🔄 **Token Swaps** — Exchange tokens seamlessly
- 📊 **Transaction History** — View all past transactions
- 🌙 **Dark Mode UI** — Modern glassmorphism design
- ⚡ **Fast & Responsive** — Built with Next.js 15 App Router

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS |
| **Web3** | Ethers.js 6, MetaMask, WalletConnect |
| **Smart Contracts** | Solidity 0.8.24, Hardhat 2.22 |
| **Styling** | Tailwind CSS 3.4, Flowbite React |
| **Deployment** | Vercel (Frontend), Sepolia (Contracts) |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MetaMask browser extension
- Sepolia testnet ETH ([Get from faucet](https://sepoliafaucet.com/))

### Installation

```bash
# Clone the repository
git clone https://github.com/sajidmahamud835/Web3.0-Crypto-Swap.git
cd Web3.0-Crypto-Swap

# Install client dependencies
cd client
yarn install

# Start development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Smart Contract Setup (Optional)

```bash
cd smart_contract

# Install dependencies
yarn install

# Create environment file
cp .env.example .env
# Edit .env with your PRIVATE_KEY and ALCHEMY_SEPOLIA_URL

# Compile contracts
yarn compile

# Deploy to Sepolia
yarn deploy
```

---

## 📁 Project Structure

```
Web3.0-Crypto-Swap/
├── client/                 # Next.js frontend
│   ├── src/app/           # App Router pages
│   ├── src/components/    # React components
│   └── public/            # Static assets
├── smart_contract/        # Hardhat project
│   ├── contracts/         # Solidity contracts
│   ├── scripts/           # Deployment scripts
│   └── test/              # Contract tests
└── studio/                # Sanity CMS (optional)
```

---

## 🔐 Environment Variables

### Smart Contract (.env)

```bash
ALCHEMY_SEPOLIA_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=your_wallet_private_key
```

> ⚠️ **Never commit your private key!** Use `.env` files and ensure they're in `.gitignore`.

---

## 🤝 Related Projects

- **[BankSync](https://github.com/sajidmahamud835/banksync)** — FinTech banking with Plaid integration
- **[EasyCom](https://github.com/sajidmahamud835/easycom)** — Next.js 15 e-commerce platform
- **[GridMaster Pro](https://github.com/sajidmahamud835/grid-master-pro-mt5-ea)** — MT5 algorithmic trading EA

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

---

**Author:** [Muhammad Sajid Mahamud](https://github.com/sajidmahamud835)  
**Portfolio:** [sajidmahamud835.github.io](https://sajidmahamud835.github.io/)
