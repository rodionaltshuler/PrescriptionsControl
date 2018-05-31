import {Component} from "react";
import * as React from 'react';
import Prescription from "../types/Prescription";
import 'node_modules/material-components-web/material-components-web.scss'

class PrescriptionItemComponent extends Component<Prescription, any> {

    constructor(props : Prescription) {
        super(props);
    }

    public render() {
        return <li className="mdc-list-item">{this.props.contents}</li>
    }

}

export default PrescriptionItemComponent;