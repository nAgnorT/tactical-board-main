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
import { saveAwayPlayerData, saveLineData,saveHomePlayerData, savePolygonData } from "~/utils/d3Utils/controller/data.controller";
import {drawLine,loadLineData} from "../utils/d3Utils/drawing/lineDrawing"
import isMobile from "~/utils/d3Utils/checking/isMobile";
import { isHorizontal, isVertical } from "~/utils/d3Utils/checking/checkPitch";
import { loadHorizontalPitch,loadVerticalPitch } from "~/utils/d3Utils/drawing/pitchDrawing";
import { homePlayerDraw,awayPlayerDraw,loadPlayerData } from "~/utils/d3Utils/drawing/playerDrawing";
import { drawCurveNatural } from "~/utils/d3Utils/drawing/blockDrawing";
import { drawFreeHand } from "~/utils/d3Utils/drawing/freehandDrawing";
import { drawRectangle } from "~/utils/d3Utils/drawing/rectangleDrawing";
import { drawPolygon, loadPolygon } from "~/utils/d3Utils/drawing/polygonDrawing";
import { useActionStore } from '~/stores/store';
import { Input } from "postcss";
const menu = defineModel()
    onMounted(() => {
      function deleteData() {
        const dData = []
        saveAwayPlayerData(dData)
        saveHomePlayerData(dData)
        saveLineData(dData)
        savePolygonData(dData)
      }
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
            "delete": deleteData
      }
      const containWidth = ref(0)
      const containHeight = ref(0)
      watch(containWidth, () => {
        svg.selectAll("*").remove()
        drawd3()
      })
      // watch(containHeight, () => {
      //   drawd3()
      // })
      watch(menu, ()=> {
        console.log(menu.value)
        drawd3()
      })
      // console.log(container.attr('action'))
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
      // drawd3()
      function drawd3() {
        svg.selectAll("*").remove()
        if(isMobile()){
        svgSize = isVertical(svgWidth, svgHeight, containWidth.value, containWidth.value)
    }
    else{
        svgSize = isHorizontal(svgWidth, svgHeight, containWidth.value, containWidth.value)
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

function toggle(item) {
  svg.on("mouseup", null)
    svg.on("mousedown", null)
    svg.on("click", null)   // remove previous event listener 
    drawFunction = menuItemMap[item]
    if (item === "homeplayer" || item === "awayplayer" || item ==="line") {
      svg.call(drawFunction, ratio, centerX, centerY)
    }
    else if(item ==="delete" || item ==="mouse") drawFunction
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