/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import hre from "hardhat";
import { expect } from "chai";
import { BigNumber, BigNumberish, ContractReceipt } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { hexToAscii, sha3, toBN, fromWei, toWei } from "web3-utils";
import { doesNotMatch } from "assert";
import { fstat , writeFileSync} from "fs";

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

const advanceTime = async (time : number) => {
    
        await hre.ethers.provider.send(
            "evm_increaseTime",
            [time]
        )

        await hre.ethers.provider.send(
            "evm_mine", [] )


  
    return true;
  };

export function shouldBehaveLikeBondingCurveToken(): void {

    const transactions : [number, number, string, string, number][] = [];
    let capasitor = 0;


    it("should return BancorFormula contract constructor initial state", async function () {
        const BancorFormulaAddress = await this.BancorFormula.address;
        const BancorFormulaBalance: BigNumber = await hre.ethers.provider.getBalance(BancorFormulaAddress);          
        process.stdout.write(`Deployed Bancor Formula balance => ` +
            `${await this.BancorFormula.address}: ${BancorFormulaBalance} (wei)` + `\n`);
    });


    it("should return BondingCurve contract constructor initial state", async function () {
        const BondingCurveAddress = await this.BondingCurve.address;
        const BondingCurveBalance: BigNumber = 
            await hre.ethers.provider.getBalance(BondingCurveAddress);                
        process.stdout.write(`Deployed Bonding Curve balance => ` +
            `${await this.BondingCurve.address}: ${BondingCurveBalance} (wei)` + `\n`);
    })

    it("should initialize BondingCurve - initializeCurve", async function () {   
        const currentBlockNum = await hre.ethers.provider.getBlockNumber();
        const currentBlock = await hre.ethers.provider.getBlock(currentBlockNum);
        const { hash, parentHash, number, timestamp, nonce, difficulty, gasLimit, gasUsed, miner, extraData, transactions } = currentBlock;
        

        await this.BondingCurve.initialize(this.DaoRegistry.address, this.signers.admin.address);
        await this.BondingCurve.initializeCurve(
           this.BancorFormula.address, // _formula
           this.DaoRegistry.address,// _movement
            this.Endowment.address, // _endowment
            toWei('1'), // _intiative_goal
            this.Endowment.address, //_beneficiary
            "100", // _buyFeePct
            "100", // _sellFeePct
            timestamp + 1000, // _timeStart
            timestamp + 100000, // _timeCooldown
            timestamp + 10000000 // _timeEnd
        );
    
        const buy_fee_percent = await this.BondingCurve.buyFeePct();        
        console.log(`buy fee % verification ${buy_fee_percent}`);
        const sell_fee_percent = await this.BondingCurve.sellFeePct();        
        console.log(`sell fee % verification ${sell_fee_percent}`);         
    });
    
    it("should add collateral token to BondingCurve - addCollateralToken", async function() {        
        await this.BondingCurve.addCollateralToken(
            zero_token,
            toWei('0.02'),
            toWei('0.01'), 
            "90000",
        );
        const collateral_token = await this.BondingCurve.collaterals(zero_token);
        console.log(`collateral token (0) ${collateral_token}`);                
    });

    it("should make buy order to BondingCurve - makeBuyOrder", async function () {
        this.timeout(4 * 60 * 1000)


        
        await advanceTime(10000);
for (let index = 0; index < this.unnamedAccounts.length * 10; index++) {
const account  = this.unnamedAccounts[index % this.unnamedAccounts.length];


    const byed =  await this.BondingCurve.connect(account).makeBuyOrder(
        account.address,
        zero_token,
         toWei('0.001'),
        "100",
        {
            value: toWei('0.001')
        }
    );


    let receipt = (await byed.wait()).events?.filter((x) => {return x.event == "MakeBuyOrder"})[0].args;
    const returnedAmount = fromWei( receipt?.returnedAmount.toString());
    const purchaseAmount = fromWei( receipt?.purchaseAmount.toString());
    const exchangeRate = +purchaseAmount / +returnedAmount
    capasitor += +returnedAmount

    transactions.push([index , exchangeRate, returnedAmount , purchaseAmount, capasitor])
    console.log(transactions[transactions.length - 1]);
    
   
}
        
    const lineArray : string[] = [];
    transactions.forEach(function (infoArray) {
    var line = infoArray.join(",");
    lineArray.push(line);
    });
    var csvContent = lineArray.join("\n");
      
    writeFileSync('testData.csv',  csvContent) 
        
        
        
        console.log(`using all the hardhat signers, buy smallest increment tokens and print out the token price`);
    });

    it("should make sell order to BondingCurve - makeSellOrder", async function () {
        console.log(`using some percentage of individuals, from common-stack, demonstrate various sell orderes`);
    });

    it("should also distribute a token across ./example-data/example.csv", async function () {
        console.log(`using example.csv, distribute tokens across the curve`);
    });

    it("should update ./snapshot/index to store the block number, timestamp with the address and amount contributed", 
        async function () {
        console.log(`using the updated example.csv, distribute tokens across the curve`);
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
