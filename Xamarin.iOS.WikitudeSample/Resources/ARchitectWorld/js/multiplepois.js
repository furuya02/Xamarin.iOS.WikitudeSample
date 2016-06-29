// implementation of AR-Experience (aka "World")
var World = {

	initiallyLoadedData: false,// データロードは１回のみ

	markerDrawable: null,

	markerList: [],
	loadPoisFromJsonData: function loadPoisFromJsonDataFn(poiData) {
		World.markerList = [];

		World.markerDrawable = new AR.ImageResource("assets/marker.png");

        for (var currentPlaceNr = 0; currentPlaceNr < poiData.length; currentPlaceNr++) {
			var singlePoi = {
				"id": poiData[currentPlaceNr].id,
				"latitude": parseFloat(poiData[currentPlaceNr].latitude),
				"longitude": parseFloat(poiData[currentPlaceNr].longitude),
				"altitude": parseFloat(poiData[currentPlaceNr].altitude),
				"title": poiData[currentPlaceNr].name,
				"description": poiData[currentPlaceNr].description
			};
			World.markerList.push(new Marker(singlePoi));
		}
	},

	locationChanged: function locationChangedFn(lat, lon, alt, acc) {
        if (!World.initiallyLoadedData) {
			World.requestDataFromLocal(lat, lon);
			World.initiallyLoadedData = true;
		}
	},

	requestDataFromLocal: function requestDataFromLocalFn(centerPointLatitude, centerPointLongitude) {
		var poisToCreate = 10;
		var poiData = [];

        for (var i = 0, length = jsonData.length; i < length; i++) {
            var distance = World.getDistance(jsonData[i].latitude, centerPointLatitude, jsonData[i].longitude, centerPointLongitude);
            var distanceString = (distance > 999) ? ((distance / 1000).toFixed(2) + " km") : (Math.round(distance) + " m");

            poiData.push({
                         "longitude":   (jsonData[i].longitude),
                         "latitude":    (jsonData[i].latitude),
                         "altitude":    50.0 +  Math.floor( Math.random() * 11 ) *5, // 標高については、とりあえず50mを基準と、ランダムに重ならないよいうにしました
                         "description":  (distanceString),
                         "name": (jsonData[i].name)
                         });

		}
		World.loadPoisFromJsonData(poiData);


	},
	//この距離を求めるメソッドは、下記を参照させて頂きました。
	//http://www.buildinsider.net/pr/grapecity/wikitude/02
    getDistance: function (targetLatitude, centerPointLatitude, targetLongtitude, centerPointLongitude) {
        // 参考：http://www.movable-type.co.uk/scripts/latlong.html
        var Δφ = (centerPointLatitude - targetLatitude) * Math.PI / 180;
        var Δλ = (centerPointLongitude - targetLongtitude) * Math.PI / 180;
        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(targetLatitude * Math.PI / 180) * Math.cos(centerPointLatitude * Math.PI / 180) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return 6371e3 * c
    },

};

AR.context.onLocationChanged = World.locationChanged;
