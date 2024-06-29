import * as d3 from "d3"
import { getCurveData,saveCurveData } from "../controller/data.controller";
function unSelectAllElements(svg) {
    svg.selectAll('.selected').classed('selected', false);
    svg.selectAll('.select-border').attr('stroke', 'none')
    svg.selectAll('.bot-left, .bot-right, .top-left, .top-right').attr('fill', 'none')
}
async function drawCurveNatural(svg) {
    let curveData = await getCurveData()
        let points = [],
        g, drawing = false,
        startPoint, dx, dy, marker, inSwing = false,
        outSwing = false

    if (!marker) {
        marker = svg.append("g:defs").append("g:marker")
            .attr("id", "triangle")
            .attr("markerHeight", 4)
            .attr("orient", "auto")
            .style("fill", "#53DBF3")
            .append("path")
            .attr("d", "M 0 0 3 2 0 4")
            .attr("stroke", "53DBF3");
    }
    const curve = d3.line().curve(d3.curveBundle.beta(0.7));

    svg.on('mousedown', function(event) {
            unSelectAllElements(svg)
            if (event.button === 2) outSwing = true
            if (event.button === 0) inSwing = true
    
    
            if (!drawing) {
                startPoint = d3.pointer(event)
                points.push(startPoint)
                if (svg.select('g.drawCurveNatural').empty()) g = svg.append('g').attr('class', 'drawCurveNatural');
                drawing = true;
            }
    })

    svg.on('mousemove', function(event) {
            if (!drawing) return;
            let [x, y] = d3.pointer(event)
            dx = x - startPoint[0]
            dy = y - startPoint[1]
            if (inSwing) {
                points[1] = [startPoint[0] - dx * 6 / 10, startPoint[1] + dy * 4 / 10]
                points[2] = [startPoint[0] - dx * 5 / 10, startPoint[1] + dy * 8 / 10]
                points[3] = [startPoint[0] + dx * 4 / 10, startPoint[1] + dy]
                points[4] = [x, y];
            }
            if (outSwing) {
                points[1] = [startPoint[0] + dx * 14 / 10, startPoint[1] + dy * 4 / 10]
                points[2] = [startPoint[0] + dx * 15 / 10, startPoint[1] + dy * 8 / 10]
                points[3] = [startPoint[0] + dx * 12 / 10, startPoint[1] + dy]
                points[4] = [x, y];
            }
    
            console.log(points[0], points[1], points[2], points[3], points[4])
    
    
            g.select('path').remove();
    
            g.append('path').attr('d', curve(points)).attr('stroke', '#53DBF3').attr('fill', 'none').attr('stroke-width', 3).attr("marker-end", "url(#triangle)");
    })

    svg.on('mouseup', function(event) {
            g.remove()
            g = svg.append('g')
            let count = curveData.length === 0 ?1 : curveData[curveData.length-1].number +1
            const curveCor = {
                number: count,
                points:points
            }
            curveData.push(curveCor)
            saveCurveData(curveData)
            g.append('path').attr('d', curve(points)).attr('stroke', '#53DBF3').attr('fill', 'none').attr('stroke-width', 6).style("cursor", "pointer").attr("marker-end", "url(#triangle)")
    
            points= []
            inSwing = false
            outSwing = false
            drawing = false
    })
}
async function loadCurveData(svg) {
    let marker
    let curveData = await getCurveData()
    if (!marker) {
        marker = svg.append("g:defs").append("g:marker")
            .attr("id", "triangle")
            .attr("markerHeight", 4)
            .attr("orient", "auto")
            .style("fill", "#53DBF3")
            .append("path")
            .attr("d", "M 0 0 3 2 0 4")
            .attr("stroke", "53DBF3");
    }
    const curve = d3.line().curve(d3.curveBundle.beta(0.7));
    for(let i =0; i<curveData.length;i++) {
        var g = svg.append('g')
        g.append('path').attr('d', curve(curveData[i].points))
        .attr('stroke', '#53DBF3').attr('fill', 'none')
        .attr('stroke-width', 6)
        .style("cursor", "pointer")
        .attr("marker-end", "url(#triangle)")
    }

}
export{
    drawCurveNatural,
    loadCurveData
}