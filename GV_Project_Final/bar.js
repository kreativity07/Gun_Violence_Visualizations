function buildCharts(newSample) {

  Plotly.d3.csv("Barchart_file1.csv", (error, data) => {
    if (error) throw error;

    var data = data.filter(r => r.STATE === newSample)
    console.log(data);

    var xdata = [];
    var ydata = [];

    for (let d of data) {
      xdata.push(d.MONTH);
      ydata.push(d.KILLED);
    }



    // Define SVG area dimensions
    var svgWidth = 750;
    var svgHeight = 600;

    // Define the chart's margins as an object
    var chartMargin = {
      top: 30,
      right: 30,
      bottom: 30,
      left: 30
    };

    // // Define dimensions of the chart area
    var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
    var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

    console.log(xdata);
    console.log(ydata);

    var something = [{ x: xdata, y: ydata, type: 'bar', marker: {color: 'rgb(146,143,145)',opacity: 0.8}}];

    var layout = {
      title:'Number of Deaths(By Month) ',
      yaxis: {title: 'Casualties'},
      xaxis: {title: 'Months(Year:2017)'},
      barmode:'relative'
    };
    Plotly.newPlot("mapvis1", something, layout);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  console.log(newSample);
  // Plotly.deleteTraces('mapvis1', 0);
  buildCharts(newSample);
}




function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#stateselect");

  const firstSample = "Arizona";
  buildCharts(firstSample);


}


// Initialize the dashboard
init();