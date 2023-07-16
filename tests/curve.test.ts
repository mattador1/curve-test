// FORKED_ETH_BLOCK_NUMBER=17677331

import { TOKEN_ADDRESS, ZERO_ADDRESS } from "../helpers/constants";
import { BigNumber } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { expect, assert } from "chai";
import { ethers } from "hardhat";
import hre from "hardhat";

import { reset } from "@nomicfoundation/hardhat-network-helpers";
import {
  initFundsToAccounts,
  logNativeTokenBalance,
} from "../scripts/init-funds";
import { TokenSymbol } from "../helpers/types";
import { TokenInterfaceName, MAX_UINT256 } from "../helpers/constants";

import { IERC20 } from "../typechain";
import { mineBlock } from "../helpers/utils";

import { ContractTransaction } from "ethers";
import { EthereumAddress } from "../helpers/types";

// Declare globally that an object has additional methods
declare module "../typechain" {
  interface IERC20 {
    increaseAllowance(
      spender: EthereumAddress,
      addedValue: BigNumber
    ): Promise<ContractTransaction>;
    decreaseAllowance(
      spender: EthereumAddress,
      substractedValue: BigNumber
    ): Promise<ContractTransaction>;
  }
  interface IFijaVault {
    increaseAllowance(
      spender: EthereumAddress,
      addedValue: BigNumber
    ): Promise<ContractTransaction>;
    decreaseAllowance(
      substractedValue: BigNumber
    ): Promise<ContractTransaction>;
  }
}

const TOKENS = TOKEN_ADDRESS.ethereum.mainnet;

let signers: SignerWithAddress[];
let owner: SignerWithAddress;
let governance: SignerWithAddress;
let reseller: SignerWithAddress;
let depositor: SignerWithAddress;
let newOwner: SignerWithAddress;
let newGovernance: SignerWithAddress;
let newReseller: SignerWithAddress;
let user1: SignerWithAddress;
let user2: SignerWithAddress;
let user3: SignerWithAddress;
let user4: SignerWithAddress;

let agEUR: IERC20;
let EURS: IERC20;
let EURT: IERC20;
let EUROC: IERC20;
let crv: IERC20;
let cvx: IERC20;
let threeEurPool: IERC20;

let MAX_VAULT_VALUE = MAX_UINT256;
let MAX_TICKET_SIZE = MAX_UINT256;

const beforeHook = async () => {
  await initFundsToAccounts(TokenSymbol.agEUR, "5000", true, false, TOKENS);
  await initFundsToAccounts(TokenSymbol.EURT, "5000", true, false, TOKENS);
  await initFundsToAccounts(TokenSymbol.EURS, "5000", true, false, TOKENS);
  await initFundsToAccounts(
    TokenSymbol.ThreeEURpool,
    "300",
    true,
    false,
    TOKENS
  );

  console.log("Preparing Curve swap tests");

  console.log("Preparing Vault test...");

  signers = await ethers.getSigners();
  owner = signers[0];
  governance = signers[1];
  reseller = signers[2];
  depositor = signers[3];
  newOwner = signers[4];
  newGovernance = signers[5];
  newReseller = signers[6];
  user1 = signers[7];
  user2 = signers[8];
  user3 = signers[9];
  user4 = signers[10];

  agEUR = await ethers.getContractAt(
    TokenInterfaceName.IERC20,
    TOKENS.agEUR.address
  );
  EURS = await ethers.getContractAt(
    TokenInterfaceName.IERC20,
    TOKENS.EURS.address
  );
  EURT = await ethers.getContractAt(
    TokenInterfaceName.IERC20,
    TOKENS.EURT.address
  );
  EUROC = await ethers.getContractAt(
    TokenInterfaceName.IERC20,
    TOKENS.EUROC.address
  );
  crv = await ethers.getContractAt(
    TokenInterfaceName.IERC20,
    TOKENS.CRV.address
  );
  cvx = await ethers.getContractAt(
    TokenInterfaceName.IERC20,
    TOKENS.CVX.address
  );

  threeEurPool = await ethers.getContractAt(
    TokenInterfaceName.IERC20,
    TOKENS.ThreeEURpool.address
  );

  console.log("Preparing Vault test done");
};
const afterHook = async () => {
  console.log("----------------------");
  console.log("Test complete");
  console.log("----------------------");
  console.log("Reseting env for test");
  console.log("----------------------");
  await reset(
    process.env.ALCHEMY_PROVIDER_ARB_MAINNET,
    parseInt(process.env.FORKED_ARB_BLOCK_NUMBER!)
  );
};

describe("Stablecoin strategy demo test", () => {
  before("Preparing Signer and Contracts", beforeHook);
  after("Resetting environment for each test", afterHook);

  describe("Deploy stablecoin strategy and vault initalize and whitelist user1 and beta test", () => {
    it("deploy vault and strategy", async () => {
      const Demo = await ethers.getContractFactory("Demo");

      const demo = await Demo.deploy();

      await demo.deployed();

      const amountofagEUR = ethers.utils.parseUnits("50", 18);

      const agEUR = await ethers.getContractAt("IERC20", TOKENS.agEUR.address);

      let tx = await agEUR.connect(user1).transfer(demo.address, amountofagEUR);

      await tx.wait();

      tx = await demo.connect(user1).execute(amountofagEUR);

      await tx.wait();

      const amount = await demo.giveMeCoin();

      console.log(amount);
    });
  });
});
