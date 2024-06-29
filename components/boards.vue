<template>

    <div class="flex justify-center w-full h-full " id="svg-container">

    </div>
    <div id ="menu1" class = "flex justify-center">
      <!-- <p>Data: {{ dataStore.data }}</p> -->
      <br/>
      <!-- <p>Số lần thay đổi: {{ count }}</p> -->
    </div>
  </template>
  
  <script setup>
import * as d3 from "d3";
import { onMounted, ref } from "vue";
import interactDrag from "~/utils/d3Utils/drawing/interactDrag";
import interact from "interactjs"  
import axios from "axios";
import { saveAwayPlayerData, saveLineData,saveHomePlayerData, savePolygonData, saveCurveData, saveFreehandData } from "~/utils/d3Utils/controller/data.controller";
import {drawLine,loadLineData} from "../utils/d3Utils/drawing/lineDrawing"
import isMobile from "~/utils/d3Utils/checking/isMobile";
import { isHorizontal, isVertical } from "~/utils/d3Utils/checking/checkPitch";
import { loadHorizontalPitch,loadVerticalPitch } from "~/utils/d3Utils/drawing/pitchDrawing";
import { homePlayerDraw,awayPlayerDraw,loadPlayerData } from "~/utils/d3Utils/drawing/playerDrawing";
import { drawCurveNatural, loadCurveData } from "~/utils/d3Utils/drawing/blockDrawing";
import { drawFreeHand, loadFreeHandData } from "~/utils/d3Utils/drawing/freehandDrawing";
import { drawRectangle } from "~/utils/d3Utils/drawing/rectangleDrawing";
import { drawPolygon, loadPolygon } from "~/utils/d3Utils/drawing/polygonDrawing";
import { Input } from "postcss";
const menu = defineModel()
    onMounted(() => {
      function deleteData() {
        const dData = []
        saveAwayPlayerData(dData)
        saveHomePlayerData(dData)
        saveLineData(dData)
        savePolygonData(dData)
        saveCurveData(dData)
        saveFreehandData(dData)
      }
      function ct22(){
        saveHomePlayerData(home433)
        saveAwayPlayerData(away433)
      }
      const home433 = [
        {
          "number": 1,
          "x": 45,
          "y": 0,
          "type": "home"
        },
        {
          "number": 2,
          "x": 30,
          "y": -26,
          "type": "home"
        },
        {
          "number": 3,
          "x": 33.5,
          "y": -9.15,
          "type": "home"
        },
        {
          "number": 4,
          "x": 33.5,
          "y": 9.15,
          "type": "home"
        },
        {
          "number": 5,
          "x": 30,
          "y": 26,
          "type": "home"
        },
        {
          "number": 6,
          "x": 20,
          "y": 0,
          "type": "home"
        },
        {
          "number": 7,
          "x": 8,
          "y": 26,
          "type": "home"
        },
        {
          "number": 8,
          "x": 15,
          "y": -14.65,
          "type": "home"
        },
        {
          "number": 9,
          "x": 3.5,
          "y": 0,
          "type": "home"
        },
        {
          "number": 10,
          "x": 15,
          "y": 14.65,
          "type": "home"
        },
        {
          "number": 11,
          "x": 8,
          "y": -26,
          "type": "home"
        }
      ]
      const away433 = [
        {
          "number": 1,
          "x": -45,
          "y": 0,
          "type": "away"
        },
        {
          "number": 2,
          "x": -30,
          "y": 26,
          "type": "away"
        },
        {
          "number": 3,
          "x": -33.5,
          "y": 9.15,
          "type": "away"
        },
        {
          "number": 4,
          "x": -33.5,
          "y": -9.15,
          "type": "away"
        },
        {
          "number": 5,
          "x": -30,
          "y": -26,
          "type": "away"
        },
        {
          "number": 6,
          "x": -20,
          "y": 0,
          "type": "away"
        },
        {
          "number": 7,
          "x": -8,
          "y": -26,
          "type": "away"
        },
        {
          "number": 8,
          "x": -15,
          "y": 14.65,
          "type": "away"
        },
        {
          "number": 9,
          "x": -3.5,
          "y": 0,
          "type": "away"
        },
        {
          "number": 10,
          "x": -15,
          "y": -14.65,
          "type": "away"
        },
        {
          "number": 11,
          "x": -8,
          "y": 26,
          "type": "away"
        },
      ]
      let drawFunction
      let svgSize
      let svgWidth= 1,svgHeight= 1
      let ratio = 1
      // const container = d3.select("#svg-container")
      // const action = container.attr('action')
      const svg = d3.select("#svg-container").append('svg')
      // const menu = d3.select("#menu")
      let centerX, centerY
      // console.log(test.value)
      const menuItemMap = {
            "mouse": () => {},
            "homeplayer": homePlayerDraw,
            "awayplayer":awayPlayerDraw,
            "line": drawLine,
            "polygon": drawPolygon,
            "curve": drawCurveNatural,
            "rectangle": drawRectangle,
            "draw": drawFreeHand,
            "delete": deleteData,
            "22ct": ct22
      }
      const containWidth = ref(0)
      const containHeight = ref(0)
      watch([containWidth, containHeight, menu], () => {
        svg.selectAll("*").remove()
        
        drawd3()
        if (menu.value==="22ct" || menu.value === "delete") menu.value = "mouse"
        console.log(menu.value)
      })
      // interactDrag('home-player')
      // interactDrag('away-player')
      function resize() {

        const inputContainer = document.getElementById('svg-container')
        const inputWidth = inputContainer.offsetWidth
        const inputHeight = inputContainer.offsetHeight
        containWidth.value = inputWidth
        containHeight.value = inputHeight
      }

      window.addEventListener("resize",resize);
      resize()
      function drawd3() {
        svg.selectAll("*").remove()
        if(isMobile()){
        svgSize = isVertical(svgWidth, svgHeight, containWidth.value, containHeight.value)
    }
    else{
        svgSize = isHorizontal(svgWidth, svgHeight, containWidth.value, containHeight.value)
    }
    svgWidth = svgSize.svgWidth
    svgHeight = svgSize.svgHeight
    centerX = svgWidth/2
    centerY = svgHeight / 2

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
    toggle(menu.value)
    svg.call(loadPlayerData, ratio, centerX,centerY)
    svg.call(loadLineData, ratio, centerX,centerY)
    svg.call(loadPolygon)
    svg.call(loadCurveData)
    svg.call(loadFreeHandData)

function toggle(item) {
  svg.on("mouseup", null)
    svg.on("mousedown", null)
    svg.on("click", null)   // remove previous event listener 
    drawFunction = menuItemMap[item]
    if (item === "homeplayer" || item === "awayplayer" || item ==="line") {
      svg.call(drawFunction, ratio, centerX, centerY)
    }
    else if(item ==="delete" || item ==="mouse") {
      drawFunction()
      menu.value="mouse"
    }
    else svg.call(drawFunction)
} 
}
    })
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