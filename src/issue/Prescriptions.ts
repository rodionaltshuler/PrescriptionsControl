import {W3} from "soltsice";
import Provider = W3.Provider;
import Prescription from "../types/Prescription";

const TruffleContract = require("truffle-contract");
const contractJson = require("./../contracts/PrescriptionControl.json");

export default class Prescriptions {

    private w3: W3 = new W3();
    private provider: Provider;
    private prescriptionsContract: any;

    constructor() {
        this.provider = new W3.providers.HttpProvider('http://localhost:9545');
        this.w3.setProvider(this.provider);
        this.prescriptionsContract = TruffleContract(contractJson);
        this.prescriptionsContract.setProvider(this.provider);
    }

    public async issue(patient: string, contents: string) {
        let from = this.userAddress();
        let contract = await this.prescriptionsContract.deployed();
        return contract.issue(patient, contents, {from: await from, gas: 1000000} as W3.TX.TxParams);
    }

    public async getAllForPatient(patient: string): Promise<Prescription[]> {
        let contract = await this.prescriptionsContract.deployed();
        let count = await contract.getPrescriptionsCount(patient);
        global.console.log("Having " + count + " prescriptions for " + patient);
        const prescriptions = new Array<Prescription>(count);

        // TODO rewrite for parallel execution
        for (let i = 0; i < count; i++) {
            const nextPrescription: any = await contract.getPrescriptionForAddress(patient, i);
            global.console.log(nextPrescription);
            prescriptions[i] = {
                issuer: nextPrescription[1],
                patient: nextPrescription[2],
                received: nextPrescription[3],
                contents: nextPrescription[4]
            }
        }
        return prescriptions;
    }

    private async userAddress(): Promise<string> {
        return (await this.w3.accounts)[0];
    }

}


