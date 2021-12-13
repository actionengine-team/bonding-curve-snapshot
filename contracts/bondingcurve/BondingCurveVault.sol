// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/*
      ___                      ___                   ___          ___          ___     
     /  /\        ___         /  /\     ___         /  /\        /  /\        /  /\    
    /  /::|      /  /\       /  /::|   /__/\       /  /::\      /  /::\      /  /::\   
   /  /:|:|     /  /:/      /  /:|:|   \  \:\     /  /:/\:\    /  /:/\:\    /  /:/\:\  
  /  /:/|:|__  /  /:/      /  /:/|:|__  \__\:\   /  /:/  \:\  /  /::\ \:\  /  /:/  \:\ 
 /__/:/_|::::\/__/:/  ___ /__/:/_|::::\ /  /::\ /__/:/ \__\:|/__/:/\:\_\:\/__/:/ \__\:\
 \__\/  /~~/:/|  |:| /  /\\__\/  /~~/://  /:/\:\\  \:\ /  /:/\__\/  \:\/:/\  \:\ /  /:/
       /  /:/ |  |:|/  /:/      /  /://  /:/__\/ \  \:\  /:/      \__\::/  \  \:\  /:/ 
      /  /:/  |__|:|__/:/      /  /://__/:/       \  \:\/:/       /  /:/    \  \:\/:/  
     /__/:/    \__\::::/      /__/:/ \__\/         \__\::/       /__/:/      \  \::/   
     \__\/         ~~~~       \__\/                    ~~        \__\/        \__\/    

        11fbc44e7d7e535041c0fc5076637af5b25276c4af7a9ce146dcbefee48f1cdc
*/

import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IBondingCurveVault.sol";

contract BondingCurveVault is IBondingCurveVault, Ownable {
    receive() external payable {}

    /**
     * @notice Transfer `_value` `_token` from the Vault to `_to`
     * @param _token Address of the token being transferred
     * @param _to Address of the recipient of tokens
     * @param _value Amount of tokens being transferred
     */
    function transfer(
        address _token,
        address _to,
        uint256 _value
    ) external override {}
}
