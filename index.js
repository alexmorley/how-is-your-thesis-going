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
		.text(function(d) { return d; })
		.attr("class", function(d) { return d; });
});
// basic SVG setup
var margin = { top: 20, right: 100, bottom: 40, left: 100 };
var height = 300 - margin.top - margin.bottom;
var width = 1000 - margin.left - margin.right;
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
.x(function(d) {
  let zero_date = new Date(..."2019-03-26-00-00".split("-"))
  let date = d.date;
  var microSecondsDiff = date.getTime() - zero_date.getTime();
  var hoursDiff = Math.floor(microSecondsDiff/(1000 * 60 * 60 ));
  console.log(hoursDiff,"   ", d.index*20);

  return hoursDiff/3.5
})
	.y(function(d) { 
    if(d.parent_.id == 'Number-Figures') { 
      return height+(-3*d.value)
    } else {  
      return height+(-0.025*d.value)
    }
  });
	//
	d3.csv("data.csv", function(d) {
		return d
	},
	function (err,data) {
		var labels = Object.keys(data[0]).slice(1,Object.keys(data[0]).length);
    console.log(labels);
		var data_r = labels.map(function(el,i,arr) {
      let parent_ = {
				id: el,
				id_index: i
      }
      parent_.values = data.map(function(d_el,d_i,d_arr) {
				return {
          id_index: i,
					index: d_i,
					date: new Date(...d_el["Date"].split("-")),
					value: d_el[el],
          parent_: parent_
				}
			})
      return parent_
		})
		stock = svg.selectAll(".stockXYZ")
			.data(data_r)
			.enter().append("g")
			.attr("class",function(d) {return d.id});
		// add the stock price paths
		stock.append("path")
			.attr("class","line")
			.attr("id",function(d,i){ return "id" + i; })
			.attr("d", function(d) {
				return line(d.values); 
			})
		.style("stroke", function(d) { 
      var r = 255-(30*d.id_index);
      var g = (30*d.id_index);
      //return "rgb("+r+","+g+",0)" 
      return "";
    } ) //return {r: 70, g: 130, b: 180, opacity: 1}; });
    .style("stroke-width", function(d) { 
      if(d.id == 'Number-Figures') {
        return "2.5";
      } else {
        return "1.5";
      }
    });
})
