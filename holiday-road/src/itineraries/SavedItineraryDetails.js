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
    const { itineraryId } = useParams()

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
            (eateryArray) => {
                setSavedEateries(eateryArray)
            }
        )
    }
    const foundAttractions = () => {
        let attractionString = savedItinerary?.attractionIds?.join("&id=")
        getAttractionsByIds(attractionString).then(
            (attractionArray) => {
                setSavedAttractions(attractionArray)
            }
        )
    }
    const foundParks = () => {
        let parkString = savedItinerary?.nationalParkIds?.join(",")
         if (parkString === "")
          {
             parkString = "abcd"
             getParksByIds(parkString).then(
                (parkArray) => {
                    setSavedParks(parkArray.data)
                }
                )

           }
           else {

            getParksByIds(parkString).then(
                (parkArray) => {
                    setSavedParks(parkArray.data)
                }
                )
           }
        
           
       
    }

    const DisplayParks = () => {
        if (Array.isArray(savedParks)) {
            return savedParks.map((park) => {
                return <div className="p-10"> 
                    <h2 className="text-2xl text-center"> {park.fullName}</h2>
                    <p className="text-center">{`${park.addresses[0].line1} ${park.addresses[0].city}, ${park.addresses[0].stateCode}`}</p>
                </div>
            })
        } else {
            return ""
        }
    }
    const DisplayEateries = () => {
        if (Array.isArray(savedEateries)) {
            return savedEateries.map((eatery) => {
                return <div className="text-center p-10">
                    <h2 className="text-2xl "> {eatery.businessName}</h2>
                    <p> {`${eatery.city}, ${eatery.state}`}</p>
                    <p>{eatery.description}</p>

                </div>
            })
        } else {
            return ""
        }
    }
    const DisplayAttractions = () => {
        if (Array.isArray(savedAttractions)) {
            return savedAttractions.map((attraction) => {
                return <div className="text-center p-10">
                    <h2 className="text-2xl">{attraction.name}</h2>
                    <p>  {`${attraction.city}, ${attraction.state}`}</p>
                    <p> {attraction.description}</p>
                </div>
            })
        } else {
            return ""
        }
    }

    return <>
    <h1 className="text-4xl text-center">{savedItinerary.name}</h1>
        <section className="m-10 flex-col p-10">
            <h1 className="text-3xl text-center">National Parks</h1>
            {
                savedItinerary&&foundParks ? DisplayParks()
                    : ""
            }
             <h1 className="text-3xl text-center">Eateries</h1>
            {
                savedItinerary&&foundEateries ? DisplayEateries()
                    : ""
            }
             <h1 className="text-3xl text-center">Attractions</h1>
            {
                savedItinerary&&foundAttractions ? DisplayAttractions()
                    : ""
            }



        </section>
    </>
}