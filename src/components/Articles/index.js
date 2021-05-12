import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ArticlesTable from 'components/ArticlesTable';
import React from 'react';
import styles from './Articles.module.css';

export default function Articles({ articles, onReset }) {
	const [filteredArticles, setFilteredArticles] = React.useState([]);
	const [titleFilter, setTitleFilter] = React.useState('');
	const [dateFilter, setDateFilter] = React.useState('');
	const [sectionFilter, setSectionFilter] = React.useState('');
	const [subSectionFilter, setSubSectionFilter] = React.useState('');

	const filterArray = React.useCallback((array, propOfChild, filter) => {
		return array.filter((child) =>
			child[propOfChild]
				.toLocaleLowerCase()
				.includes(filter.toLocaleLowerCase())
		);
	}, []);

	React.useEffect(() => {
		if (!titleFilter && !dateFilter && !sectionFilter && !subSectionFilter) {
			setFilteredArticles(articles);
		} else {
			let newFilteredArticles = articles;
			if (titleFilter) {
				newFilteredArticles = filterArray(
					newFilteredArticles,
					'title',
					titleFilter
				);
			}
			if (dateFilter) {
				newFilteredArticles = filterArray(
					newFilteredArticles,
					'published_date',
					dateFilter
				);
			}
			if (sectionFilter) {
				newFilteredArticles = filterArray(
					newFilteredArticles,
					'section',
					sectionFilter
				);
			}
			if (subSectionFilter) {
				newFilteredArticles = filterArray(
					newFilteredArticles,
					'subsection',
					subSectionFilter
				);
			}
			setFilteredArticles(newFilteredArticles);
		}
	}, [
		articles,
		titleFilter,
		dateFilter,
		sectionFilter,
		subSectionFilter,
		filterArray,
	]);

	const handleTitleFilterChange = (e) => {
		setTitleFilter(e.target.value);
	};
	const handleDateFilterChange = (e) => {
		setDateFilter(e.target.value);
	};

	const handleSectionFilterChange = (e) => {
		setSectionFilter(e.target.value);
	};

	const handleSubSectionFilterChange = (e) => {
		setSubSectionFilter(e.target.value);
	};

	return (
		<div className={`container ${styles.center}`}>
			<div className={styles.actions}>
				<TextField
					label="Filter By Title"
					variant="filled"
					type="search"
					onChange={handleTitleFilterChange}
					value={titleFilter}
				/>
				<TextField
					label="Filter By Publised Date"
					variant="filled"
					type="search"
					onChange={handleDateFilterChange}
					value={dateFilter}
				/>
				<TextField
					label="Filter By Section"
					variant="filled"
					type="search"
					onChange={handleSectionFilterChange}
					value={sectionFilter}
				/>
				<TextField
					label="Filter By SubSection"
					variant="filled"
					type="search"
					onChange={handleSubSectionFilterChange}
					value={subSectionFilter}
				/>
			</div>
			<ArticlesTable articles={filteredArticles} />
			<Button
				variant="contained"
				color="primary"
				aria-label="new request"
				onClick={onReset}
			>
				New Request
			</Button>
		</div>
	);
}
