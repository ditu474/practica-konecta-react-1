import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component', () => {
	beforeEach(() => {
		render(<App />);
	});

	test('render most popular articles heading', () => {
		const header = screen.getByText(/Most Popular Articles/i);

		expect(header).toBeInTheDocument();
	});

	test('render a form with two select options', () => {
		const formTitle = screen.getByText(/Select a type of search/i);
		const form = screen.getByRole('form');
		const kindOfPopularInput = screen.getByPlaceholderText('Kind of popular');
		const datalistOfKindOfPopular = screen.getByRole('combobox', {
			name: 'Kind of popular',
		});
		const daysInput = screen.getByPlaceholderText('Days from today');
		const datalistOfDays = screen.getByRole('combobox', {
			name: 'Days from today',
		});
		const searchButton = screen.getByRole('button', { name: 'search' });

		expect(formTitle).toBeInTheDocument();
		expect(form).toBeInTheDocument();
		expect(kindOfPopularInput).toBeInTheDocument();
		expect(datalistOfKindOfPopular).toBeInTheDocument();
		expect(datalistOfKindOfPopular.childNodes.length).toBeGreaterThan(1);
		expect(daysInput).toBeInTheDocument();
		expect(datalistOfDays).toBeInTheDocument();
		expect(datalistOfDays.childNodes.length).toBeGreaterThan(1);
		expect(searchButton).toBeInTheDocument();
	});

	test('when form is submitted, render a spinner while fetching articles, then display a table with the articles', async () => {
		jest.spyOn(global, 'fetch').mockResolvedValue({
			ok: true,
			json: jest.fn().mockResolvedValue({
				results: [
					{
						url: 'https://www.nytimes.com/2021/05/09/sports/horse-racing/bob-baffert-kentucky-derby-medina-spirit-drug-test.html',
						id: 100000007416846,
						section: 'Sports',
						subsection: 'Horse Racing',
						published_date: '2021-05-09',
					},
				],
			}),
		});

		const submitButton = screen.getByText('Search');
		const kindOfPopularInput = screen.getByPlaceholderText('Kind of popular');
		const daysInput = screen.getByPlaceholderText('Days from today');

		userEvent.selectOptions(kindOfPopularInput, 'Emailed');
		userEvent.selectOptions(daysInput, 'One');
		userEvent.click(submitButton);

		expect(screen.getByTestId('spinner')).toBeInTheDocument();
		expect(await screen.findByRole('table')).toBeInTheDocument();
		expect((await screen.findAllByRole('columnheader')).length).toBe(5);
		expect((await screen.findAllByRole('row')).length).toBeGreaterThan(0);
		expect(screen.queryByRole('form')).not.toBeInTheDocument();
		expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();

		jest.restoreAllMocks();
	});

	test('render error message when request fail', async () => {
		jest.spyOn(global, 'fetch').mockResolvedValue({
			json: jest.fn().mockRejectedValueOnce({
				message: 'fail',
			}),
		});

		const submitButton = screen.getByText('Search');
		const kindOfPopularInput = screen.getByPlaceholderText('Kind of popular');
		const daysInput = screen.getByPlaceholderText('Days from today');

		userEvent.selectOptions(kindOfPopularInput, 'Emailed');
		userEvent.selectOptions(daysInput, 'One');
		userEvent.click(submitButton);

		expect(screen.getByTestId('spinner')).toBeInTheDocument();
		const errorMessage = await screen.findByTestId('error-message');
		expect(errorMessage).toBeInTheDocument();
		expect(errorMessage.textContent).toBe(
			'Error fetching the most popular articles from NYT'
		);

		jest.restoreAllMocks();
	});
});
