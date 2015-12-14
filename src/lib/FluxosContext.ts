import FluxosDispatcher from './FluxosDispatcher';
import FluxosPayload from './FluxosPayload';
import FluxosStore from './FluxosStore';


//T => The data property inside FluxosPayload.
//A => The Actions only the interface for typescript.
//S => The custom class store which extends the FluxeStore.
export default class FluxosContext<T, A, S extends FluxosStore<any>>{

	private _dispatcher: FluxosDispatcher<T> = new FluxosDispatcher<T>();
	//private _store: FluxosStore<T>;
	private _store: S;

	constructor() { }
	
	/*optional*/
	createDispatcher<E extends FluxosDispatcher<T>>(customDispatcherClass: { new (): E; }): FluxosContext<T, A, S> {

		this._dispatcher = new customDispatcherClass();
		return this;
	}


	createStore(customStoreClass: { new (): S; }): FluxosContext<T, A, S> {
		this._store = new customStoreClass();
		this._store.setDispatcher(this._dispatcher);
		return this;
	}

	get Dispatcher(): FluxosDispatcher<T> {
		return this._dispatcher;
	}

	get Actions(): A {
		return <A>this._store.actions;
	}

	get Store(): S {
		return this._store;
	}
}