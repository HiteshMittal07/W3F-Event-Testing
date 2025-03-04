import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@gelatonetwork/web3-functions-sdk/hardhat-plugin";
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
const config: HardhatUserConfig = {
  w3f: {
    rootDir: "./frontend/src",
    debug: false,
    networks: ["hardhat", "sepolia"], //(multiChainProvider) injects provider for these networks
  },
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: "",
      accounts: [PRIVATE_KEY],
    },
    hardhat: {
      forking: {
        url: "",
      },
    },
    zkEVM: {
      url: "https://rpc.cardona.zkevm-rpc.com",
      accounts: [PRIVATE_KEY],
    },
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io/",
      accounts: [PRIVATE_KEY],
    },
    BNB_testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: [PRIVATE_KEY],
    },
    ArbitrumBlueberry: {
      url: "https://rpc.arb-blueberry.gelato.digital",
      accounts: [PRIVATE_KEY],
    },
    arbSepolia: {
      url: "",
      accounts: [PRIVATE_KEY],
    },
  },
};

export default config;
