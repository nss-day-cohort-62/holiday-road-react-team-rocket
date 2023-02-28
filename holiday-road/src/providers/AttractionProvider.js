const Attractions = 'http://holidayroad.nss.team/bizarreries'


export const getAttractions = () => {
    return fetch(`${Attractions}`) 
        .then(response => response.json())     
}

export const findAttractions = (itinerary, attractions) => {
    let attractionsArray = attractions.filter((attraction) => (
        itinerary.attractionIds.includes(attraction.id)
    ))
    return attractionsArray
}