# Gnosis Safe Snapshot, and Token Calculation
## Transaction snapshot and application to a bonding curve for token claims
Computing a users token from a bonding curve at the time of the contribution expends unnecessary gas and time for the transaction. This repository proposes using a Gnosis Safe address for a token offering where users send their contributions during a window of time (start and end block) after which, the addresses are extracted from the blockchain (certain addresses maybe replaced with verified transaction hashes - such as ETH, DAI sent from Coinbase or other custodial services), then applied to a bonding curve to compute the possible token distribution, off chain. Finally, the token distribution is provided to a Merkle distributor for token holders to claim.

### Environment variables
* keys are without the preceding 0x
* Etherscan enables verification of contracts
* Alchemy enables use of the particular network (mainnet, ropsten, rinkeby, kovan)
* Ganache enables use of the Ganache tooling
* see `environment.ts` for all required variables
```sh
NODE_ENV=development
VERBOSE=true
PUBLIC_KEY=
PRIVATE_KEY=
INFURA_API_KEY=
ETHERSCAN_API_KEY=
MAINNET_ALCHEMY_API_KEY=
ROPSTEN_ALCHEMY_API_KEY=
RINKEBY_ALCHEMY_API_KEY=
REPORT_GAS=true
GANACHE=ganache-cli --account "private-key"
```

### Deploy Bonding Curve
Augmented Bancor Bonding Curve contracts.
```sh
yarn && yarn run build && yarn run compile
npx hardhat run scripts/deploy.ts --network rinkeby
```
#### Tests
```sh
yarn && yarn run build && yarn run compile
npx hardhat test
```

### Snapshot Data for Token Distribution
The following `environment` variables describe a contract address, Gnosis Safe address, its deployment block number, and the block number in which 
```sh
PROVIDER_ENDPOINT: str({ default: PROVIDER_ENDPOINT }),
SAFE_ADDRESS: str({ default: '0xc102d2544a7029f7BA04BeB133dEADaA57fDF6b4' }),
SAFE_DEPLOYED_IN_BLOCK: num({ default: 13_724_221 }),
AUCTION_ENDED_IN_BLOCK: num({ default: 13_770_208 }),
BLOCKS_PER_CHUNK: num({ default: 1 }),
SNAPSHOT_FILENAME: str({ default: 'snapshot.csv' }),
NEXT_BLOCK_INFO: str({ default: 'next.json' }),
MERKLE_DISTRIBUTOR: bool({ default: false }),
```
#### Run snapshot
```sh
ts-node ./snapshot/index.ts
```

# Example deployment
### deploy, rinkeby
* `npx hardhat run ./scripts/deploy.ts --network rinkeby` - deploys the contracts to rinkeby and then verifies the contracts

```sh
No need to generate any newer typings.
  Setup Admin and Unnamed Accounts
    Creating Contract
Deployed Tokens to the following address => 0x9977fE56469362E684207b0202b58be93b4aE800
Deployed BancorFormula to the following address => 0x80C4fDeA03A55E964beD7F38EC3200fd110Cc767
Deployed BondingCurveVault to the following address => 0x57E15fc7bbA5c416aAd2f29d6412D272d7a3A695
deployed contract to => 0x9977fE56469362E684207b0202b58be93b4aE800:0x9977fE56469362E684207b0202b58be93b4aE800 (wei)
      ✓ should return BondingCurveToken contract constructor initial state
(+)     0xAEC83a250F421683b7db56B2AbE2595aD5Bc0E4B:9999967048216000000000
(0)     0x6990520c50b637bE1Bb3a4BAcF2423FAD149CdeD:10000000000000000000000
(1)     0xE3e17172D7476fa3f3683721321ecFDE8EDbd99c:10000000000000000000000
(2)     0x24E0B0fAecc75841CB898A8c767F4B8d273dB8D3:10000000000000000000000
(3)     0x98E51A5BaDd4A1aA6D84D95A5251a6Aee26fEE2A:10000000000000000000000
(4)     0x72929D343433Db055ED596aae073Dbc51171a7A7:10000000000000000000000
(5)     0x043cE78acE9988fa9598F0d4C3C01634b63bD944:10000000000000000000000
(6)     0x5BC8Dc70f8A3bf8fB753D2f9D35D85787B89f6F6:10000000000000000000000
(7)     0xc9D030B6eb08443c647957dF613193EEc66e7023:10000000000000000000000
(8)     0xAc84F2E8f902f80E357cCA5E290BF4700B69F8C1:10000000000000000000000
(9)     0xEd6c726fB734CD91e5A27288b900322c2a602Cc7:10000000000000000000000
(10)    0x8983b25B6424927A0e6a6654dcAf3CE9A1335B47:10000000000000000000000
(11)    0xBd5BC69B4465d03159CC40701c642CD687D43D94:10000000000000000000000
(12)    0x818e9e5d5d60287f71232dfd71003F2D4491763e:10000000000000000000000
(13)    0xB53AA4499cdd8E2C45335f514E4c7cdC7211743C:10000000000000000000000
(14)    0x343518235FAdd80D3BCDb91817faBA5AF20F3Dc4:10000000000000000000000
(15)    0xA4e6c47307E26f18B331136ab062FBEA961de08E:10000000000000000000000
(16)    0xb7ad0aE20F8bF6264838B1865FE4b0BF0568eB29:10000000000000000000000
(17)    0xae1100C83375A5D03e7C04448A72F0758007fcF3:10000000000000000000000
(18)    0x358b7277CBE3d96dA3b4c489F09C1b73de4F260B:10000000000000000000000
🎉🎉🎉 Let's start fondling the contract
      
(+)     0xAEC83a250F421683b7db56B2AbE2595aD5Bc0E4B:9999967048216000000000
(0)     0x6990520c50b637bE1Bb3a4BAcF2423FAD149CdeD:10000000000000000000000
(1)     0xE3e17172D7476fa3f3683721321ecFDE8EDbd99c:10000000000000000000000
(2)     0x24E0B0fAecc75841CB898A8c767F4B8d273dB8D3:10000000000000000000000
(3)     0x98E51A5BaDd4A1aA6D84D95A5251a6Aee26fEE2A:10000000000000000000000
(4)     0x72929D343433Db055ED596aae073Dbc51171a7A7:10000000000000000000000
(5)     0x043cE78acE9988fa9598F0d4C3C01634b63bD944:10000000000000000000000
(6)     0x5BC8Dc70f8A3bf8fB753D2f9D35D85787B89f6F6:10000000000000000000000
(7)     0xc9D030B6eb08443c647957dF613193EEc66e7023:10000000000000000000000
(8)     0xAc84F2E8f902f80E357cCA5E290BF4700B69F8C1:10000000000000000000000
(9)     0xEd6c726fB734CD91e5A27288b900322c2a602Cc7:10000000000000000000000
(10)    0x8983b25B6424927A0e6a6654dcAf3CE9A1335B47:10000000000000000000000
(11)    0xBd5BC69B4465d03159CC40701c642CD687D43D94:10000000000000000000000
(12)    0x818e9e5d5d60287f71232dfd71003F2D4491763e:10000000000000000000000
(13)    0xB53AA4499cdd8E2C45335f514E4c7cdC7211743C:10000000000000000000000
(14)    0x343518235FAdd80D3BCDb91817faBA5AF20F3Dc4:10000000000000000000000
(15)    0xA4e6c47307E26f18B331136ab062FBEA961de08E:10000000000000000000000
(16)    0xb7ad0aE20F8bF6264838B1865FE4b0BF0568eB29:10000000000000000000000
(17)    0xae1100C83375A5D03e7C04448A72F0758007fcF3:10000000000000000000000
(18)    0x358b7277CBE3d96dA3b4c489F09C1b73de4F260B:10000000000000000000000
      ✓ should display unnamed addresses and balances again

·-----------------------|---------------------------|-------------|-----------------------------·
|  Solc version: 0.8.4  ·  Optimizer enabled: true  ·  Runs: 800  ·  Block limit: 12450000 gas  │
························|···························|·············|······························
|  Methods                                                                                      │
·············|··········|·············|·············|·············|···············|··············
|  Contract  ·  Method  ·  Min        ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
·············|··········|·············|·············|·············|···············|··············
|  Deployments          ·                                         ·  % of limit   ·             │
························|·············|·············|·············|···············|··············
|  BancorFormula        ·          -  ·          -  ·    3023207  ·       24.3 %  ·          -  │
························|·············|·············|·············|···············|··············
|  BondingCurveToken    ·          -  ·          -  ·     849419  ·        6.8 %  ·          -  │
························|·············|·············|·············|···············|··············
|  BondingCurveVault    ·          -  ·          -  ·     246347  ·          2 %  ·          -  │
·-----------------------|-------------|-------------|-------------|---------------|-------------·

  4 passing (864ms)

Time: 0h:00m:05s                                                                                 
```

### deploy
`yarn run deploy:rinkeby  `
```sh
Nothing to compile
No need to generate any newer typings.
Compiling 1 file with 0.8.4
Successfully submitted source code for contract
contracts/bondingcurve/BondingCurveToken.sol:BondingCurveToken at 0x83598Df17253233CBe42aFb4AE1d331454ba35E1
for verification on Etherscan. Waiting for verification result...
Successfully verified contract BondingCurveToken on Etherscan.
https://rinkeby.etherscan.io/address/0x83598Df17253233CBe42aFb4AE1d331454ba35E1#code
```

### verify 
` npx hardhat verify --network rinkeby 0x83598Df17253233CBe42aFb4AE1d331454ba35E1 `
```sh
No need to generate any newer typings.
Contract deployed to: 0x83598Df17253233CBe42aFb4AE1d331454ba35E1
Verify using: npx hardhat verify --network rinkeby 0x83598Df17253233CBe42aFb4AE1d331454ba35E1 
Time: 0h:00m:12s     
```

Updated deployment script combines the deploy and verification into one command.