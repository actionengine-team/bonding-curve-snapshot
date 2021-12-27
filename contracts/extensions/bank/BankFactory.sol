pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

// SPDX-License-Identifier: MIT

import "../../core/DaoConstants.sol";
import "../../core/CloneFactory.sol";
import "./Bank.sol";

contract BankFactory is CloneFactory, DaoConstants {
    address public identityAddress;

    event BankCreated(address bankAddress);

    constructor(address _identityAddress) {
        identityAddress = _identityAddress;
    }

    /**
     * @notice Create and initialize a new BankExtension
     * @param maxExternalTokens The maximum number of external tokens stored in the Bank
     */
    function createBank(uint8 maxExternalTokens) external returns(address bankAddress) {
        BankExtension bank = BankExtension(_createClone(identityAddress));
        bank.setMaxExternalTokens(maxExternalTokens);
        emit BankCreated(address(bank));
        return address(bank);
    }
}
