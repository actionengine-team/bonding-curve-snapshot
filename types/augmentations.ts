// eslint-disable @typescript-eslint/no-explicit-any
import { Fixture } from "ethereum-waffle";
import { Signers } from "./";
import type { BondingCurveToken, BondingCurveVault, BancorFormula, BondingCurve, Endowment , DaoRegistry} from '../typechain';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

declare module "mocha" {
    export interface Context {        
        loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
        signers: Signers;   
        unnamedAccounts: SignerWithAddress[];     
        BancorFormula : BancorFormula;   
        BondingCurve: BondingCurve;    
        Endowment : Endowment;
        DaoRegistry: DaoRegistry;

    }
};
