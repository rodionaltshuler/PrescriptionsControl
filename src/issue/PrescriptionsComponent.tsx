import {Component} from "react";
import {W3} from "soltsice";
import * as React from 'react';
import Prescriptions from "./Prescriptions";
import PrescriptionItemComponent from './PrescriptionItemComponent';

interface IssuePrescriptionState {
    patient: string,
    contents: string,
    existingPrescriptions: any[]
}

class PrescriptionsComponent extends Component<any, IssuePrescriptionState> {

    private prescriptions: Prescriptions;

    constructor(props: any) {
        super(props);
        this.prescriptions = new Prescriptions();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showExistingPrescriptions = this.showExistingPrescriptions.bind(this);
        this.state = {patient: "", contents: "", existingPrescriptions: []};
    }

    public render() {
        const issuePrescriptionButton = W3.isValidAddress(this.state.patient) && this.state.contents ?
            <div onClick={this.handleSubmit}>Issue</div> : null;

        const showPrescriptionsButton = W3.isValidAddress(this.state.patient) ?
            <div onClick={this.showExistingPrescriptions.bind(this, this.state.patient)}>Show prescriptions</div> :
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
                {existingItems}
            </div>
        );
    }


    private async showExistingPrescriptions(patient: string) {
        global.console.log("Showing prescriptions for " + patient);
        const existing: string[] = await this.prescriptions.getAllForPatient(patient);
        const existingPrescriptions = existing
            .filter(item => item != null && item.length > 0)
            .map(item => {
            return {contents: item}
        });

        this.setState({existingPrescriptions});
        existing.forEach(item => global.console.log(item));
    }

    private async handleSubmit() {
        if (this.state.contents) {
            await this.prescriptions.issue(this.state.patient, this.state.contents);
            global.console.log("IPrescription submitted");
        } else {
            global.console.log("IPrescription is empty, nothing to submit");
        }
    };


    private handleChange(event: any) {
        this.setState({[event.target.name]: event.target.value});
    }


}

export default PrescriptionsComponent;
