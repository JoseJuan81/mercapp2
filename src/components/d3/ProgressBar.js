import { select } from 'd3';
import { cond, constant, stubTrue } from 'lodash';
import React, { useEffect } from 'react'

export const ProgressBar = ({ percentage, heightBar = 7, heightContainer = 30, className }) => {

	// ====== VARIABLES LOCALES ======
    const data = [100, percentage];
    const uid = Math.random().toString(16).slice(2);

	const barColor = cond([
		[p => p <= 25, constant("fill-sky-500")],
		[p => p <= 45, constant("fill-amber-400")],
		[stubTrue, constant("fill-rose-600")],
	])(percentage)

    useEffect(() => {

        const svg = select(`#progress-bar--container__${uid}`)
            .attr("width", "100%")
            .attr("height", heightContainer)
      
        const g = svg.append("g")
    
        g.selectAll("rect")
            .data(data)
            .join(
				enter => enter.append("rect")
					.attr("x", 0)
					.attr("width", 0)
					.attr("y", heightContainer/2)
					.attr("height", heightBar)
					.attr("rx", heightBar / 2)
					.attr("ry", heightBar / 2)
					.attr("class", (d, i) => `${ i === 0 ? "fill-warmGray-200" : barColor }`),
				update => update,
				exit => exit.remove()
			)
			.call( rect => rect.transition().duration(500)
				.attr("width", d => `${d}%`)
			)
        
		g.selectAll("text")
			.data([data[1]])
			.join(
				enter => enter.append("text")
					.attr("y", heightContainer / 2 - 2)
					.attr("x", -30)
					.attr("class", "fill-sky-500 text-xxs italic")
					.text(d => `${d}%`),
				update => update,
				exit => exit.remove()
			)
			.call( text => text.transition().duration(700).delay(200)
				.attr("x", d => d <= 70 ? `${d}%` : '70%')
			)

    }, [percentage, heightBar, heightContainer])

  return (
    <svg id={ "progress-bar--container__" + uid } className={ className }></svg>
  )
}
