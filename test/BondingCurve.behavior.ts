/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import hre from "hardhat";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

const zero_token = "0x0000000000000000000000000000000000000000";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const keys = async (obj: any) => {
    Object.keys(obj).toString().split(`,`).forEach(p => { process.stdout.write(`${p}` + `\n`); })
};

export const printTxReceipt = async (receipt: any) => {
    process.stdout.write(
        `${receipt.from} => ${receipt.to} (gasUsed:${receipt.gasUsed})(${receipt.status})` + `\n` +
        `\ttx:${receipt.transactionHash} (block.no:${receipt.blockNumber})` + `\n`
    );
};

export const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * max);
};

const advanceTimeAndBlock = async function (time: number) {
    process.stdout.write(`advancing:`);
    const currentBlockNum = await hre.ethers.provider.getBlockNumber();
    const currentBlock = await hre.ethers.provider.getBlock(currentBlockNum);
    const { hash, parentHash, number, timestamp, nonce, difficulty, gasLimit, gasUsed, miner, extraData, transactions } = currentBlock;
    const currentBlockTime = currentBlock.timestamp;
    const newBlockTime = currentBlockTime + time;
    await hre.ethers.provider.send('evm_mine', [newBlockTime]);
    process.stdout.write(`(${currentBlockNum}):` + `\n` +
        `\t` + `${parentHash}` + `\t` + `\n` +
        `\t` + `${hash}` + `\t` + `\n` +
        `\t` + `${timestamp}:${number}, ${nonce}, ${difficulty}` + `\t` + `\n` +
        `\t` + `${gasLimit}, ${gasUsed}` + `\t` + `\n` +
        `\t` + `tx:${transactions}` + `\t` + `\n` +
        `\t` + `current block time:${currentBlockTime} => adv block time:${newBlockTime}` + `\n`);
};

export function shouldBehaveLikeBondingCurveToken(): void {
    it("should return BondingCurveToken contract constructor initial state", async function () {    
        const BondingCurveTokenAddress = await this.BondingCurveToken.address;
        const BondingCurveTokenBalance: BigNumber = await hre.ethers.provider.getBalance(BondingCurveTokenAddress);
        process.stdout.write(`Deployed Bonding Curve Token balance => ` +
            `${await this.BondingCurveToken.address}: ${BondingCurveTokenBalance} (wei)` + `\n`);                 
        expect(await this.BondingCurveToken.address);
        expect(BondingCurveTokenBalance).to.equal(0);           
    });

    it("should return BancorFormula contract constructor initial state", async function () {
        const BancorFormulaAddress = await this.BancorFormula.address;
        const BancorFormulaBalance: BigNumber = await hre.ethers.provider.getBalance(BancorFormulaAddress);          
        process.stdout.write(`Deployed Bancor Formula balance => ` +
            `${await this.BancorFormula.address}: ${BancorFormulaBalance} (wei)` + `\n`);
    });

    it("should return BondCurveVault contract constructor initial state", async function () {
        const BondingCurveVaultAddress = await this.BondingCurveVault.address;
        const BondingCurveVaultBalance: BigNumber = await hre.ethers.provider.getBalance(BondingCurveVaultAddress);            
        process.stdout.write(`Deployed Bonding Curve Vault balance => ` +
            `${await this.BondingCurveVault.address}: ${BondingCurveVaultBalance} (wei)` + `\n`);  
    });

    it("should return BondingCurve contract constructor initial state", async function () {
        const BondingCurveAddress = await this.BondingCurve.address;
        const BondingCurveBalance: BigNumber = 
            await hre.ethers.provider.getBalance(BondingCurveAddress);                
        process.stdout.write(`Deployed Bonding Curve balance => ` +
            `${await this.BondingCurve.address}: ${BondingCurveBalance} (wei)` + `\n`);
    })

    it("should initialize BondingCurve - initializeCurve", async function () {                
        await this.BondingCurve.initializeCurve(
                this.BondingCurveToken.address, 
                this.BancorFormula.address, 
                this.BondingCurveVault.address,
                this.signers.admin.address,
                10,
                10,
                );        
        const buy_fee_percent = await this.BondingCurve.buyFeePct();        
        console.log(`buy fee % verification ${buy_fee_percent}`);
        const sell_fee_percent = await this.BondingCurve.sellFeePct();        
        console.log(`sell fee % verification ${sell_fee_percent}`);        
    });
    
    it("should add collateral token to BondingCurve - addCollateralToken", async function() {        
        await this.BondingCurve.addCollateralToken(
            zero_token,
            2000000000000,
            1000000000000,    
            100,        
        );
        const collateral_token = await this.BondingCurve.collaterals(zero_token);
        console.log(`collateral token (0) ${collateral_token}`);                
    });

    it("should make buy order to BondingCurve - makeBuyOrder", async function () {
        console.log(`implementation required`);
    });

    it("should make sell order to BondingCurve - makeSellOrder", async function () {
        console.log(`implementation required`);
    });

    it("should display other unnamed addresses and balances", async function () {        
        const ad: SignerWithAddress = this.signers.admin;
        process.stdout.write(`(+)` + `\t` + 
        `${await ad.address}:${await ad.getBalance()}` + `\n`);
        for (let i = 0; i < this.unnamedAccounts.length; i++) {
            const a: SignerWithAddress = this.unnamedAccounts[i];
            process.stdout.write(`(${i})` + `\t` + 
            `${await a.address}:${await a.getBalance()}` + `\n`);
        }
        process.stdout.write(`🎉🎉🎉 Let's start fondling the contract` + `\n`);
    });

    it("should display BondingCurve functions and properties", async function () {        
        false && expect(await keys(this.BondingCurveToken));
        console.log(`disabled`);
    });
    
    it("should display unnamed addresses and balances again", async function () {
        const ad: SignerWithAddress = this.signers.admin;
        process.stdout.write(`\n` + `(+)` + `\t` + 
            `${await ad.address}:${await ad.getBalance()}` + `\n`);
        for (let i = 0; i < this.unnamedAccounts.length; i++) {
            const a: SignerWithAddress = this.unnamedAccounts[i];
            if (i == 2) {
                process.stdout.write(`(${i})` + `\t` + 
                `${await a.address}:${await a.getBalance()}` + `\n`);
            } else {
                process.stdout.write(`(${i})` + `\t` + 
                `${await a.address}:${await a.getBalance()}` + `\n`);
            }
        }        
    });

};
