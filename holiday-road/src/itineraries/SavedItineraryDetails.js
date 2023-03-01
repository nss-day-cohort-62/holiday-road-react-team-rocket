import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAttractionsByIds } from "../providers/AttractionProvider"
import { getEateriesByIds } from "../providers/EateryProvider"
import { getSavedItineraryById } from "../providers/ItineraryProvider"
import { getParksByIds } from "../providers/ParkProvider"

export const SavedItineraryDetails = () => {
    const [savedItinerary, setSavedItinerary] = useState([])
    const [savedEateries, setSavedEateries] = useState([])
    const [savedAttractions, setSavedAttractions] = useState([])
    const [savedParks, setSavedParks] = useState([])
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
            foundParks()
        }, [savedItinerary]
    )
    
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
    const foundParks = () => {
        let parkString = savedItinerary?.nationalParkIds?.join(",")
        getParksByIds(parkString).then(
            (parkArray) =>{
                setSavedParks(parkArray.data)
            }
        )
   }

    const DisplayParks = () => {
        if(savedParks[0]) {
        return savedParks.map((park) => {
                return <div>
                    {park.fullName}
                    {`${park.addresses[0].line1} ${park.addresses[0].city}, ${park.addresses[0].stateCode}`}
                </div>
            })
        } else {
            return ""
        }
    }
    const DisplayEateries = () => {
        if(savedEateries[0]) {
        return savedEateries.map((eatery) => {
                return <div>
                    {eatery.businessName}
                    {eatery.description}
                    {`${eatery.city}, ${eatery.state}`}
                </div>
            })
        } else {
            return ""
        }
    }
    const DisplayAttractions = () => {
        if(savedAttractions[0]) {
        return savedAttractions.map((attraction) => {
                return <div>
                    {attraction.name}
                    {attraction.description}
                    {`${attraction.city}, ${attraction.state}`}
                </div>
            })
        } else {
            return ""
        }
    }

    return <>
    <section>
  {
   savedItinerary ? DisplayParks()
   : ""
  }
  {
   savedItinerary ? DisplayEateries()
   : ""
  }
  {
   savedItinerary ? DisplayAttractions()
   : ""
  }
  

  
    </section>
    </>
}