import {BigNumber} from 'bignumber.js';
import {Component} from "react";
import {W3} from "soltsice";
import {PrescriptionControl} from "src/types";
import * as React from 'react';

const TruffleContract = require("truffle-contract");
const contractJson = require("./../contracts/PrescriptionControl.json");

const address = "0x5aeda56215b167893e80b4fe645ba6d5bab767de";

interface IssuePrescriptionState {
    patient: string,
    contents: string,
    balance: BigNumber,
    balanceToDisplay: string
}

class IssuePrescription extends Component<any, IssuePrescriptionState> {


    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showBalance = this.showBalance.bind(this);
        this.showExistingPrescriptions = this.showExistingPrescriptions.bind(this);
        this.state = {patient: "", contents: "", balance: new BigNumber(-1), balanceToDisplay: ""};
    }

    public render() {
        const balanceCaption = this.state.balance.greaterThanOrEqualTo(0) ?
            <div> Balance: {this.state.balanceToDisplay} ETH </div>
            : <div onClick={this.handleSubmit}> Click to get balance </div>;

        const showPrescriptionsButton = W3.isValidAddress(this.state.patient) ?
            <div onClick={this.showExistingPrescriptions.bind(this, this.state.patient)}>Show prescriptions</div> :
            null;

        return (
            <div> Patient: <input type="text" name="patient" value={this.state.patient}
                                  onChange={this.handleChange}/>
                <br/>
                Prescription: <input type="text" name="contents" value={this.state.contents}
                                     onChange={this.handleChange}/>
                <br/>
                {balanceCaption}
                <br/>
                {showPrescriptionsButton}

            </div>
        );
    }

    private showExistingPrescriptions(patient: string) {
        global.console.log("Showing prescriptions for " + patient);
    }

    private showBalance(balance: BigNumber, w3: W3) {
        this.setState({balance, balanceToDisplay: w3.web3.fromWei(balance.toString(), "ether")});
    }

    private handleSubmit() {
        const w3: W3 = new W3();
        const provider = new W3.providers.HttpProvider('http://localhost:9545');
        w3.setProvider(provider);
        const contract1 = TruffleContract(contractJson);

        contract1.setProvider(provider);


        global.console.log(w3.defaultAccount);

        contract1.deployed()
            .then((instance: PrescriptionControl) => {
                instance.issue(address, "Some drugs to get", {from: address, gas: 1000000} as W3.TX.TxParams)
                    .then((result: any) => instance.getPrescriptionsCount(address))
                    .then((count: BigNumber) => {
                        global.console.log("Prescription count is " + count.toNumber());
                    });
            });
    };


    private handleChange(event: any) {
        this.setState({[event.target.name]: event.target.value});
    }


}

export default IssuePrescription;
