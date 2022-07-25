import { select } from 'd3';
import React, { useEffect } from 'react'

export const ProgressBar = ({ percentage, heightBar = 10, heightContainer = 30 }) => {

    const data = [100, percentage];
    const uid = Math.random().toString(16).slice(2);

    useEffect(() => {

        const svg = select(`#progress-bar--container__${uid}`)
            .attr("width", "100%")
            .attr("height", heightContainer)
      
        const g = svg.append("g")
            //.attr("transform", 'translate(' + [0, -heightBar/2] + ')');
    
        g.selectAll("rect")
            .data(data)
            .join("rect")
                .attr("x", 0)
                .attr("width", d => `${d}%`)
                .attr("y", heightContainer/2)
                .attr("height", heightBar)
                .attr("rx", heightBar / 2)
                .attr("ry", heightBar / 2)
                .attr("fill", (d, i) => `${ i === 0 ? "lightgray" : "red" }`);
    }, [percentage, heightBar, heightContainer])

  return (
    <svg id={ "progress-bar--container__" + uid }></svg>
  )
}
