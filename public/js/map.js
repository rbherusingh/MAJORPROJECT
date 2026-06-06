maptilersdk.config.apiKey = mapToken;

const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.STREETS,
    center: [73.7125, 24.5854], // default
    zoom: 9
});


fetch(`https://api.maptiler.com/geocoding/${encodeURIComponent(listingLocation)}.json?key=${mapToken}`)
    .then(res => res.json())
    .then(data => {
        if (data.features && data.features.length > 0) {
            const coords = data.features[0].geometry.coordinates; 
            
            map.setCenter(coords);
            map.setZoom(10);

            new maptilersdk.Marker({ color: 'red' })
                .setLngLat(coords)
                .setPopup(new maptilersdk.Popup().setHTML(`<b>${listingTitle}</b><br>${listingLocation}`))
                .addTo(map);
        }
    })
    .catch(err => console.log("Geocoding error:", err));

new maptilersdk.Marker({ color: 'red' })
    .setLngLat(coords)
    .setPopup(new maptilersdk.Popup().setHTML(`<b>${listingTitle}</b><br>${listingLocation}`))
    .addTo(map)
    .togglePopup(); // ← yeh add karo — page load pe popup open rahega