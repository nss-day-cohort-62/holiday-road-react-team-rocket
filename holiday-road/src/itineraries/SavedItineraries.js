import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { deleteItinerary } from "../providers/ItineraryProvider"
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
    const deleteButton = (itineraryObject) => {
        
        return <button className="btn btn-accent"
        onClick={()=>{
            deleteItinerary(itineraryObject)
        .then(() => {
            getSavedItineraries()
            .then((savedItinerariesArray) => {
                setSavedItineraries(savedItinerariesArray)
        })
        })}   
        }
        >Delete</button>
            
        }
    return <>
    <article>
        <div className="bg-yellow-200 m-20 p-10 rounded">
            <h1 className="text-center text-4xl m-10">Saved Itineraries</h1>
            <div className="text-center  ml-auto mr-auto">
            {
                savedItineraries.map(savedItinerary => <> 
                <div className="flex row justify-evenly p-1 pb-2 text-2xl">
                <Link to={`/savedItineraries/details/${savedItinerary.id}`}><p>{savedItinerary?.name}</p></Link> 
                {deleteButton(savedItinerary)}
                </div>
                 </>)
            }
        </div>
        </div>
    </article>
    </>
}

