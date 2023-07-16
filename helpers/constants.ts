import { TokenContract } from "./types";
import { BigNumber } from "ethers";
const { constants } = require("@openzeppelin/test-helpers");

// Constants defintions, like protocol contract addresses or token addresses

export const ZERO_ADDRESS = constants.ZERO_ADDRESS as string;

export const MAX_UINT256 = BigNumber.from(constants.MAX_UINT256.toString());

export const TOKEN_ADDRESS: TokenContract = {
  arbitrum: {
    mainnet: {
      USDC: {
        address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
        decimals: 6,
      },
      USDT: {
        address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        decimals: 6,
      },
      DAI: {
        address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
        decimals: 18,
      },
      FRAX: {
        address: "0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F",
        decimals: 18,
      },
      WETH: {
        address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        decimals: 18,
      },
      WBTC: {
        address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
        decimals: 8,
      },
      LINK: {
        address: "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4",
        decimals: 18,
      },
      UNI: {
        address: "0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0",
        decimals: 18,
      },
      sGLP: {
        address: "0x5402B5F40310bDED796c7D0F3FF6683f5C0cFfdf",
        decimals: 18,
      },
      sGMX: {
        address: "0xd2D1162512F927a7e282Ef43a362659E4F2a728F",
        decimals: 18,
      },
      GMX: {
        address: "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a",
        decimals: 18,
      },
      GLP: {
        address: "0x4277f8F2c384827B5273592FF7CeBd9f2C1ac258",
        decimals: 18,
      },
      esGMX: {
        address: "0xf42Ae1D54fd613C9bb14810b0588FaAa09a426cA",
        decimals: 18,
      },
      agEUR: {
        address: "0xFA5Ed56A203466CbBC2430a43c66b9D8723528E7",
        decimals: 18,
      },
      EURT: {
        address: "0xD5799aFb5711f374095A3E640ff347056f7dEaDC",
        decimals: 6,
      },
      EURS: {
        address: "0xD22a58f79e9481D1a88e00c343885A588b34b68B",
        decimals: 2,
      },
      CRV: {
        address: "0x11cDb42B0EB46D95f990BeDD4695A6e3fA034978",
        decimals: 18,
      },
      CVX: {
        address: "0xaAFcFD42c9954C6689ef1901e03db742520829c5",
        decimals: 18,
      },
      EUROC: {
        address: ZERO_ADDRESS,
        decimals: 6,
      },
      ThreeEURpool: {
        address: ZERO_ADDRESS,
        decimals: 18,
      },
      ETH_onCurve: {
        address: ZERO_ADDRESS,
        decimals: 18,
      },
    },
  },
  ethereum: {
    mainnet: {
      USDC: {
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        decimals: 6,
      },
      USDT: {
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        decimals: 6,
      },
      DAI: {
        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        decimals: 18,
      },
      FRAX: {
        address: "0x853d955aCEf822Db058eb8505911ED77F175b99e",
        decimals: 18,
      },
      WETH: {
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        decimals: 18,
      },
      WBTC: {
        address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
        decimals: 8,
      },
      LINK: {
        address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
        decimals: 18,
      },
      UNI: {
        address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        decimals: 18,
      },
      sGLP: {
        address: ZERO_ADDRESS,
        decimals: 18,
      },
      sGMX: {
        address: ZERO_ADDRESS,
        decimals: 18,
      },
      GMX: {
        address: ZERO_ADDRESS,
        decimals: 18,
      },
      GLP: {
        address: ZERO_ADDRESS,
        decimals: 18,
      },
      esGMX: {
        address: ZERO_ADDRESS,
        decimals: 18,
      },
      agEUR: {
        address: "0x1a7e4e63778B4f12a199C062f3eFdD288afCBce8",
        decimals: 18,
      },
      EURT: {
        address: "0xC581b735A1688071A1746c968e0798D642EDE491",
        decimals: 6,
      },
      EURS: {
        address: "0xdB25f211AB05b1c97D595516F45794528a807ad8",
        decimals: 2,
      },
      CRV: {
        address: "0xD533a949740bb3306d119CC777fa900bA034cd52",
        decimals: 18,
      },
      CVX: {
        address: "0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B",
        decimals: 18,
      },
      EUROC: {
        address: "0x1aBaEA1f7C830bD89Acc67eC4af516284b1bC33c",
        decimals: 6,
      },
      ThreeEURpool: {
        address: "0xb9446c4Ef5EBE66268dA6700D26f96273DE3d571",
        decimals: 18,
      },
      ETH_onCurve: {
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        decimals: 18,
      },
    },
  },
};

export enum TokenInterfaceName {
  IERC20 = "ERC20",
}
