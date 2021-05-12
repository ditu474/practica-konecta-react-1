import React from 'react';
import {
	ERROR_ACTION,
	httpReducer,


	RESET_ACTION, SEND_ACTION,
	SUCCESS_ACTION
} from 'reducers/http-reducer';

export default function useHttp(reqFunc) {
	const [httpState, dispatch] = React.useReducer(httpReducer, {
		response: null,
		loading: false,
		error: null,
	});

	const sendRequest = React.useCallback(
		async (params) => {
			dispatch({
				type: SEND_ACTION,
			});
			try {
				const res = await reqFunc(params);
				dispatch({
					type: SUCCESS_ACTION,
					responseData: res,
				});
			} catch (err) {
				dispatch({
					type: ERROR_ACTION,
					errorMessage: err.message || 'Something went wrong!',
				});
			}
		},
		[reqFunc]
	);

	const reset = React.useCallback(() => {
		dispatch({
			type: RESET_ACTION,
		});
	}, [])

	return {
		...httpState,
		sendRequest,
		reset
	};
}
