import styles from './Pagination.module.css';

type Props = {
  totalCount: number;
  current?: number;
  basePath: string;
}

const Pagination = ({ totalCount, current = 1, basePath = '' }: Props) => {
  const perPage = 5;
  const pages = Array.from({ length: Math.ceil(totalCount / perPage) }).map(
    (_, i) => i + 1,
  );

  return (
    <ul className={styles.paginationContainer}>
      {pages.map((page) => (
        <li key={page}>
          <a>{page}</a>
        </li>
      ))}
    </ul>
  );
}

export default Pagination
