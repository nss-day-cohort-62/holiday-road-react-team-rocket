const Eateries = 'http://holidayroad.nss.team/eateries'



export const getEateries = () => {
    return fetch(`${Eateries}`) 
        .then(response => response.json())
        
    
}
export const findEateries = (itinerary, eateries) => {
    let eateriesArray = eateries.filter((eatery) => (
        itinerary.eateryIds.includes(eatery.id)
    ))
    return eateriesArray
}
export const getEateriesByIds = (eateryIds) => {
    return fetch(`http://holidayroad.nss.team/eateries?id=${eateryIds}`)
    .then(response => response.json())
}