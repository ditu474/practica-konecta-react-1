import Articles from 'components/Articles';
import Layout from 'components/Layout';
import SearchForm from 'components/SearchForm';
import Spinner from 'components/Spinner';
import useHttp from 'hooks/use-http';
import React from 'react';
import { getPopularArticles } from 'services/nyt_service';

function App() {
	const {
		sendRequest,
		response: articles,
		loading,
		error,
		reset,
	} = useHttp(getPopularArticles);

	const handlerOnSearch = (kindPopular, days) => {
		sendRequest({
			kind: kindPopular,
			days,
		});
	};

	return (
		<Layout>
			{!articles && <SearchForm onSearch={handlerOnSearch} />}
			{loading && <Spinner />}
			{articles?.length > 0 && <Articles articles={articles} onReset={reset} />}
			{error && (
				<p
					data-testid="error-message"
					style={{ textAlign: 'center', color: 'red' }}
				>
					{error}
				</p>
			)}
		</Layout>
	);
}

export default App;
