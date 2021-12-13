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

/*
    Bancor Formula interface
*/
interface IBancorFormula {
    function calculatePurchaseReturn(
        uint256 _supply,
        uint256 _connectorBalance,
        uint32 _connectorWeight,
        uint256 _depositAmount
    ) external view returns (uint256);

    function calculateSaleReturn(
        uint256 _supply,
        uint256 _connectorBalance,
        uint32 _connectorWeight,
        uint256 _sellAmount
    ) external view returns (uint256);
}
