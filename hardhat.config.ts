import { HardhatUserConfig } from "hardhat/config";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-dependency-compiler";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",

  networks: {
    hardhat: {
      chainId: 31337,
      forking: {
        enabled: true,
        url: process.env.ALCHEMY_PROVIDER_ETH_MAINNET!,
        blockNumber: 17677331,
      },
    },
  },
  etherscan: {
    apiKey: "",
  },

  solidity: {
    compilers: [
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  paths: {
    sources: "./contracts",
    tests: "./tests",
    cache: "./temp/cache",
    artifacts: "./temp/artifacts",
  },
  mocha: {
    timeout: 300000,
  },
  dependencyCompiler: {
    paths: [
      "@openzeppelin/contracts/token/ERC20/ERC20.sol",
      "@openzeppelin/contracts/token/ERC20/IERC20.sol",
    ],
  },
};

export default config;
