const Parks = 'https://developer.nps.gov/api/v1/parks?api_key=1pax9zKhWlQ9j4gQqWOa6AwQWcz8GqtEmYD88nxo&limit=100'

export const Events = (parkCode) => {
    return fetch(`https://developer.nps.gov/api/v1/events?api_key=1pax9zKhWlQ9j4gQqWOa6AwQWcz8GqtEmYD88nxo&parkCode=${parkCode}&pageSize=756`)
    .then(response => response.json())
}



export const getAllParks = () => {
    return fetch(`${Parks}`) 
        .then(response => response.json())
    
}
export const findParks = (itinerary, parks) => {
    let parksArray = parks.filter((park) => (
        itinerary.nationalParkIds.includes(park.parkCode)
    ))
    return parksArray
}

export const getParksByIds = (parkIds) => {
    return fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${parkIds}&api_key=1pax9zKhWlQ9j4gQqWOa6AwQWcz8GqtEmYD88nxo`)
    .then(response => response.json())
}