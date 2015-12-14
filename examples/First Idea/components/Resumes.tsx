import * as React from "react";

import Resume from "../models/Resume";
import Flux from '../flux/Context';

export interface ResumesProps extends React.Props<any>{
    resumes:Resume[];
}

export interface ResumesState {

}

export class Resumes extends React.Component<ResumesProps, ResumesState>{

    constructor() {
        super();
        this.bindMethods("_onChange");
    }

    protected bindMethods(...methods: string[]) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    componentDidMount() {
        Flux.Store.subscribe(this._onChange);
    }

    componentWillUnmount() {
		Flux.Store.unsubscribe(this._onChange);
    }

    _onChange() {
		this.setState({resumes: Flux.Store.resumes});
    }

    render() {
        
        return (
            <div className="container">   
            <h2>Resumes page </h2>
            </div>
        );
    }
}

export default Resumes;