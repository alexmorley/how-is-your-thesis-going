d3.text("data.csv", function(data) {
  var parsedCSV = d3.csv.parseRows(data);

  var container = d3.select("body")
    .append("table")

    .selectAll("tr")
    .data(parsedCSV).enter()
    .append("tr")

    .selectAll("td")
    .data(function(d) { return d; }).enter()
    .append("td")
    .text(function(d) { return d; });
});
// basic SVG setup
var margin = { top: 20, right: 100, bottom: 40, left: 100 };
var height = 300 - margin.top - margin.bottom;
var width = 600 - margin.left - margin.right;
//
var svg = d3.select("body").append("svg")
.attr("width",width + margin.left + margin.right)
.attr("height",height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
// set the line attributes
var line = d3.svg.line()
  //.interpolate("basis")
.x(function(d) { return 100*d.index })
  .y(function(d) { return height+(-0.025*d.value) });
  //
  d3.csv("data.csv", function(d) {
    //console.log(d);
    return d
  },
  function (err,data) {
    var labels = Object.keys(data[0]).slice(1,Object.keys(data[0]).length-1);
    var data_r = labels.map(function(el,i,arr) {
      return {
        id: el,
        id_index: i,
        values: data.map(function(d_el,d_i,d_arr) {
          return {
            index: d_i,
            date: d_el["date"],
            value: d_el[el]
          }
        })
