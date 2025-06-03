import styles from "./Carousel.module.css"
import { useState, ReactNode  } from "react"
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ITEMS_PER_SLIDE = 2; 
const PAGE_WIDTH = 180; 
const ITEM_MARGIN = 5; 

interface CarouselProps {
    children: ReactNode[]; // или ReactElement[] если нужно строже
  }

export const Carousel3slides = ({ children }: CarouselProps) => {
    const [offset, setOffset] = useState(0);

    const totalWidth = (PAGE_WIDTH + ITEM_MARGIN) * children.length - ITEM_MARGIN;
    const maxOffset = -(totalWidth - (PAGE_WIDTH + ITEM_MARGIN) * ITEMS_PER_SLIDE + ITEM_MARGIN);

    const handleLeft = () => {
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
    };

    return (
        <div className={styles["main-container-3slides"]}>
            <FaChevronLeft className={`${styles.arrow} ${styles.left}`} onClick={handleLeft} />
            <div className={styles.windownew}>
                <div
                    style={{ transform: `translateX(${offset}px)` }}
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
                                marginRight: `${index < children.length - 1 ? ITEM_MARGIN : 0}px`,
                            }}
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>
            <FaChevronRight className={`${styles.arrow} ${styles.right}`} onClick={handleRight} />
        </div>
    );
};
