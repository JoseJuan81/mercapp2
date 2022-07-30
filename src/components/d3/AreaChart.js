import {
	area,
	axisBottom,
	curveCatmullRom,
	easeLinear,
	extent,
	max,
	scaleLinear,
	scaleUtc,
	select,
	timeFormat,
	transition
} from 'd3';
import React, { useEffect } from 'react';

/**
 * 
 * @description Gráfico que muestra acumulado de los últimos 3 meses
 */
export const AreaChart = ({ lastAmountsByMonth, heightContainer = 80, className, width = 208 }) => {

	// VARIABLES LOCALES
	const data = [...lastAmountsByMonth];
	const margin = ({ left: 10, top: 5, right: 10, bottom: 20 });
	const h = heightContainer - margin.bottom;
	const initialPath = `${width},${h} ${width / 2},${h} ${width / 4},${h} ${width / 4},${h}`

	const x = scaleUtc()
		.domain(extent(data, d => (new Date(d.date))))
		.range([margin.left, width - margin.right])
		.nice();

	const y = scaleLinear()
		.domain([0, max(data, d => d.amount)])
		.range([heightContainer - margin.bottom, margin.top])
	
	const dArea = area()
		.curve(curveCatmullRom.alpha(0.5))
		.x(d => x(new Date(d.date) ))
		.y0(y(0))
		.y1(d => y(d.amount))
  
	const formatTime = timeFormat("%B, %Y");
  
  	useEffect(() => {
		const svg = select("#area_chart--container")
			.attr("width", "100%")
			.attr("height", heightContainer);
		
		const g = svg.select("#curve")
			.attr("transform", "translate(" + [0, 0] + ")")

		const path = g.selectAll("path")
			.data([1])
			.join(
				enter => enter.append("path")
					.attr("d", initialPath)
					.attr("fill", "#A3C6EA")
					.attr("stroke","#2186F1")
					.attr("stroke-width", "2")
					.attr("stroke-miterlimit", "1"),
				update => update,
				exit => exit.remove()
			)
		path.call( path => path.transition().duration(300).delay(400)
			.attr("d", dArea(data))
		)

		const xAxis = svg.select("#scale")
			.attr("transform", "translate(" + [0, heightContainer - margin.bottom] + ")")
			.attr("stroke", "#2186F1")
			.attr("stroke-width", "0.5")
			.attr("stroke-miterlimit", "1")
		xAxis.call(axisBottom(x).ticks(width / 60).tickSizeOuter(0).tickFormat(formatTime))
		
		const circle = svg.select("#circles")
		circle.selectAll("circle")
			.data(data, d => d.date)
			.join(
				enter => enter.append("circle")
					.attr("cx", width / 2)
					.attr("cy", heightContainer)
					.attr("r", 5)
					.attr("fill", "white")
					.attr("stroke", "#2186F1"),
				update => update,
				exit => exit
			)
			.call( circle => circle.transition().duration(400).delay(400)
				.attr("cy", d => y(d.amount))
				.attr("cx", d => x((new Date(d.date))))
				.attr("r", 3	)
			)
				

	}, [lastAmountsByMonth])

	return (
		<svg id="area_chart--container" className={ className }>
			<g id="curve"></g>
			<g id="scale"></g>
			<g id="circles"></g>
		</svg>
	)
}
