import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getSavedItineraries } from "../providers/ItineraryProvider"

export const Directions = () => {
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
        <div className="bg-yellow-200 m-20 p-10 rounded">
            <h1 className="text-center text-4xl m-10">Saved Itineraries</h1>
            <div className="text-center  ml-auto mr-auto">
            {
                savedItineraries.map(savedItinerary => <> 
                <div className="flex row justify-evenly p-1 pb-2 text-2xl">
                <Link to={`/directions/details/${savedItinerary.id}`}><p>{savedItinerary?.name}</p></Link> 
                </div>
                 </>)
            }
        </div>
        </div>
    </article>
    </>
}