// eslint-disable @typescript-eslint/no-explicit-any
import { Fixture } from "ethereum-waffle";
import { Signers } from "./";
import type { BondingCurveToken, BondingCurveVault, BancorFormula, BondingCurve, Endowment } from '../typechain';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

declare module "mocha" {
    export interface Context {        
        loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
        signers: Signers;   
        unnamedAccounts: SignerWithAddress[];     
        BondingCurveToken :    BondingCurveToken;
        BondingCurveVault : BondingCurveVault;
        BancorFormula : BancorFormula;   
        BondingCurve: BondingCurve;    
        Endowment : Endowment;

    }
};
