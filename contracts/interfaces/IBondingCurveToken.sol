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

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @dev Interface of the IBondingCurveToken.
 */
interface IBondingCurveToken is IERC20 {
    /**
     * @dev Destroys `amount` tokens from the caller.
     *
     * See {ERC20-_burn}.
     *
     * Requirements:
     *
     * - the caller must have the `BURNER_ROLE`.
     */
    function burn(address from, uint256 amount) external;

    /**
     * @dev Creates `amount` new tokens for `to`.
     *
     * See {ERC20-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the `MINTER_ROLE`.
     */
    function mint(address to, uint256 amount) external;
}
