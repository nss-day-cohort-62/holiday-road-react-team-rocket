import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { findAttractions, getAttractions } from "../providers/AttractionProvider"
import { findEateries, getEateries } from "../providers/EateryProvider"
import { addNewItinerary } from "../providers/ItineraryProvider"
import { findParks, getAllParks } from "../providers/ParkProvider"
import { Weather } from "../providers/WeatherProvider"

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
    const [weatherClicked, setWeatherClicked] = useState(false)
    const [displayWeatherHTML, setWeatherHTML] = useState([])

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
        const copy = { ...itinerary }
        copy.nationalParkIds = copy.nationalParkIds.filter(nationalParkId => nationalParkId !== id)
        updateItinerary(copy)

    }
    const removeEatery = (event) => {
        const id = event.target.getAttribute("id")
        const copy = { ...itinerary }
        copy.eateryIds = copy.eateryIds.filter(eateryId => eateryId !== parseInt(id))
        updateItinerary(copy)
    }
    const removeAttraction = (event) => {
        const id = event.target.getAttribute("id")
        const copy = { ...itinerary }
        copy.attractionIds = copy.attractionIds.filter(attractionId => attractionId !== parseInt(id))
        updateItinerary(copy)
    }

    const weatherButton = (event, parkObj) => {
        event.preventDefault()
        setWeatherClicked(true)
        return weatherHTML(parkObj)
    }

    const weatherHTML = (parkObj) => {
        Weather(parkObj.latitude, parkObj.longitude)
            .then((data) => {
                setWeatherHTML(<>
                    <div className="text-center bg-yellow-200 w-2/5 ml-auto mr-auto rounded p-10 m-5">

                        <div className="block "> <h2 className="text-2xl"> {data.name}</h2><button className="" onClick={event => { event.preventDefault(); setWeatherClicked(false) }}>X</button></div>
                        <h3>The temperature is {data.main?.temp}° in Fahrenheit</h3>
                        <h3>It feels like {data.main?.feels_like}° in Fahrenheit</h3>
                        <h3>The humidity is {data.main?.humidity}%</h3>
                    </div>
                </>)
            })
    }

    const DisplayParks = () => {
        if (Array.isArray(itinerary.nationalParkIds)) {
            const foundParks = findParks(itinerary, parks)
            return foundParks.map((foundPark) => {
                return <>

                    <div className="flex row  justify-evenly">
                        <button className="text-yellow-200 text-2xl " id={foundPark.parkCode} onClick={event => removePark(event)}>-</button>
                        <div className=" text-lg p-3">{foundPark.fullName} </div>
                        <button className="btn bg-yellow-200 text-black" onClick={event => weatherButton(event, foundPark)}>Weather</button>
                    </div>



                </>
            })
        } else {
            return ""
        }
    }
    const DisplayEateries = () => {
        if (Array.isArray(itinerary.eateryIds)) {
            const foundEateries = findEateries(itinerary, eateries)
            return foundEateries.map((foundEatery) => {
                return <>
                    <div className="flex row justify-evenly">
                        <button className="text-yellow-200 text-2xl" id={foundEatery.id} onClick={event => removeEatery(event)}>-</button>
                        <div className="pr-5 text-lg">{foundEatery.businessName} </div>

                    </div>
                </>
            })
        } else {
            return ""
        }
    }
    const DisplayAttractions = () => {
        if (Array.isArray(itinerary.attractionIds)) {
            const foundAttractions = findAttractions(itinerary, attractions)
            return foundAttractions.map((foundAttraction) => {
                return <div className="flex row justify-evenly">
                    <button className="text-yellow-200 text-2xl " id={foundAttraction.id} onClick={event => removeAttraction(event)}>-</button>
                    <div className="pr-5 text-lg">
                        {foundAttraction.name}
                    </div>
                    
                </div>
            })
        } else {
            return ""
        }
    }

    const HandleItineraryName = (event) => {
        const copy = { ...itinerary }
        copy[event.target.name] = event.target.value
        updateItinerary(copy)
    }

    return <>
        <div className="grid grid-cols-2 gap-10 p-10 rounded border-t-4 border-black ">
            <form className="ml-auto mr-auto bg-yellow-200 p-10 rounded">
                <h2 className="text-4xl pb-10 text-center ">Create an Itinerary</h2>
                <fieldset>
                    <select className="w-full mb-5" name="parks" id="parks" onChange={
                        (evt) => {
                            const copy = { ...itinerary }
                            copy.nationalParkIds.push(evt.target.value)
                            updateItinerary(copy)
                        }
                    }>
                        <option value="0">Choose a park</option>
                        {
                            parks?.map(park => (
                                <option className="text-center" id={park.id} key={park.id} value={park.parkCode} >{park.fullName}</option>))
                        }
                    </select>
                </fieldset>
                <fieldset>
                    <select className="w-full mb-5" name="eateries" id="eateries" onChange={
                        (evt) => {
                            const copy = { ...itinerary }
                            copy.eateryIds.push(parseInt(evt.target.value))
                            updateItinerary(copy)
                        }
                    }>
                        <option value="0">Choose an eatery</option>
                        {
                            eateries.map(eatery => (
                                <option className="text-center" key={eatery.id} value={eatery.id} >{eatery.businessName}</option>))
                        }
                    </select>
                </fieldset>
                <fieldset>
                    <select className="w-full" name="attractions" id="attractions" onChange={
                        (evt) => {
                            const copy = { ...itinerary }
                            copy.attractionIds.push(parseInt(evt.target.value))
                            updateItinerary(copy)
                        }
                    }>
                        <option value="0">Choose an attraction</option>
                        {
                            attractions.map(attraction => (
                                <option className="text-center" key={attraction.id} value={attraction.id} >{attraction.name}</option>))
                        }
                    </select>
                </fieldset>
                
            </form>

            <div className="bg-accent p-10 rounded">
                <h2 className="text-4xl pb-10 text-center "> Your Itinerary</h2>
                <div className="ml-auto mr-auto text-center ">
                    {itinerary ? displayParkHTML
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
                    <div className=" text-center p-10 items-center">
                        <input className="h-5 p-5 mt-5" onChange={event => HandleItineraryName(event)}
                                name="name"
                                 id={itinerary.id} type="text"
                                placeholder=" Name Your Itinerary" />
                        
                        <button className="btn bg-yellow-200 text-black m-5" onClick={(clickEvent) => itinerary.name = handleSaveButton(clickEvent)} >
                        Submit Itinerary
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            {weatherClicked ? displayWeatherHTML
                : ""
            }
        </div>
    </>
}