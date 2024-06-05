import * as d3 from "d3"
const isVertical = (svgWidth, svgHeight, inputWidth, inputHeight) => {
    let height = inputHeight *0.9
    let width = height * 0.64
    if(width > inputWidth){
        width = inputWidth *0.9
        height = width * 100/64
    }
    do {
        if(svgWidth < width && svgHeight < height ){
            svgHeight = height
            svgWidth = svgHeight*0.64
            }
        else if (svgHeight > height) {
            svgHeight = height
            svgWidth = svgHeight * 0.64
        }
        else {
            svgWidth = width
            svgHeight = svgWidth * 100/64
        }
    } while (svgWidth>width)
    return {
        svgWidth: svgWidth,
        svgHeight: svgHeight
    }

}
const isHorizontal = (svgWidth, svgHeight,inputWidth, inputHeight) =>{
    let width = inputWidth*0.9
    let height = width*0.64
    if(height> inputHeight){
        height = inputHeight*0.9
        width = height * 100/64
    }
    do {
          if(svgWidth < width && svgHeight < height ){
              svgWidth = width
              svgHeight = svgWidth*0.64
              }
          else if (svgHeight > height) {
              svgHeight = height
              svgWidth = svgHeight * 100/64
          }
          else {
              svgWidth = width
              svgHeight = svgWidth*0.64
          }
    } while(svgHeight > height)

    return {
        svgWidth: svgWidth,
        svgHeight: svgHeight
    }

}

export {
    isHorizontal,
    isVertical
}