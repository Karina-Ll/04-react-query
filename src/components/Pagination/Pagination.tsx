import css from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, page - 2);
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <ul className={css.pagination}>
      <li className={page === 1 ? css.disabled : ''}>
        <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>←</button>
      </li>
      {pages.map(p => (
        <li key={p} className={p === page ? css.active : ''}>
          <button onClick={() => onPageChange(p)}>{p}</button>
        </li>
      ))}
      <li className={page === totalPages ? css.disabled : ''}>
        <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>→</button>
      </li>
    </ul>
  );
}