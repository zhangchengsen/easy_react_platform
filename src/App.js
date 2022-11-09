import Header from "./layout/Header";
import Left from "./layout/Left";
import Center from "./layout/Center";
import Right from "./layout/Right";
import styles from "./App.less";
import { useCanvas } from "./store/hooks";
import { CanvasContext } from "./Context";
import classNames from 'classnames'
import { useEffect, useReducer } from "react";

export default function App(props) {
  const canvas = useCanvas()
  let u = true
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  useEffect(() => {
    const unSubscribe = canvas.subscribe(() => {
      forceUpdate()
    })
    return () => unSubscribe()
  }, [])
  return (
    <div className={classNames(styles.main, u && 'ass')}>
      <CanvasContext.Provider value={canvas}>

        <Header />
        <div className={styles.content}>
          <Left />
          <Center />
          <Right />
        </div>
      </CanvasContext.Provider>
    </div>
  );
}
