import {Component} from "react";
import * as React from 'react';

class PrescriptionItemComponent extends Component<any, any> {

    constructor(props : any) {
        super(props);
    }

    public render() {
        return <div>{this.props.contents}</div>
    }

}

export default PrescriptionItemComponent;