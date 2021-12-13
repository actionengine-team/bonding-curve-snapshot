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

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../interfaces/IBondingCurveToken.sol";

contract BondingCurveToken is IBondingCurveToken, ERC20, Ownable {
    constructor() ERC20("Bonding Curve Token", "BCT") {
        super._mint(msg.sender, 10**18);
    }

    /**
     * @dev Destroys `amount` tokens from the caller.
     *
     * See {ERC20-_burn}.
     *
     * Requirements:
     *
     * - the caller must have the `BURNER_ROLE`.
     */
    function burn(address from, uint256 amount) external override {}

    /**
     * @dev Creates `amount` new tokens for `to`.
     *
     * See {ERC20-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the `MINTER_ROLE`.
     */
    function mint(address to, uint256 amount) external override {}
}
