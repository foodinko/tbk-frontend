import React from 'react';
import styles from './image-button.module.scss';

interface ImageButtonProps {
  imagePath: string;
  onClick: () => void;
}

const ImageButton: React.FC<ImageButtonProps> = ({ imagePath, onClick }) => {
  return (
    <button className={styles.imageButton} onClick={onClick} style={{ backgroundImage: `url(${imagePath})` }}>
    </button>
  );
};

export default ImageButton;
