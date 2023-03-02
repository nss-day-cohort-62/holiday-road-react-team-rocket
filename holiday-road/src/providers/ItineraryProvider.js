export const addNewItinerary = (itinerary) => {
    return fetch(`http://localhost:8088/savedItineraries`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
           body: JSON.stringify(itinerary) 
        }).then(
            response => response.json())
}

export const getSavedItineraries = () => {
    return fetch(`http://localhost:8088/savedItineraries`).then(
         response => response.json())
 }

export const getSavedItineraryById = (itineraryId) => {
    return fetch(`http://localhost:8088/savedItineraries/${itineraryId}`)
    .then(res => res.json()) }

export const deleteItinerary = (itinerary) => {
    return fetch(`http://localhost:8088/savedItineraries/${itinerary.id}`, {
        method: "DELETE" 
})}