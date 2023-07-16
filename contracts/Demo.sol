// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

import "./I3EurPool.sol";

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "hardhat/console.sol";

contract Demo {
    address constant poolAddr = 0xb9446c4Ef5EBE66268dA6700D26f96273DE3d571;

    address constant agEUR = 0x1a7e4e63778B4f12a199C062f3eFdD288afCBce8;

    function execute(uint256 amountOfAgEur) public {
        uint256[3] memory _amount = [amountOfAgEur, 0, 0];

        uint256 amountOut = I3EurPool(poolAddr).calc_token_amount(
            _amount,
            true
        );

        amountOut = (amountOut * (10000 - 30)) / 10000;

        SafeERC20.safeApprove(IERC20(agEUR), poolAddr, amountOfAgEur);

        uint256 amountCoin = I3EurPool(poolAddr).calc_withdraw_one_coin(0, 0);

        console.log("amountCoin:", amountCoin);

        I3EurPool(poolAddr).add_liquidity(_amount, amountOut);

        amountCoin = I3EurPool(poolAddr).calc_withdraw_one_coin(0, 0);
    }
}
