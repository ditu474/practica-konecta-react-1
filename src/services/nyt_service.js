export const getPopularArticles = ({ kind, days }) => {
	const url = `https://api.nytimes.com/svc/mostpopular/v2/${kind}/${days}.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`;
	return fetch(url)
		.then((res) => {
			if (res.ok) return res.json();
			throw new Error('Error fetching the most popular articles from NYT');
		})
		.then((res) => res.results);
};
