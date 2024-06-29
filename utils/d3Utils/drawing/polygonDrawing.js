import * as d3 from "d3"
import { getPolygonData,savePolygonData } from "../controller/data.controller";
async function drawPolygon(svg){
    let polygonData = await getPolygonData()
    // generate variables
    let dragging = false, drawing = false, startPoint;
    let points = [], g;
    let startX, startY
    
    // event listeners on the svg
    svg.on('mouseup', function(event){

        // check if the left mouse button is clicked
        if(event.button === 2){
            return        
        }

        drawing = true;
        startPoint = [d3.pointer(event)[0], d3.pointer(event)[1]];

        // if class drawPoly does not exist, create it
        if(svg.select('g.drawPoly').empty()) g = svg.append('g').attr('class', 'drawPoly');

        // if user clicks on the existed points, close the polygon
        if(event.target.hasAttribute('is-handle')) {

            closePolygon();
            return;
        };
    
        points.push(d3.pointer(event));

        g.select('polyline').remove();
    
        let polyline = g.append('polyline').attr('points', points)
                        .style('fill', 'none')
                        .attr('stroke', '#000');
    
        for(var i = 0; i < points.length; i++) {
            g.append('circle')
            .attr('cx', points[i][0])
            .attr('cy', points[i][1])
            .attr('r', 4)
            .attr('fill', 'yellow')
            .attr('stroke', '#000')
            .attr('is-handle', 'true')
            .style({cursor: 'pointer'});

        }
        
        
    });
    
    function closePolygon() {

        svg.select('g.drawPoly').remove();
        console.log(points)
        let count = polygonData.length === 0 ?1 : polygonData[polygonData.length-1].number +1
        const polygonCor = {
            number: count,
            points:points
        }
        polygonData.push(polygonCor)
        savePolygonData(polygonData)
        var g = svg.append('g');
        g.append('polygon').attr('data-polygon-number',count)
        .attr('points', points)
        .style('fill', "#008080")
        .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
        )
        .style("cursor", "pointer")
        .style("opacity",0.2)
        points=[]

        drawing = false;

    }
    
    svg.on('mousemove', function(event) {
        if(!drawing) return;
        var g = d3.select('g.drawPoly');
        g.select('line').remove();
        var line = g.append('line')
                    .attr('x1', startPoint[0])
                    .attr('y1', startPoint[1])
                    .attr('x2', d3.pointer(event)[0] + 2)
                    .attr('y2', d3.pointer(event)[1])
                    .attr('stroke', '#53DBF3')
                    .attr('stroke-width', 1);
    })
    
    function dragstarted(event) { 
        startX = event.x
        startY = event.y
        d3.select(this.parentNode).select("polygon").attr("stroke", "black");
    }


    function dragged(event) {
    
        let offSetX = event.x - startX
        let offSetY = event.y - startY
        d3.select(this.parentNode).select("polygon").attr("transform", `translate(${offSetX}, ${offSetY})`)

    }

    function dragended(event) {
        let offSetX = event.x - startX
        let offSetY = event.y - startY

        let newPoints = []
        let points = convertPolygonPointsTextToArray(d3.select(this.parentNode).select("polygon").attr("points"))

        points.forEach(point => {
            newPoints.push([point[0] + offSetX, point[1] + offSetY])
        })
        const number = d3.select(this).attr('data-polygon-number')-1
        polygonData[number].points = newPoints
        savePolygonData(polygonData)
        let g = d3.select(this.parentNode)
        g.select("polygon").remove()
        
        g.append('polygon').attr('data-polygon-number',number+1)
        .attr('points', newPoints)
        .style('fill', "#008080")
        .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
        )
        .style("cursor", "pointer")
        .style("opacity",0.2)

    }
    


}

function convertPolygonPointsTextToArray(pointsText){
    let points = pointsText.split(",")
    
    let newPoints = []

    for(let i = 0; i < points.length; i += 2){
       
        newPoints.push([parseFloat(points[i]), parseFloat(points[i + 1])])
    }
    return newPoints
}
async function loadPolygon(svg) {
    let polygonData = await getPolygonData()
    let startX, startY
    for(let i=0; i<polygonData.length;i++) {
        var g = svg.append('g');
        g.append('polygon').attr('data-polygon-number',polygonData[i].number)
        .attr('points', polygonData[i].points)
        .style('fill', "#008080")
        .style("cursor", "pointer")
        .style("opacity",0.2)
        .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
        )
    }
    function dragstarted(event) { 
        startX = event.x
        startY = event.y
        d3.select(this.parentNode).select("polygon").attr("stroke", "black");
    }


    function dragged(event) {
    
        let offSetX = event.x - startX
        let offSetY = event.y - startY
        d3.select(this.parentNode).select("polygon").attr("transform", `translate(${offSetX}, ${offSetY})`)

    }

    function dragended(event) {
        let offSetX = event.x - startX
        let offSetY = event.y - startY

        let newPoints = []
        let points = convertPolygonPointsTextToArray(d3.select(this.parentNode).select("polygon").attr("points"))

        points.forEach(point => {
            newPoints.push([point[0] + offSetX, point[1] + offSetY])
        })
        const number = d3.select(this).attr('data-polygon-number')-1
        console.log('point: ',number)
        polygonData[number].points = newPoints
        savePolygonData(polygonData)
        let g = d3.select(this.parentNode)
        g.select("polygon").remove()
        
        g.append('polygon').attr('data-polygon-number',number+1)
        .attr('points', newPoints)
        .style('fill', "#008080")
        .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
        )
        .style("cursor", "pointer")
        .style("opacity",0.2)

    }
    


}
export {
    drawPolygon,
    loadPolygon
}