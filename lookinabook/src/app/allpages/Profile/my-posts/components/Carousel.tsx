import styles from "./Carousel.module.css"
import { useState, ReactNode, useEffect  } from "react"
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ITEMS_PER_SLIDE = 3; 
const PAGE_WIDTH = 180; 
const ITEM_MARGIN = 0; 

interface CarouselProps {
    children: ReactNode[]; // или ReactElement[] если нужно строже
  }

export const Carousel3slides = ({ children }: CarouselProps) => {
    const [offset, setOffset] = useState(0);
     const [canGoLeft, setCanGoLeft] = useState(false);
  const [canGoRight, setCanGoRight] = useState(true);

    /*const totalWidth = (PAGE_WIDTH + ITEM_MARGIN) * children.length - ITEM_MARGIN;
    const maxOffset = -(totalWidth - (PAGE_WIDTH + ITEM_MARGIN) * ITEMS_PER_SLIDE + ITEM_MARGIN);*/
     const totalWidth = (PAGE_WIDTH + ITEM_MARGIN) * children.length - ITEM_MARGIN;
  const visibleWidth = (PAGE_WIDTH + ITEM_MARGIN) * ITEMS_PER_SLIDE - ITEM_MARGIN;
  const maxOffset = -(totalWidth - visibleWidth);

    
      const updateArrowVisibility = (newOffset: number) => {
    setCanGoLeft(newOffset < 0);
    setCanGoRight(newOffset > maxOffset);
  };

  useEffect(() => {
    updateArrowVisibility(offset);
  }, [offset]);

  const handleLeft = () => {
    setOffset((currentOffset) => {
      const newOffset = Math.min(currentOffset + visibleWidth, 0);
      updateArrowVisibility(newOffset);
      return newOffset;
    });
  };

  const handleRight = () => {
    setOffset((currentOffset) => {
      const newOffset = Math.max(currentOffset - visibleWidth, maxOffset);
      updateArrowVisibility(newOffset);
      return newOffset;
    });
  };

  /*const handleLeft = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset + (PAGE_WIDTH + ITEM_MARGIN) * ITEMS_PER_SLIDE;
            return Math.min(newOffset, 0);
        });
    };

    const handleRight = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset - (PAGE_WIDTH + ITEM_MARGIN) * ITEMS_PER_SLIDE;
            return Math.max(newOffset, maxOffset);
        });
    };*/

      return (
    <div className={styles["main-container-3slides"]}>
      {canGoLeft && (
        <FaChevronLeft className={`${styles.arrow} ${styles.left}`} onClick={handleLeft} />
      )}
      <div className={styles.windownew}>
        <div
          className={styles["all-pages-container"]}
          style={{ transform: `translateX(${offset}px)` }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className={styles["carousel-item"]}
              style={{
                height: "100%",
                minWidth: `${PAGE_WIDTH}px`,
                maxWidth: `${PAGE_WIDTH}px`,
                marginRight: `${index < children.length - 1 ? ITEM_MARGIN : 0}px`,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      {canGoRight && (
        <FaChevronRight className={`${styles.arrow} ${styles.right}`} onClick={handleRight} />
      )}
    </div>
  );
};