# Solana Vault Program

## Overview

This repository contains a secure, Rust-based Solana program that implements a token vault system. Built using the Anchor framework, this program allows users to safely deposit, withdraw, and manage SOL tokens in a secure on-chain vault.

## Features

- **Secure Deposit**: Deposit SOL tokens into your personal vault
- **Flexible Withdrawals**: Withdraw your tokens whenever needed
- **Account Management**: Initialize and close vault accounts as required
- **Program-Derived Addresses (PDAs)**: Leverages Solana's PDA system for secure fund management

## Architecture

The program is built using the Anchor framework and consists of:

- **Core Program Logic**: Implements the vault operations (initialize, deposit, withdraw, close)
- **State Management**: Tracks vault metadata and token amounts
- **Test Suite**: Comprehensive tests ensuring functionality and security

## Technology Stack

- **Solana Blockchain**: Fast, secure, and scalable transaction processing
- **Anchor Framework**: Simplifies Solana program development
- **Rust**: Memory-safe, high-performance programming language
- **TypeScript**: Used for tests and client interactions

## Getting Started

### Prerequisites

- Rust 1.88.0 or later
- Solana CLI tools
- Anchor Framework 0.31.1
- Node.js with pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd <repository-name>

# Install dependencies
pnpm install

# Build the program
anchor build
```

### Testing

```bash
# Run the test suite
anchor test
```

## Usage

The vault program provides the following instructions:

1. **Initialize**: Create a new vault for a user
2. **Deposit**: Add SOL tokens to your vault
3. **Withdraw**: Remove SOL tokens from your vault
4. **Close**: Close your vault and recover rent

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Built with ❤️ for the Solana ecosystem.
