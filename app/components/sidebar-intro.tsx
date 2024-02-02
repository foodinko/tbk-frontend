import styles from "./sidebar-intro.module.scss";
import ImageButton from "./image-button";

export function SideBarIntro(props: { className?: string }) {

  const handleClickMealkit = () => {
    console.log('handleClickMealkit clicked!');
    const url = 'https://smartstore.naver.com/foodinko/products/9626125649?NaPm=ct%3Dls4ofazs%7Cci%3De0f9f0af958faded4a10f65fead7ed95bd06440d%7Ctr%3Dsls%7Csn%3D8677814%7Chk%3D3d42e4bf718755a0c0c565f9f291a81731736ef5';
    window.open(url, '_blank');
  };

  const handleClickApple = () => {
    console.log('handleClickApple clicked!');
    const url = 'https://apps.apple.com/kr/app/%ED%91%B8%EB%94%98%EC%BD%94/id1529998579';
    window.open(url, '_blank');
  };

  const handleClickGoogle = () => {
    console.log('handleClickGoogle clicked!');
    const url = 'https://play.google.com/store/apps/details?id=com.cnp.foodinko&hl=ko&gl=US';
    window.open(url, '_blank');
  };

  const imagePathMealkit = `/images/btn-mealkit.png`;
  const imagePathApple = `/images/btn-appstore.png`;
  const imagePathGoogle = `/images/btn-playstore.png`;

  return (
    <div className={styles["sidebar-intro"]}>
  <p className={styles["div-bokki"]}>
    <span className={styles["text-wrapper-bokki"]}>
      왜 나만보면 보키보키 하는지 <br />
      모르겠어, 너도{" "}
    </span>
    <span className={styles["span"]}>BOKI</span>
    <span className={styles["text-wrapper-bokki"]}> 해볼래?</span>
  </p>
  <p className={styles["element-SNS"]}>
    떡볶이 챗봇 보키랑 맛도리 대화도 나누고
    <br />
    푸딘코 인증 맛집 맛쟁이 떡볶이도 구경하세요! 🍽️
  </p>

  <ImageButton imagePath={imagePathMealkit} onClick={handleClickMealkit} />

  <div className={styles["text-wrapper-foodinkoapp"]}>푸딘코 앱으로 편하게 보기</div>
  <div className={styles["text-wrapper-download"]}>다운로드로 연결됩니다</div>

  <div className={styles["buttons-container"]}>
    <ImageButton imagePath={imagePathApple} onClick={handleClickApple} />
    <ImageButton imagePath={imagePathGoogle} onClick={handleClickGoogle} />
  </div>
</div>
  );
}
