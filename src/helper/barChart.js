import { axisTop, create, extent, range, scaleBand, scaleLinear } from 'd3';
import { getFormatDate } from './dates';

const BarChart = {
    max: null,
    min: null,
    x: null,
    y: null,
    svg: null,
    bar: null,
    barThick: 35,
    barGap: 5,
};

BarChart.init = function( root, { data, prop, margin, width, barThick } ) {

    const [min, max] = extent( data, d => d[prop] );
    this.min = min / 10;
    this.max = max * 1.3;

    this.barThick = barThick || this.barThick;

    this.createAxes( data, width, margin );
    this.createSVG( root, width, margin );
    this.createChart( data, margin, prop );
    this.showAxes(margin);

}

BarChart.createSVG = function( rootEl, width, margin ) {

    const height = this.y.range()[1] + margin.top + margin.bottom;
    const w = width - margin.right - margin.left

    this.svg = create("svg")
      .attr("width", w)
      .attr("height", height)
      .attr("viewBox", [0, 0, w, height])
      .attr("font-size", "10")
      .attr("class", "mx-auto")
      .attr("text-anchor", "start");

      rootEl.append( this.svg.node() );
}

BarChart.createAxes = function( data, width, margin ) {

    this.x = scaleLinear()
        .domain([this.min, this.max])
        .range([0, width - margin.right])

    this.y = scaleBand()
        .domain( range( data.length ) )
        .range([0, ( (this.barThick + ( 2 * this.barGap )) * data.length )])
}

BarChart.createChart = function(data, margin, prop ) {

    this.bar = this.svg.selectAll("g")
      .data(data)
      .join("g")
        .attr("transform", (d, i) => `translate(0,${margin.top + this.y(i) + ( 0 * this.barGap )})`);

    this.bar.append("rect")
        .attr("class", "fill-warmGray-200")
        .attr("fill-opacity", 0.5)
        .attr("width", d => this.x( d[prop] ))
        .attr( "height", this.y.bandwidth() - this.barGap);

    // mostrar precio
    this.bar.append("text")
        .attr("class", "fill-warmGray-800 font-semibold text-lg")
        .attr("x", d => this.x( d[prop] ) + 15)
        .attr("y", (this.y.bandwidth() - 1) / 2)
        .attr("dy", "0.35em")
        .text(d => d[prop]);

    // mostrar Fecha
    this.bar.append("text")
        .attr("class", "fill-warmGray-500 text-xs")
        .attr("x", d => this.x( this.min ) + 4 )
        .attr("y", ( this.y.bandwidth() - this.barGap ))
        .attr("dy", "-0.3em")
        .text(d => getFormatDate( d.date ));

    // mostrar establecimiento
    this.bar.append("text")
        .attr("class", "fill-lime-500 text-xs font-semibold")
        .attr("x", this.x( this.min ) + 4)
        .attr("y", ( 6 ))
        .attr("dy", "0.5em")
        .text(d => d.establishmentName );
}

BarChart.showAxes = function(margin) {
    // x
    this.svg.append("g")
        .attr("transform", `translate(0,${margin.top})`)
        .call( axisTop( this.x ).ticks(5) );
}


export default BarChart;