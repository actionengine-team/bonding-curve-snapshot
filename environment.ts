import { config } from 'dotenv';
import { bool, cleanEnv, host, num, port, str, url } from 'envalid';
import { resolve } from 'path';

config({ path: resolve(__dirname, './.env') });

export const BLANK = '';
export const MAINNET_ALCHEMY_KEY = process.env?.MAINNET_ALCHEMY_API_KEY;
export const PROVIDER_ENDPOINT = process.env?.PROVIDER_ENDPOINT || 
    `https://eth-mainnet.alchemyapi.io/v2/${MAINNET_ALCHEMY_KEY}`;

export const environment = cleanEnv(process.env, {
    NODE_ENV: str({ default: 'development', choices: ['development', 'test', 'production', 'staging'] }),
    VERBOSE: bool({ default: true }),
    PUBLIC_KEY: str({ default: BLANK }),
    PRIVATE_KEY: str({ default: BLANK }),
    INFURA_API_KEY: str({ default: BLANK }),
    ETHERSCAN_API_KEY: str({ default: BLANK }),
    MAINNET_ALCHEMY_API_KEY: str({ default: BLANK }),
    ROPSTEN_ALCHEMY_API_KEY: str({ default: BLANK }),
    RINKEBY_ALCHEMY_API_KEY: str({ default: BLANK }),
    REPORT_GAS: bool({ default: true }),
    GANACHE: str({ default: 'ganache-cli --account "BLANK' }),
    PROVIDER_ENDPOINT: str({ default: PROVIDER_ENDPOINT }),
    SAFE_ADDRESS: str({ default: '0xc102d2544a7029f7BA04BeB133dEADaA57fDF6b4' }),
    SAFE_DEPLOYED_IN_BLOCK: num({ default: 13_724_221 }),
    AUCTION_ENDED_IN_BLOCK: num({ default: 13_770_208 }),
    BLOCKS_PER_CHUNK: num({ default: 1 }),
    SNAPSHOT_FILENAME: str({ default: 'snapshot.csv' }),
    NEXT_BLOCK_INFO: str({ default: 'next.json' }),
    MERKLE_DISTRIBUTOR: bool({ default: false }),
});

!environment.isProduction ? console.log(environment) : null;