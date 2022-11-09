import React from "react";
import { isTextComponent } from "../../layout/Left";
import { useCanvasByContext } from "../../store/hooks";
import { defaultCommonStyle } from "../../utils/const";
import styles from "./index.less";
const defaultStyle = {
  ...defaultCommonStyle,
  lineHeight: "30px",
  fontSize: 12,
  fontWeight: "normal",
  color: "#000",
  backgroundColor: "#ffffff00",
  textAlign: "left",
};

const settings = [
  {
    value: "标题",
    style: {
      ...defaultStyle,
      fontSize: 28,
      height: 50,
      lineHeight: "50px",
    },
  },
  {
    value: "正文",
    style: defaultStyle,
  },
];
function DetailList() {
  const canvas = useCanvasByContext();

  const addCmp = (_cmp) => {
    console.log(_cmp);
    console.log("canvasbycontext", canvas);
    canvas.addCmp(_cmp);
  };
  return (
    <div className={styles.main}>
      <ul className={styles.box}>
        {settings.map((v) => {
          return (
            <li
              key={v.value}
              className={styles.item}
              onClick={() => addCmp({ ...v, type: isTextComponent })}
            >
              {v.value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DetailList;
