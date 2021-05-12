export const SEND_ACTION = 'SEND';
export const SUCCESS_ACTION = 'SUCCESS';
export const ERROR_ACTION = 'ERROR';
export const RESET_ACTION = 'RESET';

export const httpReducer = (state, action) => {
	let newState = state;
	switch (action.type) {
		case SEND_ACTION:
			newState = {
				response: null,
				error: null,
				loading: true,
			};
			return newState;
		case SUCCESS_ACTION:
			newState = {
				response: action.responseData,
				error: null,
				loading: false,
			};
			return newState;
		case ERROR_ACTION:
			newState = {
				response: null,
				error: action.errorMessage,
				loading: false,
			};
			return newState;
		case RESET_ACTION:
			newState = {
				response: null,
				error: null,
				loading: false,
			};
			return newState;
		default:
			return newState;
	}
};
