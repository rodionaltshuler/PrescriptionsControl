import {Component} from "react";
import {W3} from "soltsice";
import * as React from 'react';
import Prescriptions from "./Prescriptions";
import PrescriptionItemComponent from './PrescriptionItemComponent';
import Prescription from "../types/Prescription";
import 'node_modules/material-components-web/material-components-web.scss';
import './PrescriptionComponent.scss';

interface IssuePrescriptionState {
    patient: string,
    contents: string,
    existingPrescriptions: Prescription[]
}

class PrescriptionsComponent extends Component<any, IssuePrescriptionState> {

    private prescriptions: Prescriptions;

    constructor(props: any) {
        super(props);
        this.prescriptions = new Prescriptions();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showExistingPrescriptions = this.showExistingPrescriptions.bind(this);
        this.state = {patient: "0xf17f52151ebef6c7334fad080c5704d77216b732", contents: "", existingPrescriptions: []};
    }

    public render() {
        const issuePrescriptionButton = W3.isValidAddress(this.state.patient) && this.state.contents ?
            <button className="mdc-button mdc-button--raised simple-button" onClick={this.handleSubmit}>Issue</button> : null;

        const showPrescriptionsButton = W3.isValidAddress(this.state.patient) ?
            <button className="mdc-button simple-button" onClick={this.showExistingPrescriptions.bind(this, this.state.patient)}>Show prescriptions</button> :
            null;

        const existingItems = this.state.existingPrescriptions.map(item => {
            return <div key={item.contents}><PrescriptionItemComponent {...item}/></div>;
        });

        return (
            <div> Patient: <input type="text" name="patient" value={this.state.patient}
                                  onChange={this.handleChange}/>
                <br/>
                Prescription: <input type="text" name="contents" value={this.state.contents}
                                     onChange={this.handleChange}/>
                <br/>
                {issuePrescriptionButton}
                <br/>
                {showPrescriptionsButton}
                <br/>
                <ul className="mdc-list">
                {existingItems}
                </ul>
            </div>
        );
    }


    private async showExistingPrescriptions(patient: string) {
        global.console.log("Showing prescriptions for " + patient);
        const existing: Prescription[] = await this.prescriptions.getAllForPatient(patient);
        const existingPrescriptions = existing
            .filter(item => !item.received && item.contents != null && item.contents.length > 0);
        this.setState({existingPrescriptions});
        existing.forEach(item => global.console.log(item));
    }

    private async handleSubmit() {
        if (this.state.contents) {
            await this.prescriptions.issue(this.state.patient, this.state.contents);
            global.console.log("Prescription submitted");
        } else {
            global.console.log("Prescription is empty, nothing to submit");
        }
    };


    private handleChange(event: any) {
        this.setState({[event.target.name]: event.target.value});
    }


}

export default PrescriptionsComponent;
