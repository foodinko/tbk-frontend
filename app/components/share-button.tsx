import * as React from "react";
import styles from "./share-button.module.scss";
import Image from "next/image";

interface ShareButtonProps {
  title?: string;
  image?: string;
  onClick: () => void;
}

export const ShareButton = ({ title, image, onClick }: ShareButtonProps): JSX.Element => {
  const handleClick = () => {
    console.log("[ShareButton] Clicked!");
    onClick();
  };

  return (
    <div className={styles["shareButton"]} onClick={handleClick}>
      <div className={styles["icon-share"]}>
        <Image 
          className={styles["icon"]}
          alt="Image"
          src={image}
          width={56}
          height={56}
        />
      </div>
      <div className={styles["icon-share-label"]}>{title}</div>
    </div>
  );
};