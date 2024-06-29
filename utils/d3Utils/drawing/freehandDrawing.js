import * as d3 from "d3"
import { getFreehandData, saveFreehandData } from "../controller/data.controller";
async function drawFreeHand(svg) {
    let freehandData = await getFreehandData()
    let points = [],
    g, drawing = false,
    startPoint


const curve = d3.line().curve(d3.curveCatmullRom.alpha(1));

svg.on('mousedown', function(event) {
        if (event.button === 2) return
        if (event.button === 0) {
            if (!drawing) {
                startPoint = d3.pointer(event)
                points.push(startPoint)
                if (svg.select('g.drawFreeHand').empty()) g = svg.append('g').attr('class', 'drawFreeHand');
                drawing = true;
            }
        }

})

svg.on('mousemove', function(event) {
        if (!drawing) return;
        let [x, y] = d3.pointer(event)
        points.push([x, y])
    
    
    
        g.select('path').remove();
    
        g.append('path').attr('d', curve(points)).attr('stroke', '#53DBF3').attr('fill', 'none').attr('stroke-width', 3)
        // .attr("marker-end", "url(#triangle)");

})

svg.on('mouseup', function(event) {
        g.remove()
        g = svg.append('g')
        let count = freehandData.length === 0 ?1 : freehandData[freehandData.length-1].number +1
        const freehandCor = {
            number: count,
            points:points
        }
        freehandData.push(freehandCor)
        saveFreehandData(freehandData)
        

        g.append('path').attr('d', curve(points)).attr('stroke', '#53DBF3').attr('fill', 'none').attr('stroke-width', 6).style("cursor", "pointer")
        // .attr("marker-end", "url(#triangle)")

        points= []
        drawing = false
})
}

async function loadFreeHandData(svg) {
    let freehandData = await getFreehandData()
    const curve = d3.line().curve(d3.curveCatmullRom.alpha(1));
    for (let i = 0; i<freehandData.length;i++){
        var g = svg.append('g')
        g.append('path')
        .attr('d', curve(freehandData[i].points))
        .attr('stroke', '#53DBF3')
        .attr('fill', 'none')
        .attr('stroke-width', 6)
        .style("cursor", "pointer")
    }
        
}
export {
    drawFreeHand,
    loadFreeHandData
}