function Marker(poiData) {

    this.poiData = poiData;

        // create the AR.GeoLocation from the poi data
    var markerLocation = new AR.GeoLocation(poiData.latitude, poiData.longitude, poiData.altitude);

    // create an AR.ImageDrawable for the marker in idle state
    this.markerDrawable = new AR.ImageDrawable(World.markerDrawable, 1.2, {
        zOrder: 0,
        opacity: 1.0,
    });

    // create an AR.Label for the marker's title 
    this.titleLabel = new AR.Label(poiData.title.trunc(9), 0.3, {
        zOrder: 1,
        offsetY: 0.25,
        style: {
            textColor: '#FFFFFF',
            fontStyle: AR.CONST.FONT_STYLE.BOLD
        }
    });

    // create an AR.Label for the marker's description
    this.descriptionLabel = new AR.Label(poiData.description.trunc(15), 0.3, {
        zOrder: 1,
        offsetY: -0.25,
        style: {
            textColor: '#FFFF00',
        }
    });

    // create the AR.GeoObject with the drawable objects
    this.markerObject = new AR.GeoObject(markerLocation, {
        drawables: {
            cam: [this.markerDrawable, this.markerDrawable, this.titleLabel, this.descriptionLabel]
        }
    });

    return this;
}

String.prototype.trunc = function(n) {
    return this.substr(0, n - 1) + (this.length > n ? '...' : '');
};