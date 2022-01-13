import { axisTop, create, extent, range, scaleBand, scaleLinear } from 'd3';
import { getFormatDate } from './dates';

const BarChart = {
    max: null,
    min: null,
    x: null,
    y: null,
    svg: null,
    bar: null,
};

BarChart.init = function( root, { data, margin, width } ) {

    const [min, max] = extent( data, d => d.price );
    this.min = min / 3;
    this.max = max * 1.3;

    this.createAxes( data, width, margin );
    this.createSVG( root, width, margin );
    this.createChart( data, margin );
    this.showAxes(margin);

}

BarChart.createSVG = function( rootEl, width, margin ) {

    const height = this.y.range()[1] + margin.top + margin.bottom;

    this.svg = create("svg")
      .attr("width", width - margin.right - margin.left)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("font-size", "10")
      .attr("text-anchor", "end");

      rootEl.append( this.svg.node() );
}

BarChart.createAxes = function( data, width, margin ) {

    this.x = scaleLinear()
        .domain([this.min, this.max])
        .range([0, width - margin.right])

    const barThick = 35;
    this.y = scaleBand()
        .domain( range( data.length ) )
        .range([0, barThick * data.length])
}

BarChart.createChart = function(data, margin ) {

    this.bar = this.svg.selectAll("g")
      .data(data)
      .join("g")
        .attr("transform", (d, i) => `translate(0,${this.y(i) + margin.top})`);

    this.bar.append("rect")
        .attr("class", "fill-lime-200")
        .attr("width", d => this.x( d.price ))
        .attr("height", this.y.bandwidth() - 3);

    // mostrar precio
    this.bar.append("text")
        .attr("class", "text-lime-600 font-bold text-xl")
        .attr("x", d => this.x( d.price ) - 10)
        .attr("y", (this.y.bandwidth() - 1) / 2)
        .attr("dy", "0.35em")
        .text(d => d.price);

    // mostrar Fecha
    this.bar.append("text")
        .attr("class", "text-warmGray-600 text-sm transform translate-x-14")
        .attr("x", d => this.x(d.price) + 10)
        .attr("y", (this.y.bandwidth() - 1) / 2)
        .attr("dy", "0.35em")
        .text(d => getFormatDate( d.date ));

    // mostrar establecimiento
    this.bar.append("text")
        .attr("class", "text-lime-700 text-sm")
        .attr("x", this.x( this.min ) + 5)
        .attr("y", (this.y.bandwidth() - 1) / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "start")
        .text(d => d.establishmentName );
}

BarChart.showAxes = function(margin) {
    // x
    this.svg.append("g")
        .attr("transform", `translate(0,${margin.top})`)
        .call( axisTop( this.x ).ticks(5) );
}


export default BarChart;