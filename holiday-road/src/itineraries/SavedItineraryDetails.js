import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAttractionsByIds } from "../providers/AttractionProvider"
import { getEateriesByIds } from "../providers/EateryProvider"
import { getSavedItineraryById } from "../providers/ItineraryProvider"
import { Events } from "../providers/ParkProvider"
import { getParksByIds } from "../providers/ParkProvider"

export const SavedItineraryDetails = () => {
    const [savedItinerary, setSavedItinerary] = useState([])
    const [savedEateries, setSavedEateries] = useState([])
    const [savedAttractions, setSavedAttractions] = useState([])
    const [savedParks, setSavedParks] = useState([])
    // const [displayDetails, setDisplayDetails] = useState ({})
    const { itineraryId } = useParams()
let parkEvents = {}
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
            if(savedItinerary.name) {
            foundEateries()
            foundAttractions()
            foundParks()
            }
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
            setSavedParks([])
           }
           else {
            getParksByIds(parkString).then(
                (parkArray) => {
                    setSavedParks(parkArray.data)
                }
                )
           }
        
           
       
    }

    const DetailsButtons = (event, parkObj) => {
        
        event.preventDefault()
     detailsHTML(parkObj)
      
        
    }



    const detailsHTML = (parkObj) => {
        Events(parkObj.parkCode).then(
            (parkEventsArray) => {
                 parkEvents.id = parkObj.parkCode
                
                if (parkEventsArray.data[0]) {
                
                
                        parkEvents.eventOne=  `<div>
                    Event 1:
                 <p>${parkEventsArray.data[0].title}</p>
                 <p>${parkEventsArray.data[0].datestart}</p>
                 <p>${parkEventsArray.data[0].times[0].timestart}</p>
                 <p>${parkEventsArray.data[0].times[0].timeend}</p>
                 <p>${parkEventsArray.data[0].description}</p>
                 <p>${parkEventsArray.data[0].feeinfo}</p>
                    </div>`
                    
                
                    
                }

                if (parkEventsArray.data[1]) {
                   
                        parkEvents.eventTwo=  `<div>
                    Event 1:
                 <p>${parkEventsArray.data[1].title}</p>
                 <p>${parkEventsArray.data[1].datestart}</p>
                 <p>${parkEventsArray.data[1].times[0].timestart}</p>
                 <p>${parkEventsArray.data[1].times[0].timeend}</p>
                 <p>${parkEventsArray.data[1].description}</p>
                 <p>${parkEventsArray.data[1].feeinfo}</p>
                    </div>`
                    
                
                   
                }

                
                
            }
        )
        console.log(parkEvents)
    }

    const DisplayParks = () => {
        if (Array.isArray(savedParks)) {
            return savedParks.map((park) => {
                return <div className="p-10"> 
                    <h2 className="text-2xl text-center"> {park.fullName}</h2>
                    <button onClick={ event=>{
                        
                        DetailsButtons(event, park)

                    }
                    }>Details</button>
                    
                    <p className="text-center">{`${park.addresses[0].line1} ${park.addresses[0].city}, ${park.addresses[0].stateCode}`}</p>
                    <div>
                        
            {console.log(parkEvents)}
            {
                parkEvents.id ===park.parkCode && parkEvents.eventOne ? <div dangerouslySetInnerHTML={{ __html: parkEvents.eventOne }} />
                : <><div>There are no events scheduled for this park.</div></>
            }
            {
                parkEvents.id ===park.parkCode && parkEvents.eventTwo ? <div dangerouslySetInnerHTML={{ __html: parkEvents.eventTwo }} />
                : <></>
            }
            </div>
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
        <section className="m-10 flex-col p-5 font-body">
            <h1 className="text-3xl text-center">National Parks</h1>
            {
                savedItinerary && foundParks ? DisplayParks()
                    : ""
            }
            
             <h1 className="text-3xl text-center">Eateries</h1>
            {
                savedItinerary && foundEateries ? DisplayEateries()
                    : ""
            }
             <h1 className="text-3xl text-center">Attractions</h1>
            {
                savedItinerary && foundAttractions ? DisplayAttractions()
                    : ""
            }



        </section>
    </>
}