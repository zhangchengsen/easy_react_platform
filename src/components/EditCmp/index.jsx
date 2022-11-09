import React from "react";
import styles from "./index.less";
import { useCanvasByContext } from "../../store/hooks";
import Item from "../../lib/Item";
import InputColor from "@/lib/InputColor";
function EditCmp() {
  const canvas = useCanvasByContext();
  const selectedCmp = canvas.getSelectedCmp();
  const { value, style } = selectedCmp;
  const handleStyleChange = (e, name, type) => {
    let newValue = null;

    if (!e) {
      newValue = type;
    } else {
      newValue = e.target.value;
      if (type) newValue -= 0;
      if (name === "lineHeight") newValue += "px";
    }

    const newStyle = { [name]: newValue };
    canvas.updateSelectedCmp(newStyle);
  };
  const handleValueChange = (e) => {
    let newValue = e.target.value;

    canvas.updateSelectedCmp(null, newValue);
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>组件属性</div>
      <Item label="描述:">
        <input
          className={styles.itemRight}
          value={style.value}
          onChange={(e) => handleValueChange(e)}
        ></input>
      </Item>
      {style.fontSize !== undefined && (
        <Item label="字体大小 (px)：">
          <input
            type="number"
            className={styles.itemRight}
            value={style.fontSize}
            onChange={(e) => handleStyleChange(e, "fontSize", true)}
          ></input>
        </Item>
      )}
      {style.fontWeight !== undefined && (
        <Item label="字体粗细 ：">
          <select
            className={styles.itemRight}
            value={style.fontWeight}
            onChange={(e) => handleStyleChange(e, "fontWeight")}
          >
            <option value="normal">normal</option>
            <option value="bold">bold</option>
            <option value="lighter">lighter</option>
          </select>
        </Item>
      )}

      {style.lineHeight !== undefined && (
        <Item label="行高 (px)：">
          <input
            type="number"
            className={styles.itemRight}
            value={parseInt(style.lineHeight)}
            onChange={(e) => handleStyleChange(e, "lineHeight", true)}
          ></input>
        </Item>
      )}
      {/* {style.wordBreak !== undefined && (
        <Item label="文本换行 ：">
          <select
            className={styles.itemRight}
            value={style.wordBreak}
            onChange={(e) => handleStyleChange(e, "wordBreak")}
          >
            <option value="unset">unset</option>
            <option value="break-all">break-all</option>
          </select>
        </Item>
      )} */}
      {style.textAlign !== undefined && (
        <Item label="对齐: ">
          <select
            className={styles.itemRight}
            value={style.textAlign}
            onChange={(e) => {
              handleStyleChange(e, "textAlign");
            }}
          >
            <option value="left">居左</option>
            <option value="center">居中</option>
            <option value="right">居右边</option>
          </select>
        </Item>
      )}

      {style.transform !== undefined && (
        <Item label="旋转: ">
          <input
            className={styles.itemRight}
            type="number"
            value={style.transform}
            onChange={(e) => handleStyleChange(e, "transform")}
          />
        </Item>
      )}

      {style.borderRadius !== undefined && (
        <Item label="圆角: ">
          <input
            className={styles.itemRight}
            type="text"
            value={style.borderRadius}
            onChange={(e) => handleStyleChange(e, "borderRadius")}
          />
        </Item>
      )}

      <Item label="边框样式: ">
        <select
          className={styles.itemRight}
          value={style.borderStyle}
          onChange={(e) => {
            handleStyleChange(e, "borderStyle");
          }}
        >
          <option value="none">none</option>
          <option value="dashed">dashed</option>
          <option value="dotted">dotted</option>
          <option value="double">double</option>
          <option value="groove">groove</option>
          <option value="hidden">hidden</option>
          <option value="solid">solid</option>
        </select>
      </Item>

      <Item label="边框宽度: ">
        <input
          className={styles.itemRight}
          type="number"
          value={style.borderWidth}
          onChange={(e) => handleStyleChange(e, "borderWidth", true)}
        />
      </Item>

      <Item label="边框颜色: ">
        <InputColor
          className={styles.itemRight}
          color={style.borderColor || "#ffffff00"}
          onChangeComplete={(e) =>
            handleStyleChange(null, "borderColor", e.hex)
          }
        />
      </Item>

      {style.color !== undefined && (
        <Item label="字体颜色: ">
          <InputColor
            className={styles.itemRight}
            color={style.color}
            onChangeComplete={(e) => handleStyleChange(null, "color", e.hex)}
          />
        </Item>
      )}

      {style.backgroundColor !== undefined && (
        <Item label="背景颜色: ">
          <InputColor
            className={styles.itemRight}
            color={style.backgroundColor}
            onChangeComplete={(e) =>
              handleStyleChange(null, "backgroundColor", e.hex)
            }
          />
        </Item>
      )}
    </div>
  );
}

export default EditCmp;
