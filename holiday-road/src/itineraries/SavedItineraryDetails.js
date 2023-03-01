import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAttractionsByIds } from "../providers/AttractionProvider"
import { getEateriesByIds } from "../providers/EateryProvider"
import { getSavedItineraryById } from "../providers/ItineraryProvider"

export const SavedItineraryDetails = () => {
    const [savedItinerary, setSavedItinerary] = useState([])
    const [savedEateries, setSavedEateries] = useState([])
    const [savedAttractions, setSavedAttractions] = useState([])
    const {itineraryId} = useParams()

    useEffect(
        () => {
            getSavedItineraryById(itineraryId).then(
                (foundItinerary) => {
                    setSavedItinerary(foundItinerary)
                })
                
        }, []
    )
    useEffect(
        () => {
            foundEateries()
            foundAttractions()
            
        }, [savedItinerary]
    )
    // const foundParks = () => {
    //     let eateryString = savedItinerary?.eateryIds?.join("&id=")
    //     getEateriesByIds(eateryString).then(
    //         (eateryArray) =>{
    //             setSavedEateries(eateryArray)
    //         }
    //     )
    //    }
   const foundEateries = () => {
    let eateryString = savedItinerary?.eateryIds?.join("&id=")
    getEateriesByIds(eateryString).then(
        (eateryArray) =>{
            setSavedEateries(eateryArray)
        }
    )
   }
   const foundAttractions = () => {
    let attractionString = savedItinerary?.attractionIds?.join("&id=")
    getAttractionsByIds(attractionString).then(
        (attractionArray) =>{
            setSavedAttractions(attractionArray)
        }
    )
   }
    return <>
    <section>
  {
   savedItinerary ? console.log(savedEateries)
   : ""
  }
  {
    console.log(savedAttractions)
  }

  
    </section></>
}