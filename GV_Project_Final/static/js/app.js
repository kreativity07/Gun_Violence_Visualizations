var colors = [ '#FF3364', '#33FFA8', '#FF9033', '#5C308C', 
'#A640A2', '#E76CAC', '#FFC2C7',
'#F0FF33', '#33FFFC', '#F333FF', 
'#F6FF33', '#1F201E', '#7CDD1C', 
'#0B379C'];


var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var map = null;

function buildCharts(state) {

  var state_location = {'Arizona': [32.8854, -111.757], 'Texas': [29.2733, -98.0564], 'Mississippi': [31.4109, -90.4609], 'Florida': [25.9443, -80.1981], 'Wisconsin': [44.90, -89.612], 'California': [38.5839, -121.523], 'New Jersey': [40.9171, -74.1469], 'Virginia': [37.2688, -82.1811]};

  if (map) 
  map.remove();

  // We create the map object with options.
   map = L.map("mapid", {
    center: state_location[state],
    zoom: 7
  });
  
  // Then we add our 'graymap' tile layer to the map.
  graymap.addTo(map);
  
  console.log(state);

  var url = `/stack/${state}`;
  d3.json(url, function(err, data) {
    if (err) throw err;

    console.log(data.length);
    for (i=0; i<data.length; i++){

    

      if (i<10)
    
   console.log(data[i].lat + " " + data[i].lon + " " + data[i].count + " " + data[i].state);

    // for (i=0; i<1; i++){
    
    // }
      chipIcons = [];
      for (j=0; j<data[i].count; j++){

        //console.log(j);
        
        chipIcons.push(L.icon.chip({
          color: colors[j]
        }));
      }

      point = [];
      point.push(data[i].lat);
      point.push(data[i].lon);
      var stack = L.marker.stack(point, {
        icons: chipIcons,
        stackOffset: [0, -5]
      });
    
      map.addLayer(stack);
      
    }

  });

};

function SelectState(state) {
  // console.log(state);
  buildCharts(state);
}

function init() {

  var state = "Arizona";

  buildCharts(state);
}

init();

