import { useContext, useRef } from "react";
import { CanvasContext } from "../Context";
import Canvas from './canvas';

export function useCanvasData() {
    const canvas = useContext(CanvasContext)

    return canvas.getCanvas();

}
//获取数据
export function useCanvasByContext() {
    const canvas = useContext(CanvasContext)
    return canvas;

}


export function useCanvasCmps() {
    const canvas = useContext(CanvasContext)
    return canvas.getCanvasCmps();

}

export function useCanvas(canvas) {
    //组件卸载之前的任何一个生命周期 值时钟是他自己
    const canvasRef = useRef()
    if (!canvasRef.current) {
        if (canvas) {
            canvasRef.current = canvas
        } else {
            const canvas = new Canvas()
            canvasRef.current = canvas.getPublicCanvas()
        }
    }

    return canvasRef.current

}