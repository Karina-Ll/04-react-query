// src/components/SearchBar/SearchBar.tsx
import type { FormEvent } from 'react';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Отримуємо значення з інпуту за ім'ям 'query'
    const form = e.currentTarget;
    const query = (form.elements.namedItem('query') as HTMLInputElement).value.trim();
    
    if (!query) {
      toast.error('Будь ласка, введіть текст для пошуку.');
      return;
    }
    
    onSubmit(query);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">Search</button>
        </form>
      </div>
    </header>
  );
}