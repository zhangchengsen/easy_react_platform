// import { useCanvasData } from "../../store/hooks";
import { useCanvasByContext } from "../../store/hooks";
import Cmp from "../../components/Cmp";
import styles from "./index.less";
import { useCallback, useEffect } from "react";

export default function Center(props) {
  const canvas = useCanvasByContext()
  const canvasData = canvas.getCanvas();

  const { style, cmps } = canvasData;
  const onDrop = useCallback((e) => {
    const endX = e.pageX - 0
    const endY = e.pageY - 0
    const start = e.dataTransfer.getData("text").split(',');
    console.log('start', start)
    const disX = endX - (start[0] - 0)
    const disY = endY - (start[1] - 0)

    const selectedCmp = canvas.getSelectedCmp()
    const oldStyle = selectedCmp.style
    const top = oldStyle.top + disY
    const left = oldStyle.left + disX
    canvas.updateSelectedCmp({ top, left })
  }, [])
  const selectedIndex = canvas.getSelectedCmpIndex()
  const allowDrop = useCallback((e) => {
    e.preventDefault()
  }, [])
  useEffect(() => {
    document.getElementById('center').addEventListener('click', () => {
      canvas.setSelectedCmpIndex(-1)
    })
  }, [])

  return (
    <div id="center" className={styles.main}>
      <div className={styles.canvas} onDrop={onDrop} style={{ ...canvasData.style, backgroundImage: `url(${canvasData.style.backgroundImage})` }} onDragOver={allowDrop}>
        {cmps.map((cmp, index) => (
          <Cmp key={cmp.key} cmp={cmp} selected={selectedIndex === index} index={index} />
        ))}
      </div>
    </div>
  );
}
