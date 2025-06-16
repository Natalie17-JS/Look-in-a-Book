'use client';

import { useRouter } from 'next/navigation';
import styles from "./MainPage.module.css"
import { useBook } from '@/app/context/bookContext';
import { useTheme } from '@/app/context/themeContext';
import { getThemeClass } from '@/app/themeclass';
import Link from 'next/link';

export default function BookStartScreen() {
  const {theme} = useTheme()
  const router = useRouter();
  const {currentBook} = useBook()
  const slug = currentBook?.slug;
  const STORAGE_KEY = `bookmark-${slug}`;
  const savedPage = typeof window !== 'undefined'
    ? Number(localStorage.getItem(STORAGE_KEY))
    : null;

    const themeClass = getThemeClass(theme, styles);

  const handleStart = () => router.push(`/allpages/books/${slug}/read/reader?start=0`);
  const handleContinue = () =>
    router.push(`/allpages/books/${slug}/read/reader?start=${savedPage || 0}`);

  return (
    <div className={`${styles["start-screen"]} ${themeClass}`}>
      <div className={styles["read-container"]}>
     
      <button onClick={handleStart}>Begin reading</button>
      {savedPage !== null && !isNaN(savedPage) && (
        <button onClick={handleContinue}>
          Continue from page {savedPage + 1}
        </button>
      )}
<Link href={`/allpages/books/${slug}`}>
       <button>
          Back to book page
        </button>
        </Link>
      </div>
    </div>
  );
}
