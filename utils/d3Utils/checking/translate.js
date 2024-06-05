import isMobile from "./isMobile"
const translatePlayerPosition = (centerX, centerY, ratio, x, y) => {
  
    if(isMobile()) {
      return [-(centerY-y)/ratio,(centerX-x)/ratio]
    }
    return [(centerX-x)/ratio, (centerY-y)/ratio]
}
  
const swapDeviceX = (x,y) => {
    if(isMobile()) return y
    return x
}
const swapDeviceY = (x,y) => {
    if(isMobile()) return -x
    return y
}
export {
    translatePlayerPosition,
    swapDeviceX,
    swapDeviceY
}