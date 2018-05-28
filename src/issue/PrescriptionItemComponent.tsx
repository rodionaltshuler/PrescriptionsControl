import {Component} from "react";
import * as React from 'react';
import Prescription from "../types/Prescription";

class PrescriptionItemComponent extends Component<Prescription, any> {

    constructor(props : Prescription) {
        super(props);
    }

    public render() {
        return <div>{this.props.contents}</div>
    }

}

export default PrescriptionItemComponent;