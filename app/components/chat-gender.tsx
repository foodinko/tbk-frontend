import * as React from "react";
import styles from "./chat-gender.module.scss";

interface ChatGenderProps {
  onButtonClick: (gender: string) => void;
}

export const ChatGender = ({ onButtonClick }: ChatGenderProps): JSX.Element => {
  const [selectedGender, setSelectedGender] = React.useState("");

  const handleClick = (gender: string) => {
    console.log("[ChatGender] Button clicked:", gender);
    setSelectedGender(gender);
    onButtonClick(gender);
  };

  return (
    <div>
      <button
        className={`${styles["chat-gender"]} ${
          selectedGender === "여성" ? styles.active : styles.disabled
        }`}
        onClick={() => handleClick("여성")}
      >
        🙋🏻‍♀️ 여성
      </button>
      <button
        className={`${styles["chat-gender"]} ${
          selectedGender === "남성" ? styles.active : styles.disabled
        }`}
        onClick={() => handleClick("남성")}
      >
        🙋🏻‍♂️ 남성
      </button>
    </div>
  );
};
