import * as React from "react";

import Resume from "../models/Resume";
import Flux from '../flux/Context';

export interface ResumeSingleProps extends React.Props<any> {
    params: { resumeId: number };
}

export interface ResumeSingleState {
    resume: Resume;
}

export class ResumeSingle extends React.Component<ResumeSingleProps, ResumeSingleState>{

    constructor() {
        super();
        this.bindMethods("_onChange", "getInitialState");
        this.state = { resume: undefined };

    }

    getInitialState() {
        return{
            resume: Flux.Store.currentResume
        };
    }

    protected bindMethods(...methods: string[]) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    componentDidMount() {
        Flux.Store.subscribe(this._onChange);
        if (this.props.params && this.props.params.resumeId) {
            Flux.Actions.getResume(this.props.params.resumeId);
        }
       
    }

    componentWillUnmount() {
        Flux.Store.unsubscribe(this._onChange);
    }

    _onChange() {
        this.setState(this.getInitialState()); //for test
    }

    render() {

        return (
            <div className="container">
                <h2>Single resume page </h2>
                Resume ID: {this.state.resume.resumeId}
                </div>
        );
    }
}

export default ResumeSingle;