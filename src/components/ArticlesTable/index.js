import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ArrowBack, ArrowForward, CallMade } from '@material-ui/icons';
import React from 'react';
import styles from './ArticlesTable.module.css';

export default function ArticlesTable({ articles }) {
	const [currentPage, setCurrentPage] = React.useState(1);
	React.useEffect(() => {
		setCurrentPage(1);
	}, [articles]);

	const pageSize = 5;
	const handlePageChange = (action) => () => {
		if (action === 'next') setCurrentPage((prevPage) => prevPage + 1);
		else setCurrentPage((prevPage) => prevPage - 1);
	};

	const tableRows = articles
		.slice((currentPage - 1) * pageSize, currentPage * pageSize)
		.map((article) => (
			<TableRow key={article.id}>
				<TableCell component="th" scope="row">
					{article.title}
				</TableCell>
				<TableCell align="right">{article.published_date}</TableCell>
				<TableCell align="right">{article.section}</TableCell>
				<TableCell align="right">{article.subsection}</TableCell>
				<TableCell align="right">
					<a href={article.url} target="_blank" rel="noreferrer">
						<CallMade />
					</a>
				</TableCell>
			</TableRow>
		));

	return (
		<>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell align="right">Published Date</TableCell>
							<TableCell align="right">Section</TableCell>
							<TableCell align="right">Subsection</TableCell>
							<TableCell align="right">Live Article</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>{tableRows}</TableBody>
				</Table>
			</TableContainer>
			<div className={styles.actions}>
				<IconButton
					aria-label="previous page"
					onClick={handlePageChange('back')}
					disabled={currentPage < 2}
				>
					<ArrowBack />
				</IconButton>
				<span>{currentPage}</span>
				<IconButton
					aria-label="next page"
					onClick={handlePageChange('next')}
					disabled={currentPage * pageSize >= articles.length}
				>
					<ArrowForward />
				</IconButton>
			</div>
		</>
	);
}
