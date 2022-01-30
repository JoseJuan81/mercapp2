import { axisTop, create, extent, range, scaleBand, scaleLinear, scaleOrdinal, schemePaired } from 'd3';

const BarChart = {
    max: null,
    min: null,
    x: null,
    y: null,
    svg: null,
    bar: null,
};

BarChart.init = function( root, { data, prop, margin, width } ) {

    const [min, max] = extent( data, d => d[prop] );
    this.min = min / 5;
    this.max = max * 1.2;

    this.createAxes( data, width, margin );
    this.createSVG( root, width, margin );
    this.createChart( data, margin, prop );
    this.showAxes(margin);

}

BarChart.createSVG = function( rootEl, w, margin ) {

    const height = this.y.range()[1] + margin.top + margin.bottom;
    const width = w - margin.left - margin.right;

    this.svg = create("svg")
      .attr("width", width )
      .attr("height", height )
      .attr("viewBox", [0, 0, width, height])
      .attr("font-size", "10")
      .attr("class", "mx-auto")
      .attr("text-anchor", "start");

      rootEl.append( this.svg.node() );
}

BarChart.createAxes = function( data, width, margin ) {

    this.x = scaleLinear()
        .domain([this.min, this.max])
        .range([0, width - margin.right - margin.left])

    const barThick = 45;
    this.y = scaleBand()
        .domain( range( data.length ) )
        .range([0, barThick * data.length])
        .padding(0.1)
}

BarChart.createChart = function(data, margin, prop ) {

    this.bar = this.svg.selectAll("g")
      .data(data)
      .join("g")
        .attr("transform", (d, i) => `translate(0,${this.y(i) + margin.top })`);

    this.bar.append("rect")
        .attr("fill", scaleOrdinal( schemePaired ) )
        .attr("fill-opacity", 0.5)
        .attr("width", d => this.x( d[prop] ))
        .attr( "height", this.y.bandwidth() - 1 );

    // mostrar total
    this.bar.append("text")
        .attr("class", "fill-warmGray-800 font-semibold text-lg")
        .attr("x", d => this.x( this.min ) )
        .attr("y", (this.y.bandwidth() - 1) / 2)
        .attr("dy", "0.65rem")
        .attr("dx", "0.25rem")
        .text(d => d[prop]);

    // mostrar nombre
    this.bar.append("text")
        .attr("class", "fill-warmGray-800 text-sm font-semibold")
        .attr("x", this.x( this.max ) )
        .attr("y", ( 8 ))
        .attr("dy", "0.4rem")
        .attr("text-anchor", "end")
        .text(d => d.name );

    // mostrar establecimiento
    this.bar.append("text")
        .attr("class", "fill-warmGray-600 text-xs")
        .attr("x", this.x( this.max ) )
        .attr("y", ( 8 ))
        .attr("dy", "1.3rem")
        .attr("text-anchor", "end")
        .text(d => d.establishmentName );
}

BarChart.showAxes = function(margin) {
    // x
    this.svg.append("g")
        .attr("transform", `translate(0,${ margin.top })`)
        .call( axisTop( this.x ).ticks(5) );
}


export default BarChart;