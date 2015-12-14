import {Dispatcher} from "flux";
import FluxosPayload from "./FluxosPayload";

export default class FluxosDispatcher<T> extends Dispatcher<FluxosPayload<T>>{
	
	constructor(){
		super();
	}
	
	
}