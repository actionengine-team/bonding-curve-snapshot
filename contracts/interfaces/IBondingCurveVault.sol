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
*/

/**
 * @dev Interface of the Vault.
 */
interface IBondingCurveVault {
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
    ) external;
}
