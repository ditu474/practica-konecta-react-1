import React from 'react';
import styles from './Header.module.css';

const Header = () => {
	return (
		<header className={styles.header}>
			<div className="container">
				<h1>Most Popular Articles</h1>
			</div>
		</header>
	);
};

export default React.memo(Header);
