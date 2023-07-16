# Recration of error with \_calc_withdraw_one_coin - curve pool

Problem is that after adding liquidity to 3EurPool in curve calling 3EurPool.calc_withdraw_one_coin(0,0) throws error Error: Transaction reverted without a reason string'. This is forked etherem mainnet block 17677331

To setup environment inside root dir:

```shell
npm install
```

Then inside same dir, executing the contract call:

```shell
npx hardhat node (1st terminal)
npx hardhat run scripts/deploy.ts --network localhost  (2nd terminal)
```
