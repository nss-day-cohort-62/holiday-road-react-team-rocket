import { MapMarker } from "../directions/DirectionDetails"
import { getAttractionsByIds } from "./AttractionProvider"
import { getEateriesByIds } from "./EateryProvider"
import { getParksByIds } from "./ParkProvider"

export const Geocoding = (city) => {
    return fetch(`https://graphhopper.com/api/1/geocode?q=${city}&key=7eec464a-0db4-49e0-bba6-6bc40c2b72b6`)
    .then(response => response.json())
}

export const LocationHTTPS = (geoCode) => {
    let httpString = `&point=${geoCode.hits[0].point.lat},${geoCode.hits[0].point.lng}`
    return httpString
}



export const LocationsMap = (eateriesArray, attractionArray, parksArray) => {
    let geoCodePromises = []


    attractionArray.map((attraction) => {
        geoCodePromises.push(Geocoding(attraction[0]?.city)) 
    })    
    eateriesArray.map((eatery) => {
       geoCodePromises.push(Geocoding(eatery[0]?.city))
    })
    parksArray.map((park) => {
        geoCodePromises.push(Geocoding(park?.addresses[0]?.city))
     })

    return Promise.all(geoCodePromises).then(
        (geoCodes) => {
            geoCodes.map((geoCode) => {
                console.log(geoCode)
                MapMarker(geoCode)
            })
        }
    )
    }
    
