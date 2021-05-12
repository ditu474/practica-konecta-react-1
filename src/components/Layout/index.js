import Header from 'components/Header';
import React from 'react';

export default function Layout({ children }) {
	return (
		<>
			<Header />
			<main style={{ margin: '2rem 0' }}>{children}</main>
		</>
	);
}
