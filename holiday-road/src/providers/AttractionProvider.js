const Attractions = 'http://holidayroad.nss.team/bizarreries'

let attractionsState = {}

export const fetchAttractions = () => {
    return fetch(`${Attractions}`) 
        .then(response => response.json())
        .then((attractionsFetched) => {
            attractionsState = attractionsFetched
            console.log(attractionsState)
        }
    )
}

export const getAttractions = () => {
    return attractionsState.map(attraction => ({...attraction}))
}   