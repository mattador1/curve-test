// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

interface I3EurPool {
    function calc_token_amount(
        uint256[3] calldata _amounts,
        bool _is_deposit
    ) external view returns (uint256);

    function calc_withdraw_one_coin(
        uint256 _burn_amount,
        int128 i
    ) external view returns (uint256);

    function add_liquidity(
        uint256[3] calldata _amounts,
        uint256 _min_mint_amount
    ) external;

    function remove_liquidity_one_coin(
        uint256 _burn_amount,
        int128 i,
        uint256 _min_received
    ) external;

    function balances(uint256 balanace) external view returns (uint256);
}
