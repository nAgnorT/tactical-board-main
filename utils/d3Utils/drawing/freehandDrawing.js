import * as d3 from "d3"
function drawFreeHand(svg) {
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
    
        g.append('path').attr('d', curve(points)).attr('stroke', '#53DBF3').attr('fill', 'none').attr('stroke-width', 3).attr("marker-end", "url(#triangle)");

})

svg.on('mouseup', function(event) {
        g.remove()
        g = svg.append('g')

        g.append('path').attr('d', curve(points)).attr('stroke', '#53DBF3').attr('fill', 'none').attr('stroke-width', 6).style("cursor", "pointer").attr("marker-end", "url(#triangle)")

        points.splice(0)
        drawing = false
})
}
export {
    drawFreeHand
}