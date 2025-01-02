"use client";

import styles from "./componentsStyles/AuthorBooksCarousel.module.css";
import { useState, ReactNode } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PAGE_WIDTH = 400;
const ITEM_MARGIN = 20;
const ITEMS_PER_SLIDE = 3;

interface AuthorBooksCarouselProps {
  children: ReactNode[]; // Массив дочерних элементов
}

export default function AuthorBooksCarousel({
  children,
}: AuthorBooksCarouselProps) {
  const [offset, setOffset] = useState(0);

  const totalWidth = (PAGE_WIDTH + ITEM_MARGIN) * children.length;
  const maxOffset = -(
    totalWidth -
    (PAGE_WIDTH + ITEM_MARGIN) * ITEMS_PER_SLIDE +
    ITEM_MARGIN * 2
  );

  const handleLeft = () => {
    setOffset((currentOffset) => {
      const newOffset =
        currentOffset + (PAGE_WIDTH + ITEM_MARGIN) * ITEMS_PER_SLIDE;
      return Math.min(newOffset, 0);
    });
  };
  const handleRight = () => {
    setOffset((currentOffset) => {
      const newOffset =
        currentOffset - (PAGE_WIDTH + ITEM_MARGIN) * ITEMS_PER_SLIDE;
      return Math.max(newOffset, maxOffset);
    });
  };

  return (
    <div className={styles["carousel-container"]}>
      <FaChevronLeft className={styles.arrow} onClick={handleLeft} />
      <div className={styles.window}>
        <div
          style={{
            transform: `translateX(${offset}px)`,
            paddingLeft: `${ITEM_MARGIN}px`,
            paddingRight: `${ITEM_MARGIN}px`,
          }}
          className={styles["all-pages-container"]}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className={styles["carousel-item"]}
              style={{
                height: "100%",
                minWidth: `${PAGE_WIDTH}px`,
                maxWidth: `${PAGE_WIDTH}px`,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      <FaChevronRight className={styles.arrow} onClick={handleRight} />
    </div>
  );
}
