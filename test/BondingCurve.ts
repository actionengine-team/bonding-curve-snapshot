import hre from "hardhat";
import { BigNumber } from "ethers";
import { Artifact } from "hardhat/types";
import { Signers } from "../types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { BondingCurveToken, BondingCurveVault, BancorFormula, BondingCurve } from '../typechain';
import { shouldBehaveLikeBondingCurveToken } from "./BondingCurve.behavior";

const { deployContract } = hre.waffle;

describe("Setup Admin and Unnamed Accounts", function () {
    before(async function () {
        this.signers = {} as Signers;
        const signers: SignerWithAddress[] = await hre.ethers.getSigners();
        this.signers.admin = signers[0];
        this.unnamedAccounts = [] as Signers[];
        for (let i = 1; i <= (signers.length - 1); i++) {
            const unnamedAccount: SignerWithAddress = signers[i];
            this.unnamedAccounts.push(unnamedAccount);
        }
    });

    describe("BondingCurve - initialization", function () {
        before(async function () {            
            const BondingCurveToken: Artifact = await hre.artifacts.readArtifact("BondingCurveToken");            
            this.BondingCurveToken = await deployContract(this.signers.admin, BondingCurveToken); 
            console.log(`Deployed Tokens to the following address => ${this.BondingCurveToken.address}`);                                    
            const BancorFormula: Artifact = await hre.artifacts.readArtifact("BancorFormula");
            this.BancorFormula = await deployContract(this.signers.admin, BancorFormula);
            console.log(`Deployed BancorFormula to the following address => ${this.BancorFormula.address}`);            
            const BondingCurveVault: Artifact = await hre.artifacts.readArtifact("BondingCurveVault");
            this.BondingCurveVault = await deployContract(this.signers.admin, BondingCurveVault);
            console.log(`Deployed BondingCurveVault to the following address => ${this.BondingCurveVault.address}`);                        
            const BondingCurve: Artifact = await hre.artifacts.readArtifact("BondingCurve");
            this.BondingCurve = await deployContract(this.signers.admin, BondingCurve);
            console.log(`Deployed BondingCurve to the following address => ${this.BondingCurve.address}`);            
            process.stdout.write("\n");            
        });
        
        // it("should generate supplemental information", function () => {            });
        

        shouldBehaveLikeBondingCurveToken();
    });
});
