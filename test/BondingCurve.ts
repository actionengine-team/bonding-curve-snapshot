import hre from "hardhat";
import { BigNumber } from "ethers";
import { Artifact } from "hardhat/types";
import { Signers } from "../types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import type {DaoFactory, BondingCurveToken, BondingCurveVault, BancorFormula, BondingCurve , Endowment} from '../typechain';
import { shouldBehaveLikeBondingCurveToken } from "./BondingCurve.behavior";

const { deployContract } = hre.waffle;

describe("Setup Admin and Unnamed Accounts", function () {
    before(async function () {
        this.signers = {} as Signers;
        const signers: SignerWithAddress[] = await hre.ethers.getSigners();
        this.signers.admin = signers[0];
        this.unnamedAccounts = [] as SignerWithAddress[];
        for (let i = 1; i <= (signers.length - 1); i++) {
            const unnamedAccount: SignerWithAddress = signers[i];
            this.unnamedAccounts.push(unnamedAccount);
        }
    });

    describe("BondingCurve - initialization", function () {
        before(async function () {    
            const BondingCurveToken: Artifact = await hre.artifacts.readArtifact("BondingCurveToken");            
            this.BondingCurveToken = await deployContract(this.signers.admin, BondingCurveToken) as BondingCurveToken; 
            console.log(`Deployed Tokens to the following address => ${this.BondingCurveToken.address}`);                                    
            
            const BancorFormula: Artifact = await hre.artifacts.readArtifact("BancorFormula");
            this.BancorFormula = await deployContract(this.signers.admin, BancorFormula) as BancorFormula;
            console.log(`Deployed BancorFormula to the following address => ${this.BancorFormula.address}`);            
            
            const BondingCurveVault: Artifact = await hre.artifacts.readArtifact("BondingCurveVault");
            this.BondingCurveVault = await deployContract(this.signers.admin, BondingCurveVault) as BondingCurveVault;
            console.log(`Deployed BondingCurveVault to the following address => ${this.BondingCurveVault.address}`);                        
            
            const BondingCurve: Artifact = await hre.artifacts.readArtifact("BondingCurve");
            this.BondingCurve = await deployContract(this.signers.admin, BondingCurve) as BondingCurve;
            console.log(`Deployed BondingCurve to the following address => ${this.BondingCurve.address}`);            
            
            const Endowment: Artifact = await hre.artifacts.readArtifact('Endowment');
            this.Endowment = await deployContract(this.signers.admin, Endowment) as Endowment;
            console.log(`Deployed Endowment to the following address => ${this.Endowment.address}`);
            
            // const DaoFactory : Artifact = await hre.artifacts.readArtifact('DaoFactory');
            // const deployedDaoFactory = await deployContract(await this.unnamedAccounts[0], DaoFactory, ["test"] ) as DaoFactory;    
            // console.log(`Deployed deployedDaoFactory to the following address => ${deployedDaoFactory.address}`);
 

            // await deployedDaoFactory.createDao('TEST', this.signers.admin.address);
            
            // const OPA = await deployedDaoFactory.getDaoAddress('TEST');
            // console.log(`Deployed DAO to the following address => ${OPA}`);


            process.stdout.write("\n");            
        });
        
        // it("should generate supplemental information", function () => {            });
        

        shouldBehaveLikeBondingCurveToken();
    });
});
