import * as d3 from "d3"
function unSelectAllElements(svg) {
    svg.selectAll('.selected').classed('selected', false);
    svg.selectAll('.select-border').attr('stroke', 'none')
    svg.selectAll('.bot-left, .bot-right, .top-left, .top-right').attr('fill', 'none')
}
function drawRectangle(svg) {
    let startPoint, g, startX, startY, endX, endY
    let drawing = false
    let transformX = 0,
        transformY = 0,
        oppositeCorner, oppositeCircle, oppositeCx, oppositeCy
    const cornerMap = {
        'top-left': {
            'opposite': 'bot-right',
            'sameCx': 'bot-left',
            'sameCy': 'top-right'
        },
        'top-right': {
            'opposite': 'bot-left',
            'sameCx': 'bot-right',
            'sameCy': 'top-left'
        },
        'bot-left': {
            'opposite': 'top-right',
            'sameCx': 'top-left',
            'sameCy': 'bot-right'
        },
        'bot-right': {
            'opposite': 'top-left',
            'sameCx': 'top-right',
            'sameCy': 'bot-left'

        }

    }



    svg.on('mousedown', function(event) {
                    if (event.button === 2) return
        if (event.button === 0) {

            unSelectAllElements(svg)

            if (!drawing) {
                startPoint = d3.pointer(event)
                startX = d3.pointer(event)[0]
                startY = d3.pointer(event)[1]
                g = svg.append("g").attr("class", "draw-rectangle")
                drawing = true
            }
        }
    })

    svg.on('mousemove', function(event) {
            if (!drawing) return;

            endX = d3.pointer(event)[0]
            endY = d3.pointer(event)[1]
    
            g.select('rect').remove();
            let rect = g.append('rect')
                .attr('x', Math.min(startX, endX))
                .attr('y', Math.min(startY, endY))
                .attr('width', Math.abs(endX - startX))
                .attr('height', Math.abs(endY - startY))
                .attr('stroke', '#53DBF3')
                .attr('stroke-width', 6)
                .attr('fill', 'none')
    
    })

    svg.on('mouseup', function(event) {
            g.remove()
            g = svg.append('g')
    
            let circlePoints = {
                'top-left': [startPoint[0], startPoint[1]],
                'bot-left': [startPoint[0], endY],
                'top-right': [endX, startPoint[1]],
                'bot-right': [endX, endY]
    
            }
    
            for ( let key of Object.keys(circlePoints)) {
                let cx = circlePoints[key][0]
                let cy = circlePoints[key][1]
    
                g.append('circle')
                    .attr('cx', cx)
                    .attr('cy', cy)
                    .attr('r', 10)
                    .attr('fill', `none`)
                    .attr('class', key)
    
                    .on('mouseover', function(event) {
                        let circle = d3.select(this)
                        let targetClass = circle.attr('class')
                        if (targetClass == 'top-left' || targetClass == 'bot-right') {
                            circle.style("cursor", "se-resize")
                        } else {
                            circle.style("cursor", "sw-resize")
                        }
                    })
    
                    .call(d3.drag().on('drag', function(event) {
                            let circle = d3.select(this)
                            let targetClass = circle.attr('class')
                            let g = d3.select(this.parentNode)
                            let sameCxCircle = g.select(`.${cornerMap[targetClass].sameCx}`)
                            let sameCyCircle = g.select(`.${cornerMap[targetClass].sameCy}`)
                            let rect = g.select('rect')
                            let x = event.x
                            let y = event.y
    
                            if (!oppositeCorner) {
                                oppositeCorner = cornerMap[targetClass].opposite
                                oppositeCircle = g.select(`.${oppositeCorner}`)
                                oppositeCx = oppositeCircle.attr('cx')
                                oppositeCy = oppositeCircle.attr('cy')
                            }
    
                            rect.attr('x', Math.min(oppositeCx, x)).attr('y', Math.min(oppositeCy, y)).attr('width', Math.abs(oppositeCx - x)).attr('height', Math.abs(oppositeCy - y))
    
    
                            circle.attr('cx', x).attr('cy', y)
                            sameCxCircle.attr('cx', x)
                            sameCyCircle.attr('cy', y)
                        })
                        .on('end', function(event) {
                            oppositeCorner = null
    
                        }))
            }
    
            if (endX && endY) {
    
                let rect = g.append('rect')
                    .attr('x', Math.min(startX, endX))
                    .attr('y', Math.min(startY, endY))
                    .attr('width', Math.abs(endX - startX))
                    .attr('height', Math.abs(endY - startY))
                    .attr('stroke', '#53DBF3')
                    .attr('stroke-width', 6)
                    .attr('fill', `rgba(0,0,255, 0.05)`)
                    .style("cursor", "pointer")
                    .on('click', function() {
                        g = d3.select(this.parentNode)
                        let circles = g.selectAll('circle').attr('fill', 'red')
                    })
            }
    
    
    
            drawing = false
            startPoint.splice(0)
            endX = null, endY = null
    })


}
export{
    drawRectangle
}