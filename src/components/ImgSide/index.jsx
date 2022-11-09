import React from "react";
import { isImgComponent } from "../../layout/Left";
import { useCanvasByContext } from "../../store/hooks";
import styles from "./index.less";
const defaultStyle = {
  position: "absolute",
  top: 1,
  left: 0,
  width: 80,
  height: 80,

  borderRadius: "0%",
  borderStyle: "none",
  borderWidth: "0",
  borderColor: "#ffffff00",
};

const settings = [
  {
    value: "http://150.158.30.131:8181/certificate.jpg",
    style: defaultStyle,
  },
  {
    value: "http://150.158.30.131:8181/chuliu.jpeg",
    style: defaultStyle,
  },
  {
    value: "http://150.158.30.131:8181/tiger.png",
    style: defaultStyle,
  },
  {
    value: "http://150.158.30.131:8181/hua.png",
    style: defaultStyle,
  },
  {
    value:
      "https://newsimg.5054399.com/uploads/userup/1511/ertong_4600564fcd25d02391190225008a8d3f.jpg",
    style: defaultStyle,
  },
  {
    value:
      "https://newsimg.5054399.com/uploads/userup/1511/ertong_59f1401d938f61aa5fc995939c369de4.jpg",
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
              onClick={() => addCmp({ ...v, type: isImgComponent })}
            >
              <img src={v.value} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DetailList;
