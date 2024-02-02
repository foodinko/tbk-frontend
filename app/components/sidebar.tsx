import styles from "./home.module.scss";
import { SideBarIntro } from "./sidebar-intro";

export function SideBar(props: { className?: string }) {

  return (
    <div
      className={`${styles.sidebar} ${props.className}`}
    >
      <SideBarIntro />
    </div>
  );
}
