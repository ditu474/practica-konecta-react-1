import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import React from 'react';
import styles from './SearchForm.module.css';

export default function SearchForm({ onSearch }) {
	const [kindOfPopular, setKindOfPopular] = React.useState('');
	const [daysFromToday, setDaysFromToday] = React.useState('');
	const [errors, setErrors] = React.useState({
		kind: '',
		days: '',
	});

	const handleChangeOfKind = (e) => {
		if (errors.kind && e.target.value) {
			setErrors((prevState) => {
				return { ...prevState, kind: '' };
			});
		}
		setKindOfPopular(e.target.value);
	};

	const handleChangeOfDays = (e) => {
		if (errors.days && e.target.value) {
			setErrors((prevState) => {
				return { ...prevState, days: '' };
			});
		}
		setDaysFromToday(e.target.value);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		if (!kindOfPopular || !daysFromToday) {
			setErrors({
				kind: !kindOfPopular ? 'You must choose an option' : '',
				days: !daysFromToday ? 'You must choose an option' : '',
			});
		} else {
			onSearch(kindOfPopular, daysFromToday);
		}
	};

	return (
		<div className="container">
			<div className={styles['search-form']}>
				<h2>Select a type of search</h2>
				<form name="Options" onSubmit={handleFormSubmit}>
					<FormControl
						variant="filled"
						style={{ marginRight: '1rem', width: '20%' }}
						error={!!errors.kind}
					>
						<InputLabel htmlFor="kind-of-popular">Kind of popular</InputLabel>
						<Select
							placeholder="Kind of popular"
							native
							value={kindOfPopular}
							onChange={handleChangeOfKind}
							inputProps={{
								name: 'kind',
								id: 'kind-of-popular',
							}}
						>
							<option aria-label="None" value="" />
							<option value="emailed">Emailed</option>
							<option value="shared">Shared</option>
							<option value="viewed">Viewed</option>
						</Select>
						<FormHelperText>{errors.kind && errors.kind}</FormHelperText>
					</FormControl>
					<FormControl
						variant="filled"
						style={{ marginRight: '1rem', width: '20%' }}
						error={!!errors.days}
					>
						<InputLabel htmlFor="days-from-today">Days from today</InputLabel>
						<Select
							native
							placeholder="Days from today"
							value={daysFromToday}
							onChange={handleChangeOfDays}
							inputProps={{
								name: 'days',
								id: 'days-from-today',
							}}
						>
							<option aria-label="None" value="" />
							<option value={1}>One</option>
							<option value={7}>Seven</option>
							<option value={30}>Thirty</option>
						</Select>
						<FormHelperText>{errors.days && errors.days}</FormHelperText>
					</FormControl>
					<Button
						variant="contained"
						color="primary"
						aria-label="search"
						type="submit"
					>
						Search
					</Button>
				</form>
			</div>
		</div>
	);
}
