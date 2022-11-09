import { getOnlyKey } from '../utils/index'
import { useRef } from 'react';
const defaultCanvas = {
    // 页面样式
    style: {
        width: 320,
        height: 568,
        backgroundColor: "#fff",
        backgroundImage: "",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        boxSizing: "content-box",
        wordBreak: "break-all",
        borderColor: "#ffffff00"
    },
    // 组件
    cmps: [],

    // 仅用于测试

};

// 状态管理
export default class Canvas {
    constructor(_canvas = defaultCanvas) {
        this.canvas = _canvas   //页面数据
        this.listener = []
        this.selectedCmpIndex = null
    }
    getCanvas = () => {
        return { ...this.canvas }
    }
    set = (_canvas) => {
        Object.assign(this.canvas, _canvas)
    }
    //新增组件
    addCmp = (_cmp) => {
        const cmp = { key: getOnlyKey(), ..._cmp }
        this.canvas.cmps.push(cmp)
        console.log("this.canvas", this.canvas)
        this.selectedCmpIndex = this.canvas.cmps.length - 1
        this.updateApp()
    }
    updateSelectedCmp = (newStyle, newValue) => {
        const selectedCmp = this.getSelectedCmp()
        if (newStyle) {
            this.canvas.cmps[this.getSelectedCmpIndex()].style = { ...selectedCmp.style, ...newStyle }
        }
        if (newValue !== undefined) {
            this.canvas.cmps[this.getSelectedCmpIndex()].value = newValue

        }

        this.updateApp()
    }
    getSelectedCmp = () => {
        const cmps = this.getCanvasCmps()
        return cmps[this.selectedCmpIndex]
    }
    getSelectedCmpIndex = () => {
        return this.selectedCmpIndex
    }
    setSelectedCmpIndex = (index) => {
        if (this.selectedCmpIndex === index) return;
        this.selectedCmpIndex = index
        this.updateApp()
    }
    updateApp = () => {
        this.listener.forEach(v => v())
    }
    updateCanvasStyle = (newStyle) => {
        this.canvas.style = {
            ...this.canvas.style,
            ...newStyle
        }
        this.updateApp()
    }
    subscribe = (listener) => {
        this.listener.push(listener)
        return () => { //返回一个销毁listener的事件
            this.listener = this.listener.filter(v => v !== listener)
        }
    }
    getPublicCanvas = () => {
        const obj = {
            getCanvas: this.getCanvas,
            getCanvasCmps: this.getCanvasCmps,
            addCmp: this.addCmp,
            subscribe: this.subscribe,
            setSelectedCmpIndex: this.setSelectedCmpIndex,
            getSelectedCmpIndex: this.getSelectedCmpIndex,
            updateSelectedCmp: this.updateSelectedCmp,
            getSelectedCmp: this.getSelectedCmp,
            updateCanvasStyle: this.updateCanvasStyle
        }
        return obj
    }
    getCanvasCmps = () => {
        return [...this.canvas.cmps]
    }


}
