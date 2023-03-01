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
    const [displayParkHTML, setDisplayParks] = useState([])
    const [displayEateryHTML, setDisplayEateries] = useState([])
    const [displayAttractionHTML, setDisplayAttractions] = useState([])
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
        setDisplayParks(DisplayParks)
        setDisplayEateries(DisplayEateries)
        setDisplayAttractions(DisplayAttractions)
        
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

    
    const removePark = (event) => {
        const id = event.target.getAttribute("id")
        const copy = {...itinerary}
        copy.nationalParkIds = copy.nationalParkIds.filter(nationalParkId => nationalParkId !== id)
        updateItinerary(copy)
        
    }
    const removeEatery = (event) => {
        const id = event.target.getAttribute("id")
        const copy = {...itinerary}
        copy.eateryIds = copy.eateryIds.filter(eateryId => eateryId !== parseInt(id))
        updateItinerary(copy)
    }
    const removeAttraction = (event) => {
        const id = event.target.getAttribute("id")
        const copy = {...itinerary}
        copy.attractionIds = copy.attractionIds.filter(attractionId => attractionId !== parseInt(id))
        updateItinerary(copy)
    }

    const DisplayParks = () => {
        if(Array.isArray(itinerary.nationalParkIds)) {
            const foundParks = findParks(itinerary, parks)
           return foundParks.map((foundPark) => {
                return <>
                <div>
                    <div>
                        {foundPark.fullName}
                    </div>
                    <button id={foundPark.parkCode} onClick={event => removePark(event)}>X</button>
                </div>
                </>
            })
        } else {
            return ""
        }
    }
    const DisplayEateries = () => {
        if(Array.isArray(itinerary.eateryIds)) {
            const foundEateries = findEateries(itinerary, eateries)
           return foundEateries.map((foundEatery) => {
                return <div>
                    <div>
                        {foundEatery.businessName}
                    </div>
                    <button id={foundEatery.id} onClick={event => removeEatery(event)}>X</button>
                </div>
            })
        } else {
            return ""
        }
    }
    const DisplayAttractions = () => {
        if(Array.isArray(itinerary.attractionIds)) {
            const foundAttractions = findAttractions(itinerary, attractions)
           return foundAttractions.map((foundAttraction) => {
                return <div>
                    <div>
                        {foundAttraction.name}
                    </div>
                    <button id={foundAttraction.id} onClick={event => removeAttraction(event)}>X</button>
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
                     <option id={park.id} key={park.id} value={park.parkCode} >{park.fullName}</option> ))
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
          { itinerary ? displayParkHTML
            : ""
          }
          {
            itinerary ? displayEateryHTML
            : ""
          }
          {
            itinerary ? displayAttractionHTML
            : ""
          }
        </div>
        
    </>
}