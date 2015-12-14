import FluxosDispatcher from './lib/FluxosDispatcher';
import FluxosPayload from './lib/FluxosPayload';
import FluxosStore from './lib/FluxosStore';
import FluxosContext from'./lib/FluxosContext';

function createContext<T, A, S extends FluxosStore<any>>(storeClass?: { new (): S; }): FluxosContext<T, A, S> {
	let _context = new FluxosContext<T, A, S>();
	if (storeClass) {
		_context.createStore(storeClass);
	}

	return _context;
}

export {createContext as default, createContext, FluxosContext, FluxosDispatcher, FluxosPayload, FluxosStore};

