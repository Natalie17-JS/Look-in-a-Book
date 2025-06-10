'use client';

import { useRouter } from 'next/navigation';
import styles from "./MainPage.module.css"
import { useBook } from '@/app/context/bookContext';

export default function BookStartScreen() {
  const router = useRouter();
  const {currentBook} = useBook()
  const slug = currentBook?.slug;
  const STORAGE_KEY = `bookmark-${slug}`;
  const savedPage = typeof window !== 'undefined'
    ? Number(localStorage.getItem(STORAGE_KEY))
    : null;

  const handleStart = () => router.push(`/allpages/books/${slug}/read/reader?start=0`);
  const handleContinue = () =>
    router.push(`/allpages/books/${slug}/read/reader?start=${savedPage || 0}`);

  return (
    <div className="start-screen">
      <div className="cover-placeholder">Book cover here</div>
      <button onClick={handleStart}>Begin reading</button>
      {savedPage !== null && !isNaN(savedPage) && (
        <button onClick={handleContinue}>
          Continue from page {savedPage + 1}
        </button>
      )}
    </div>
  );
}
