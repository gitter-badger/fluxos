import * as events  from "events";
import FluxosPayload from "./FluxosPayload";
import FluxosDispatcher from "./FluxosDispatcher";
import Helper from './Helper';

export type ListenerType = Function;
export type ActionBindedDictionaryType = { [constantKey: string]: Function };
export type ActionHandlerDictionaryType = { [action: string]: ((payload: FluxosPayload<any>) => void) };
export var CHANGE_EVENT = 'change';

export default class FluxosStore<T> extends events.EventEmitter {

	private dispatcher: FluxosDispatcher<T>;

	//public actions: { [name: string]: (data: T) => void };
	public actions: any;

	constructor(dispatcher?: FluxosDispatcher<T>) {
		super();
		this.dispatcher = dispatcher;
	}

	setDispatcher(dispatcher: FluxosDispatcher<T>): void {
		this.dispatcher = dispatcher;
		//this.registerStore();
	}

	/*private registerStore(): void {
		this.dispatcher.register((action) => {

			let fnName = action.actionType.toLowerCase();
			let splited = fnName.split('_');
			for (let i = 1; i < splited.length; i++) {
				let word = splited[i];
				fnName = word.replace(word, Helper.capitalize(word));
			}

			if (this[fnName]) {
				this[fnName].apply(this, action);
			}
		});
	}*/
	

	link(actionsToMethods: ActionBindedDictionaryType): void {

		Helper.forEachKey(actionsToMethods, key=> {
			this.dispatcher.register((action) => {
				if (action.actionType === key) {
					actionsToMethods[key].apply(this, action.data);
				}
			});

			let fnName = key.toLowerCase();
			let splited = fnName.split('_');
			for (let i = 1; i < splited.length; i++) {
				let word = splited[i];
				fnName = word.replace(word, Helper.capitalize(word));
			}

			this.actions[fnName] = (data: T) => {
				this.dispatcher.dispatch({ actionType: key, data: data });
			};
		});


	}

	subscribe(listener: ListenerType, event = CHANGE_EVENT): void {
		this.on(event, listener);
	}

	unsubscribe(listener: ListenerType, event = CHANGE_EVENT): void {
		this.removeListener(event, listener);
	}

	publish(event = CHANGE_EVENT): void {
		this.emit(event);
	}


}