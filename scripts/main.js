var proxy = "https://cors-anywhere.herokuapp.com/";
var fave_storage = [];

window.addEventListener("load", function() {

    if (this.navigator.geolocation) {

        this.navigator.geolocation.getCurrentPosition(function(position) {

            var long = position.coords.longitude;
            var lat = position.coords.latitude;

            console.log(long, lat);
        });
    }

    var api;

    var yellow_line_counter = 0;
    var yellow_line_el;

    var green_line_counter = 0;
    var green_line_el;

    var purple_line_counter = 0;
    var purple_line_el;

    var station_name;

    document.getElementById("yellow-line-button").onclick = function(event) {

        if (yellow_line_counter == 0) {

            for (var i = 0; i < yellow_line.length; i++) {

                yellow_line_el = document.createElement("li");
                yellow_line_el.innerHTML = yellow_line[i];
                document.getElementById("stations-list").appendChild(yellow_line_el);

                yellow_line_el.addEventListener("click", append_name, false);
            }

            this.style.backgroundColor = "#e6e600";
            this.style.color = "#000";

            yellow_line_counter = 1;
        
        } else if (yellow_line_counter == 1) {

            document.getElementById("stations-list").innerHTML = "";

            this.style.backgroundColor = "transparent";
            this.style.color = "#fff";

            yellow_line_counter = 0;
        }
    }

    document.getElementById("green-line-button").onclick = function(event) {

        if (green_line_counter == 0) {

            for (var i = 0; i < green_line.length; i++) {

                green_line_el = document.createElement("li");
                green_line_el.innerHTML = green_line[i];
                document.getElementById("stations-list").appendChild(green_line_el);

                green_line_el.addEventListener("click", append_name, false);

            }

            this.style.backgroundColor = "#00661a";

            green_line_counter = 1;
        
        } else if (green_line_counter == 1) {

            document.getElementById("stations-list").innerHTML = "";
            this.style.backgroundColor = "transparent";

            green_line_counter = 0;
        }
    }

    document.getElementById("purple-line-button").onclick = function(event) {

        if (purple_line_counter == 0) {

            for (var i = 0; i < purple_line.length; i++) {

                purple_line_el = document.createElement("li");
                purple_line_el.innerHTML = purple_line[i];
                document.getElementById("stations-list").appendChild(purple_line_el);

                purple_line_el.addEventListener("click", append_name, false);

            }

            this.style.backgroundColor = "#9370db";
            this.style.color = "#fff";

            purple_line_counter = 1;
        
        } else if (purple_line_counter == 1) {

            document.getElementById("stations-list").innerHTML = "";

            this.style.backgroundColor = "transparent";
            this.style.color = "#fff";

            purple_line_counter = 0;
        }
    }

    function append_name(event) {

        if (event.target.textContent == "bloor-yonge") {

            station_name = event.target.textContent;
            
        } else {

            station_name = event.target.textContent.replace(/[^a-zA-Z0-9]/g,'_');
        }

        api = `${proxy}https://myttc.ca/${station_name}_station.json`;

        console.log(station_name);

        show_data();
    }
    

    function show_data() {

        document.getElementById("bus-list").innerHTML = "";
        
        this.fetch(api)

        .then(function(data) {

            return data.json();
        })

        .then(function(data) {
            console.log(data);
            console.log(data.stops[0].routes);

            var bus_name;

            for (var q = 0; q < data.stops.length; q++) {

                for (var z = 0; z < data.stops[q].routes.length; z++) {

                    var routes = document.createElement("li");
                    routes.innerHTML += data.stops[q].routes[z].name;
                    routes.addEventListener("click", bus_times, false);
                    document.getElementById("bus-list").appendChild(routes);
                }
            } 

            function bus_times(event) {

                document.getElementById("bus-times-list").innerHTML = "";

                bus_name = event.target.textContent;
                console.log(bus_name);

                for (var v = 0; v < data.stops.length; v++) {

                    for (var c = 0; c < data.stops[v].routes.length; c++) {

                        if (data.stops[v].routes[c].name.indexOf(bus_name) > -1) {

                            var actual_bus = data.stops[v].routes[c].stop_times;
                            console.log("found");
                            console.log(actual_bus);
                            
                            for (var w = 0; w < data.stops[v].routes[c].stop_times.length; w++) {

                                var bus_times = data.stops[v].routes[c].stop_times[w].departure_time;
                                console.log(bus_times);
                                var bust_times_el = document.createElement("li");
                                bust_times_el.innerHTML += bus_times;
                                document.getElementById("bus-times-list").appendChild(bust_times_el);
                            }

                        } else {
                            console.log("not found");
                        }
                    }
                }

                $("#bus-times").animate({left: "0%"}, 500);
            }
        }) 

        $("#bus-routes").delay(500).fadeIn(500);
    }
});

$("button").on("click", function() {
    $("#intro-text").fadeOut(100);
})

$("#close-button").on("click", function() {
    $("#bus-routes").fadeOut(500);

    window.location.reload();
});

$("#bus-times h3").on("click", function() {
    $("#bus-times").animate({left: "100%"}, 500);
});