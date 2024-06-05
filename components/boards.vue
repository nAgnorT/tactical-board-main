<template>
    <div class="flex justify-center w-full h-full " id="svg-container">

    </div>
    <div id ="menu" class = "flex justify-center">

    </div>
  </template>
  
  <script>
import * as d3 from "d3";
import { onMounted } from "vue";
import interactDrag from "~/utils/d3Utils/drawing/interactDrag";
import interact from "interactjs"  
import axios from "axios";
import { saveAwayPlayerData, saveLineData,saveHomePlayerData } from "~/utils/d3Utils/controller/data.controller";
import {drawLine,loadLineData} from "../utils/d3Utils/drawing/lineDrawing"
import isMobile from "~/utils/d3Utils/checking/isMobile";
import { isHorizontal, isVertical } from "~/utils/d3Utils/checking/checkPitch";
import { loadHorizontalPitch,loadVerticalPitch } from "~/utils/d3Utils/drawing/pitchDrawing";
import { homePlayerDraw,awayPlayerDraw,loadPlayerData } from "~/utils/d3Utils/drawing/playerDrawing";
import { drawCurveNatural } from "~/utils/d3Utils/drawing/blockDrawing";
import { drawFreeHand } from "~/utils/d3Utils/drawing/freehandDrawing";
import { drawRectangle } from "~/utils/d3Utils/drawing/rectangleDrawing";
import { drawPolygon, loadPolygon } from "~/utils/d3Utils/drawing/polygonDrawing";
  export default {
    name: 'Boards',
    setup() {
    onMounted(() => {
      function mouse(){
        
      }
      let svgSize
      let drawFunction
      let svgWidth= 1,svgHeight= 1
      let ratio = 1
      const container = d3.select("#svg-container")
      const svg = container.append('svg')
      const menu = d3.select("#menu")
      const menuItemMap = {
            "mouse": mouse,
            "homeplayer": homePlayerDraw,
            "awayplayer":awayPlayerDraw,
            "line": drawLine,
            "polygon": drawPolygon,
            "curve": drawCurveNatural,
            "rectangle": drawRectangle,
            "draw": drawFreeHand
      }

      interactDrag('home-player')
      interactDrag('away-player')

      function resize () {
        svg.selectAll("*").remove()
        menu.selectAll("*").remove()
        const inputContainer = document.getElementById('svg-container')
        const inputWidth = inputContainer.offsetWidth
        const inputHeight = inputContainer.offsetHeight
        if(isMobile()){
        svgSize = isVertical(svgWidth, svgHeight, inputWidth, inputHeight)
    }
    else{
        svgSize = isHorizontal(svgWidth, svgHeight, inputWidth, inputHeight)
    }
    svgWidth = svgSize.svgWidth
    svgHeight = svgSize.svgHeight
    const centerX = svgWidth/2
    const centerY = svgHeight / 2

    svg
          .attr("width", svgWidth)
          .attr("height", svgHeight)
    if (svgHeight>svgWidth) {
            const pitchHeight = svgHeight*0.95
            ratio = pitchHeight/100
            loadVerticalPitch(svg,pitchHeight,centerX,centerY)
    }
    else{
            const pitchWidth = svgWidth * 0.95
            ratio = pitchWidth/100
            loadHorizontalPitch(svg,pitchWidth,centerX,centerY)
    }
    svg.call(loadPlayerData, ratio, centerX,centerY)
    svg.call(loadLineData, ratio, centerX,centerY)
    svg.call(loadPolygon)
    Object.keys(menuItemMap).forEach((item) => {

      const buttonName = item.toUpperCase()
      const buttonId = `${item}-button`
      const className = "svg-button"

      menu.append("button")
  .text(buttonName)
  .attr("id", buttonId)
  .attr("class", className)
  .on("click", () => {
    svg.on("mouseup", null)
    svg.on("mousedown", null)
    svg.on("click", null)   // remove previous event listener 
    drawFunction = menuItemMap[item]  
    if (item === "homeplayer" || item === "awayplayer" || item ==="line") {
      svg.call(drawFunction, ratio, centerX, centerY)
    }
    else svg.call(drawFunction)
}) 
function toggle(item) {
  svg.on("mouseup", null)
    svg.on("mousedown", null)
    svg.on("click", null)   // remove previous event listener 
    drawFunction = menuItemMap[item]  
    if (item === "homeplayer" || item === "awayplayer" || item ==="line") {
      svg.call(drawFunction, ratio, centerX, centerY)
    }
    else svg.call(drawFunction)
} 
})
      }
      window.addEventListener("resize", resize);
      resize()
    })
  },
  }
  </script>
  <style>
    rect{
      fill: none;
        stroke: black;
        stroke-width: "2px";
    }
    line, circle{
      stroke: black;
      stroke-width: "2px";
    }
    .svg-button{
      @apply py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700
    }
</style>