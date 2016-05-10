$(document).ready(function () {
    var map = new L.Map('map'),
        osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        osm = new L.TileLayer(osmUrl, {minZoom: 16, maxZoom: 19, attribution: osmAttrib}),
        routePoints, polyline;

    routePoints = [[55.76001487184612, 37.66180336475372], [55.760500822491295, 37.66220569610596], [55.76092036507179, 37.662511467933655], [55.76121011846339, 37.662768959999084], [55.76128859296976, 37.662774324417114], [55.761816782653945, 37.66315519809723], [55.76221216567806, 37.663477063179016], [55.76233289252006, 37.6629889011383], [55.76266488940824, 37.66180336475372], [55.76310251735103, 37.66039788722992], [55.76320211474844, 37.660489082336426], [55.763229277630856, 37.660526633262634], [55.76328360333893, 37.66070902347565], [55.76358842951918, 37.66169607639313], [55.76366991730232, 37.66161561012268]];

    map.setView(new L.LatLng(55.76187, 37.66195), 16);
    map.addLayer(osm);
    L.marker([55.76367, 37.66148], {}).addTo(map);

    polyline = L.polyline(routePoints, {
        color: '#337AB7',
        weight: 3,
        opacity: 1
    }).addTo(map);
    L.polylineDecorator(polyline, {
        patterns: [
            {
                offset: 25,
                repeat: 80,
                symbol: L.Symbol.arrowHead({
                    pixelSize: 25, headAngle: 30, pathOptions: {
                        fillOpacity: 1,
                        opacity: 1,
                        color: '#337AB7',
                        fillColor: '#ffffff',
                        weight: 2
                    }
                })
            }
        ]
    }).addTo(map);
});