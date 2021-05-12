import { act, renderHook } from '@testing-library/react-hooks';
import useHttp from '.';

describe('useHttp Hook', () => {
	test('return initial values', () => {
		const { result } = renderHook(() => useHttp(jest.fn()));

		expect(typeof result.current.sendRequest).toBe('function');
		expect(result.current.response).toBeNull();
		expect(result.current.loading).toBe(false);
		expect(result.current.error).toBeNull();
	});

	test('set loading true when sendRequest is called and then return the response', async () => {
		const returnedValue = 'valid data';
		const mockResponse = jest.fn().mockResolvedValueOnce(returnedValue);
		const { result, waitForNextUpdate } = renderHook(() =>
			useHttp(mockResponse)
		);

		const param = 'param';
		act(() => {
			result.current.sendRequest(param);
		});

		expect(result.current.loading).toBe(true);
		await waitForNextUpdate();
		expect(mockResponse).toHaveBeenCalledTimes(1);
		expect(mockResponse).toHaveBeenCalledWith(param);
		expect(result.current.loading).toBe(false);
		expect(result.current.response).toBe(returnedValue);
	});

	test('set error prop to the error message of the function passed', async () => {
		const errorMessage = 'test error';
		const mockResponse = jest
			.fn()
			.mockRejectedValueOnce(new Error(errorMessage));
		const { result, waitForNextUpdate } = renderHook(() =>
			useHttp(mockResponse)
		);

		act(() => {
			result.current.sendRequest();
		});

		await waitForNextUpdate();
		expect(result.current.error).toBe(errorMessage);
	});

	test('set error to "Something went wrong!" if function does not provide error message', async () => {
		const mockResponse = jest.fn().mockRejectedValueOnce(new Error(''));
		const { result, waitForNextUpdate } = renderHook(() =>
			useHttp(mockResponse)
		);

		act(() => {
			result.current.sendRequest();
		});

		await waitForNextUpdate();
		expect(result.current.error).toBe('Something went wrong!');
	});
});
