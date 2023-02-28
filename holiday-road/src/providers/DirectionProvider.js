export const Geocoding = (city) => {
    return fetch(`https://graphhopper.com/api/1/geocode?q=${city}&key=7eec464a-0db4-49e0-bba6-6bc40c2b72b6`)
    .then(response => response.json())
}

export const LocationHTTPS = (geoCode) => {
    let httpString = `&point=${geoCode.hits[0].point.lat},${geoCode.hits[0].point.lng}`
    return httpString
}

export const Directions = (httpString) => {
    return fetch(`https://graphhopper.com/api/1/route?point=36.1627,-86.7816${httpString}&profile=car&locale=en&instructions=true&key=7eec464a-0db4-49e0-bba6-6bc40c2b72b6`)
    .then(response => response.json())
    }

export const Instructions = (instructionsObject) => {
    const instructionsArray = instructionsObject.paths[0].instructions 
    let html = '<h2> Directions For Selected Roadtrip</h2><ol>'
    instructionsArray.map((instruction) => {
        return html += `<li>${instruction.text}</li>`
    })
    html += '</ol>'
    return html
}

export const LocationsMap = (eateriesArray, attractionsArray, parksArray) => {
    let geoCodePromises = []
    let httpString = ''

    attractionsArray.map((attraction) => {
        geoCodePromises.push(Geocoding(attraction.city)) 
    })    
    eateriesArray.map((eatery) => {
       geoCodePromises.push(Geocoding(eatery.city))
    })
    parksArray.map((park) => {
        console.log(park)
        geoCodePromises.push(Geocoding(park.addresses[0].city))
     })

    return Promise.all(geoCodePromises).then(
        (geoCodes) => {
            for (const geoCode of geoCodes) {
                httpString += LocationHTTPS(geoCode)
            }
            return httpString
        }
    )
    
    
}