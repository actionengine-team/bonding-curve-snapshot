import '@typechain/hardhat';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-gas-reporter';
import 'solidity-coverage';

import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';
import { HardhatUserConfig, NetworkUserConfig } from 'hardhat/types';
import './type-extensions';

dotenvConfig({ path: resolve(__dirname, './.env') });

const chainIds = {
  mainnet: 1,
  rinkeby: 4,
  goerli: 5,
  kovan: 42,
  ganache: 1337,
  hardhat: 31337,
};

const VERBOSE = process.env.VERBOSE || false;
const PRIVATE_KEY = process.env.PRIVATE_KEY || ''; // Private keys are used Alchemy network deployments
const PRIVATE_MNEMONIC = process.env.PRIVATE_KEY || ''; // Private mnemonic is used for Hardhat local deployment
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ''; // Etherscan API key is used for contract verifications
const INFURA_API_KEY = process.env.INFURA_API_KEY || ''; // Infura maybe configured as the Ethereum provider

const traverseKeys = (obj: any, results = []) => {
  const r: any = results;
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (typeof value !== 'object' || typeof value !== 'function') {
      console.log(value);
      r.push(value);
    } else if (typeof value === 'object') {
      traverseKeys(value, r);
    }
  });
  return r;
};

export const createConfig = (
  network: keyof typeof chainIds
): NetworkUserConfig => {
  const url = `https://eth-${network}.alchemyapi.io/v2/` +
    `${process.env[`${network.toUpperCase()}_ALCHEMY_API_KEY`]}`;
  return {
    accounts: [`0x${PRIVATE_KEY}`],
    chainId: chainIds[network],
    url,
  };
};

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    enabled: !!process.env.REPORT_GAS,
    excludeContracts: [],
    src: './contracts',
  },
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.MAINNET_ALCHEMY_API_KEY}`,
        blockNumber: 13842627,
      },
      accounts: {
        mnemonic: PRIVATE_MNEMONIC,
        count: 160,
        accountsBalance: '1000000000000000000000',
      },
      chainId: chainIds.hardhat,
    },
    // rinkeby: createConfig('rinkeby'),
    // koban: createConfig('kovan'),
    // mainnet: createConfig('mainnet'),
  },
  solidity: {
    compilers: [
      {
        version: '0.8.4',
        settings: {
          metadata: {
            bytecodeHash: 'none',
          },
          optimizer: {
            enabled: true,
            runs: 800,
          },
        },
      }
    ],
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  paths: {
    sources: './contracts',
    artifacts: './artifacts',
    cache: './cache',
    tests: './test',
  },
};

export default config;
