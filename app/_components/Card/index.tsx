import React from 'react';
import styles from './Card.module.css';

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        {children}
      </div>
    </div>
  );
}

export default Card;
