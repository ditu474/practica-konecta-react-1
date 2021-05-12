import React from 'react';
import styles from './Spinner.module.css';

const Spinner = () => {
	return <div className={styles.spinner} data-testid="spinner"></div>;
};

export default React.memo(Spinner);
