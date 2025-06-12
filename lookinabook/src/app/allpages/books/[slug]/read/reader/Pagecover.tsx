import React from "react";
import styles from "./Reader.module.css"

interface PageCoverProps {
  children: React.ReactNode;
}

const PageCover = React.forwardRef<HTMLDivElement, PageCoverProps>(
  ({ children }, ref) => {
    return (
       <div className={`${styles.page} ${styles.pageCover}`} ref={ref} data-density="hard">
        <div className={styles.pageContent}>
          <h2>{children}</h2>
        </div>
      </div>
    );
  }
);

PageCover.displayName = "PageCover";

export default PageCover;
