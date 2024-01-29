import * as React from "react";
import styles from './chat-user.module.scss';

export const ChatUser = ({ onButtonClick }): JSX.Element => {
  const [inputValue, setInputValue] = React.useState("");

  const handleInputChange = (e) => {
    console.log("[ChatUser] handleInputChange: ", e.target.value);
    setInputValue(e.target.value);
  }

  const handleClick = () => {
    console.log("[ChatUser] Button clicked!");
    if (inputValue.length >= 1) {
      onButtonClick(inputValue);
    } else {
      alert("이름을 입력해주세요.");
    }
  };

  return (
    <div className={styles["chat-user"]}>
      <div className={styles["frame"]}>
        <div className={styles["frame"]}>
          <p className={styles["div"]}>
            <span className={styles["text-wrapper"]}>
              🤔
              <br />
            </span>
            <span className={styles["span"]}>어떻게 불러드리면 좋을까요?</span>
          </p>
        </div>
        <input className={styles["input"]} type="text" placeholder="한글, 영문, 숫자 상관없이 입력" onChange={handleInputChange}/>
        <p className={styles["div-2"]}>
          <span className={styles["text-wrapper-2"]}>확인을 누르면 </span>
          <a
            href="https://midi-seed-b68.notion.site/aacec8785fe54bdc9aac60f332169c58?pvs=4"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className={styles["text-wrapper-3"]}>개인정보 처리방침</span>
          </a>
          <span className={styles["text-wrapper-2"]}>
            에 <br />
            동의하게 됩니다.
          </span>
        </p>
        <div className={styles["div-wrapper"]}>
          <button className={styles["text-wrapper-4"]} onClick={handleClick}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
