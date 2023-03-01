import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getSavedItineraries } from "../providers/ItineraryProvider"
import { SavedItineraryDetails } from "./SavedItineraryDetails"

export  const SavedItineraries = () => {
    const [savedItineraries, setSavedItineraries] = useState([])

    useEffect(
        () => {
            getSavedItineraries().then((savedItinerariesArray) => {
                setSavedItineraries(savedItinerariesArray)
            })
        }, []
    )
    return <>
    <article>
        <div>
            <h1>Saved Itineraries</h1>
            {
                savedItineraries.map(savedItinerary =>  <Link to={`/savedItineraries/details/${savedItinerary.id}`}>
                    <p>{savedItinerary?.name}</p>
                </Link> )
            }
        </div>
    </article>
    </>
}