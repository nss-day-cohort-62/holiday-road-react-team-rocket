import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { findAttractions, getAttractions } from "../providers/AttractionProvider"
import { findEateries, getEateries } from "../providers/EateryProvider"
import { addNewItinerary } from "../providers/ItineraryProvider"
import { findParks, getAllParks } from "../providers/ParkProvider"

export const CreateItinerary = () => {
    const [parks, setParks] = useState([])
    const [eateries, setEateries] = useState([])
    const [attractions, setAttractions] = useState([])
    const [itinerary, updateItinerary] = useState({
        nationalParkIds: [],
        eateryIds: [],
        attractionIds: []
    })

    useEffect(
        () => {
            getAllParks()
            .then((parksArray) => {
                setParks(parksArray.data)
            }).then(
                getEateries().then((eateriesArray) => {
                    setEateries(eateriesArray)
                })
            ).then(
                getAttractions()
                .then((attractionsArray) => {
                    setAttractions(attractionsArray)
                })
            )
        }, []
    )
    useEffect(
        () => {
           
        }, [itinerary]
    )
    const navigate = useNavigate()
    const handleSaveButton = (event) => {
        event.preventDefault()

       addNewItinerary(itinerary)
            .then(() => {
               navigate("/savedItineraries")
            }) 

    }
    const DisplayParks = () => {
        if(itinerary.nationalParkIds[0]) {
            const foundParks = findParks(itinerary, parks)
           return foundParks.map((foundPark) => {
                return <div>
                    {foundPark.fullName}
                </div>
            })
        } else {
            return ""
        }
    }
    const DisplayEateries = () => {
        if(itinerary.eateryIds[0]) {
            const foundEateries = findEateries(itinerary, eateries)
           return foundEateries.map((foundEatery) => {
                return <div>
                    {foundEatery.businessName}
                </div>
            })
        } else {
            return ""
        }
    }
    const DisplayAttractions = () => {
        if(itinerary.attractionIds[0]) {
            const foundAttractions = findAttractions(itinerary, attractions)
           return foundAttractions.map((foundAttraction) => {
                return <div>
                    {foundAttraction.name}
                </div>
            })
        } else {
            return ""
        }
    }
    return <>
    <form>
        <h2>Create an Itinerary</h2>
        <fieldset>
    <select name = "parks" id="parks"  onChange={
                            (evt) => {
                                const copy = {...itinerary}
                                copy.nationalParkIds.push(evt.target.value)
                                updateItinerary(copy)
                            }
                        }>
            <option value="0">Choose a park</option>
            {
                 parks?.map(park => (
                     <option id={park.id} key={park.id} value={park.id} >{park.fullName}</option> ))
            }
        </select>
        </fieldset>
        <fieldset>
        <select name ="eateries" id="eateries" onChange={
                            (evt) => {
                                const copy = {...itinerary}
                                copy.eateryIds.push(parseInt(evt.target.value))
                                updateItinerary(copy)
                            }
                        }>
            <option value="0">Choose an eatery</option>
            {
                 eateries.map(eatery => (
                     <option key={eatery.id} value={eatery.id} >{eatery.businessName}</option> ))
            }
        </select>
        </fieldset>
        <fieldset>
        <select name ="attractions" id="attractions" onChange={
                            (evt) => {
                                const copy = {...itinerary}
                                copy.attractionIds.push(parseInt(evt.target.value))
                                updateItinerary(copy)
                            }
                        }>
            <option value="0">Choose an attraction</option>
            {
                 attractions.map(attraction => (
                     <option key={attraction.id} value={attraction.id} >{attraction.name}</option> ))
            } 
        </select>
        </fieldset>
        <button onClick={(clickEvent) => handleSaveButton(clickEvent)} >
            Submit Itinerary
        </button>
        </form>
        
        <div>
            <h2> Your Itinerary</h2>
          {
            DisplayParks()
          }
          {
            DisplayEateries()
          }
          {
            DisplayAttractions()
          }
        </div>
        
    </>
}