import { ethers } from "hardhat";
import hre from "hardhat";
import { TOKEN_ADDRESS, TokenInterfaceName } from "../helpers/constants";
import { EthereumAddress, TokenSymbol } from "./types";
import { BigNumber } from "ethers";

const ETH_FOUNDING_FOR_WHALE_WEI = ethers.utils.parseEther("50.0");
const TOKEN = TOKEN_ADDRESS.arbitrum.mainnet;

// Accounts with large erc20 token balances. Used as sources of token funds on forked chains
// Needs update if the list of Tokens is changed or expanded
export const WHALE_ADDRESSES = [
  // Should we make this an array of EthereumAddresses instead??

  "0xeebe760354f5dcba195ede0a3b93901441d0968f", // USDC whale
  "0x662CBfaADE4e3DCB2be570c1A250DF98C23c1783", // WETH account
  "0x19bD29e74c450ac73B49b5fB199a3d0d4c8f37b2", // WETH whale
  "0x59a661F1C909ca13ba3E9114BFDd81E5a420705D", // WBTC whale
  "0x53D56901738EEcFB54D66320E1631A33520e2888", // FRAX account
  "0x1BA2743042d9Fd06905182BaC83171C4773a29a0", // FRAX account
  "0x1B72Bac3772050FDCaF468CcE7e20deb3cB02d89", // UNI whale, also WETH and USDC
  "0x62B8e137ee87Ab3CaEB2FEA3B88D04abeA7C5579", // LINK whale
  "0x0787Bda6907e9D18d026e882caBb25c8EC636E98", // DAI whale
  "0x62383739D68Dd0F844103Db8dFb05a7EdED5BBE6", // USDT whale
  "0xB38e8c17e38363aF6EbdCb3dAE12e0243582891D", // sGMX whale - Binance Hot Wallet
  "0xa116f421ff82A9704428259fd8CC63347127B777", //agEUR
  "0x618a9141045Db7B2e28B3EDda56BFBeee0e65ec1", // EURT
  "0xBFCd86e36D947A9103A7D4a95d178A432723d6aD", // EURS
  "0x98DebD798afbC0641B3AA0AdE7443BC8B619261E", // 3EURpool-f
  "0xF977814e90dA44bFA03b6295A0616a897441aceC", // CRV
] as EthereumAddress[];

// Function transfers funds from list of addresses to the receiverAddress
// Iterates through the list until the amount asked is fullfilled
// Only transfers if a single whale can fulfill the ask
// Throws error if there is no single whale in list who can fulfill the ask
// Does not check if inputs are meaningful, e.g., ask amount translates to positive number
export const drawFromFaucet = async (
  whaleAddresses: EthereumAddress[],
  receiverAddress: EthereumAddress,
  tokenName: TokenSymbol,
  askAmount: string,
  tokens?: any
) => {
  if (!tokens) {
    tokens = TOKEN;
  }

  const tokenData = tokens[tokenName];
  const signers = await ethers.getSigners();
  const account0 = signers[0]; // neutral account orchestrating the transaction
  const provider = account0.provider;

  if (!provider) {
    throw new Error("Provider not defined");
  }

  const token = await ethers.getContractAt(
    TokenInterfaceName.IERC20,
    tokenData.address
  );

  let unfilledAsk: BigNumber = ethers.utils.parseUnits(
    askAmount,
    tokenData.decimals
  );

  for (let whaleAddress of whaleAddresses) {
    const whale = await ethers.getSigner(whaleAddress);
    // exit the loop if ask is filled
    if (unfilledAsk.eq(BigNumber.from(0))) {
      break;
    }
    // impersonate as whale
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [whaleAddress],
    });
    // calculate balance to transfer from whale
    const whaleBalance = await token.balanceOf(whaleAddress);
    const transferAmount = whaleBalance.gt(unfilledAsk)
      ? unfilledAsk
      : BigNumber.from(0);
    if (transferAmount.eq(BigNumber.from(0))) continue;
    // console.log("Transferbalance:", transferAmount);
    // fund the whale with ETH so he has gas available for transaction

    // this is so that it does not add if it is unneccesary, important for using it in the loop
    const currentETHBalanceOfWhale = await provider.getBalance(whaleAddress);
    if (currentETHBalanceOfWhale.lte(ethers.utils.parseEther("20"))) {
      await account0.sendTransaction({
        to: whaleAddress,
        value: ETH_FOUNDING_FOR_WHALE_WEI,
      });
    }

    // console.log("Executed funding for whale");
    const tx = await token
      .connect(whale)
      .transfer(receiverAddress, transferAmount);
    await tx.wait();
    const receiverBalanceAfterWhaleTransfer = await token.balanceOf(
      receiverAddress
    );
    unfilledAsk = unfilledAsk.sub(transferAmount);
    if (unfilledAsk.eq(BigNumber.from(0))) {
      break;
    }
  }
  if (unfilledAsk.gt(BigNumber.from(0))) {
    throw new Error("The requested funds could not be transferred");
  }
};
