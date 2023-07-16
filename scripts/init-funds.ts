import { ethers } from "hardhat";
import { WHALE_ADDRESSES, drawFromFaucet } from "../helpers/faucet";
import { TokenSymbol } from "../helpers/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { providers } from "ethers";
import { TOKEN_ADDRESS, TokenInterfaceName } from "../helpers/constants";

export const initFundsToAccounts = async (
  tokenName: TokenSymbol,
  amount: string,
  isShowAccountState: boolean,
  onlyFirstAccount?: boolean,
  tokens?: any
) => {
  const signers = await ethers.getSigners();
  const provider = signers[0].provider;

  if (!provider) {
    throw new Error("Provider is not defined");
  }

  for (let i = 0; i < signers.length; i++) {
    await drawFromFaucet(
      WHALE_ADDRESSES,
      signers[i].address,
      tokenName,
      amount,
      tokens
    );
    if (onlyFirstAccount) {
      break;
    }
  }

  if (isShowAccountState) {
    await logErc20TokenBalance(tokenName, signers, tokens);
    await logNativeTokenBalance(signers, provider!);
  }
};

export const logErc20TokenBalance = async (
  symbol: TokenSymbol,
  signers: SignerWithAddress[],
  tokens?: any
) => {
  if (!tokens) {
    tokens = TOKEN_ADDRESS.arbitrum.mainnet;
  }
  console.log("--------");
  console.log("Listing ERC20 token balance");
  const tokenInfo = tokens[symbol];
  const ierc20 = await ethers.getContractAt(
    TokenInterfaceName.IERC20,
    tokenInfo.address
  );
  for (let i = 0; i < signers.length; i++) {
    console.log(
      `Account${i}: ${signers[i].address} - ${ethers.utils.formatUnits(
        await ierc20.balanceOf(signers[i].address),
        tokenInfo.decimals
      )} ${symbol}`
    );
  }
};

export const logNativeTokenBalance = async (
  signers: SignerWithAddress[],
  provider: providers.Provider
) => {
  console.log("--------");
  console.log("Listing native token balance");
  for (let i = 0; i < signers.length; i++) {
    console.log(
      `Account${i}: ${signers[i].address} - ${ethers.utils.formatEther(
        await provider!.getBalance(signers[i].address)
      )} ETH`
    );
  }
};
