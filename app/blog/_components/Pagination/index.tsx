import Link from 'next/link';
import { BLOG_PAGE_SIZE } from '../../_constants';
import styles from './Pagination.module.css';

type Props = {
  totalCount: number;
  current?: number;
  basePath: string;
  onPageChange?: (page: number) => void;
};

const Pagination = ({
  totalCount,
  current = 1,
  basePath = '',
  onPageChange,
}: Props) => {
  const pages = Array.from({
    length: Math.ceil(totalCount / BLOG_PAGE_SIZE),
  }).map((_, i) => i + 1);

  return (
    <ul className={styles.paginationContainer}>
      {pages.map((page) => (
        <li key={page} className={current === page ? styles.active : undefined}>
          {onPageChange ? (
            <button
              type="button"
              aria-label={`${page}ページ目`}
              aria-current={current === page ? 'page' : undefined}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ) : (
            <Link
              href={`${basePath}/page/${page}`}
              aria-current={current === page ? 'page' : undefined}
            >
              <div>{page}</div>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
