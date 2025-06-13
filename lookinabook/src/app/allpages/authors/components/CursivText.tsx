
import { Satisfy } from 'next/font/google';
import React from 'react';

const satisfy = Satisfy({ subsets: ['latin'], weight: '400' });

type CursivTextProps = {
  children: React.ReactNode;
  className?: string; // если хочешь добавлять доп. стили
};

export default function CursivText({ children, className = '' }: CursivTextProps) {
  return (
    <span className={`${satisfy.className} ${className}`}>
      {children}
    </span>
  );
}
