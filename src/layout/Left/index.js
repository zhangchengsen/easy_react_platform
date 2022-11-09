import { useEffect, useState } from "react";
import TextSide from "../../components/TextSide";
import ImgSide from "../../components/ImgSide";
import styles from "./index.less";
import classNames from "classnames";
export const isTextComponent = 1
export const isImgComponent = 2
export default function Left(props) {
  const [showSide, setShowSide] = useState(0)
  useEffect(() => {
    document.getElementById('center').addEventListener('click', () => {
      setShowSide(0)
    })
  }, [])
  return (
    <div className={styles.main}>

      <ul className={styles.cmps}>
        <li className={classNames(styles.cmp, showSide === isTextComponent && styles.selected)} onClick={() => setShowSide(showSide === isTextComponent ? 0 : isTextComponent)}>
          <span >文本</span>
        </li>
        <li className={classNames(styles.cmp, showSide === isImgComponent && styles.selected)} onClick={() => setShowSide(showSide === isImgComponent ? 0 : isImgComponent)}>
          <span >图片</span>
        </li>
      </ul>
      {showSide === isTextComponent && <TextSide />}
      {showSide === isImgComponent && <ImgSide />}


    </div>
  );
}
