import { ethers } from "hardhat";
import { initFundsToAccounts } from "./init-funds";
import { TokenSymbol } from "../helpers/types";
import { TOKEN_ADDRESS } from "../helpers/constants";
import { IERC20 } from "../typechain";

async function main() {
  const TOKENS = TOKEN_ADDRESS.ethereum.mainnet;

  // fund 3EUR tokens to demo accounts
  await initFundsToAccounts(
    TokenSymbol.ThreeEURpool,
    "300",
    true,
    false,
    TOKENS
  );
  await initFundsToAccounts(TokenSymbol.agEUR, "5000", true, false, TOKENS);

  const signers = await ethers.getSigners();
  const owner = signers[0];
  const governance = signers[1];
  const reseller = signers[2];
  const depositor = signers[3];
  const newOwner = signers[4];
  const newGovernance = signers[5];
  const newReseller = signers[6];
  const user1 = signers[7];
  const user2 = signers[8];
  const user3 = signers[9];
  const user4 = signers[10];

  const Demo = await ethers.getContractFactory("Demo");

  const demo = await Demo.deploy();

  await demo.deployed();

  const amountofagEUR = ethers.utils.parseEther("100");

  const agEUR = await ethers.getContractAt("IERC20", TOKENS.agEUR.address);

  let tx = await agEUR.connect(user1).transfer(demo.address, amountofagEUR);

  await tx.wait();

  tx = await demo.connect(user1).execute(amountofagEUR);

  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
