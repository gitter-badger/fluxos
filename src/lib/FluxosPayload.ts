export interface FluxosPayload<T> {
	actionType: string;
	data: T;
}

export default FluxosPayload;