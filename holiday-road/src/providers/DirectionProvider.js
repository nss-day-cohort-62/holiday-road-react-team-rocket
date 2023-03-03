export const Geocoding = (city) => {
    return fetch(`https://graphhopper.com/api/1/geocode?q=${city}&limit=1&key=7eec464a-0db4-49e0-bba6-6bc40c2b72b6`)
    .then(response => response.json())
}

export const LocationHTTPS = (geoCode) => {
    let httpString = `&point=${geoCode.hits[0].point.lat},${geoCode.hits[0].point.lng}`
    return httpString
}



export const LocationsMap = (eateriesArray, attractionArray, parksArray) => {
    let geoCodePromises = []
    console.log(eateriesArray)
    console.log(attractionArray)
    console.log(parksArray)
    
    if(attractionArray) {
        attractionArray.map((attraction) => {
            geoCodePromises.push(Geocoding(attraction?.city)) 
        })    
    }
    if(eateriesArray) {
        eateriesArray.map((eatery) => {
            geoCodePromises.push(Geocoding(eatery?.city))
        })
    }
    if(parksArray) {
        parksArray.map((park) => {
            geoCodePromises.push(Geocoding(park?.addresses?.city))
         })
    }

    return Promise.all(geoCodePromises).then(
        (geoCodes) => {
            console.log(geoCodes)
            return geoCodes
        }
    )
    }
    
