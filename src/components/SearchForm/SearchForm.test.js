import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchForm from '.';

describe('SearchForm Component', () => {
	test('render error message if submit form without selecting an option', () => {
		render(<SearchForm />);

		const submitButton = screen.getByText('Search');
		userEvent.click(submitButton);

		const errors = screen.queryAllByText('You must choose an option');

		expect(errors.length).toBe(2);
	});

	test('not render error message when user select an option after submiting an invalid form', () => {
		render(<SearchForm />);

		const submitButton = screen.getByText('Search');
		userEvent.click(submitButton);

		const kindOfPopularInput = screen.getByPlaceholderText('Kind of popular');
		const daysInput = screen.getByPlaceholderText('Days from today');
		userEvent.selectOptions(kindOfPopularInput, 'emailed');
		userEvent.selectOptions(daysInput, 'One');

		const errors = screen.queryAllByText('You must choose an option');

		expect(errors.length).toBe(0);
	});

	test('when form is submitted, should call the prop func onSearch with correct values', () => {
		const onSearchSpy = jest.fn();
		render(<SearchForm onSearch={onSearchSpy} />);

		const submitButton = screen.getByText('Search');
		const kindOfPopularInput = screen.getByPlaceholderText('Kind of popular');
		const daysInput = screen.getByPlaceholderText('Days from today');

		userEvent.selectOptions(kindOfPopularInput, 'Emailed');
		userEvent.selectOptions(daysInput, 'One');
		userEvent.click(submitButton);

		expect(onSearchSpy).toHaveBeenCalledTimes(1);
		expect(onSearchSpy).toHaveBeenCalledWith('emailed', '1');
	});
});
