import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet/src/layer/marker/Icon'
import { useParams } from 'react-router-dom'
import { getSavedItineraryById } from '../providers/ItineraryProvider'
import { useEffect, useState } from 'react'
import { LocationsMap } from '../providers/DirectionProvider'
import { getParksByIds } from '../providers/ParkProvider'
import { getEateriesByIds } from '../providers/EateryProvider'
import { getAttractionsByIds } from '../providers/AttractionProvider'

export const MapMarker = (geoCode) => {
  const lat = geoCode?.hits[0]?.point?.lat
  const lng = geoCode?.hits[0]?.point?.lng
  return <>
  
  <Marker  position={[lat, lng]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41]})}>
    
    </Marker>
  
    </>   
  
}

export const DirectionDetails = () => {
  const [geoCodes, setGeoCodes] = useState([])
  const[parks, setParks] = useState([])
  const[eateries, setEateries] = useState([])
  const[attractions, setAttractions] = useState([])
  const[itinerary, setSavedItinerary] = useState({})
  const {itineraryId} = useParams()
  useEffect(
    () => {
      getSavedItineraryById(itineraryId).then(
        (savedItinerary) => {
          setSavedItinerary(savedItinerary)
        }
      )
    },[]
  )
  useEffect(
    () => {
      let parkString = itinerary?.nationalParkIds?.join(",")
      if (parkString === "")
       {
         setParks([])
        }
        else {
         getParksByIds(parkString).then(
             (parkArray) => {
                 setParks(parkArray.data)
             }
             )
        }
 }, [itinerary]
  )
  useEffect(
    () => {
      let eateryString = itinerary?.eateryIds?.join("&id=")
      getEateriesByIds(eateryString).then(
          (eateryArray) => {
              setEateries(eateryArray)
          }
      )
  }, [itinerary]
  )
  useEffect(
    () => {
      let attractionString = itinerary?.attractionIds?.join("&id=")
      getAttractionsByIds(attractionString).then(
          (attractionArray) => {
              setAttractions(attractionArray)
          }
      )
  }, [itinerary]
  )

  useEffect(
    () => {
      // if(parks[0] && eateries[0] && attractions[0]) {
        LocationsMap(attractions, eateries, parks).then(
              (geoCodeArray) => {
                setGeoCodes(geoCodeArray)
              }
            )
      // }
    }, [parks && eateries && attractions]
  )
  
    function MyMapComponent() {
        return (
            <MapContainer center={[39.50, -98.35]} zoom={5} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
      geoCodes.map(geoCode => {
        return MapMarker(geoCode)
      })
     }
    
    </MapContainer>
        )
      }   
  
   return <>
  <h2 className="text-center text-4xl pb-5 pt-10">Destinations</h2>
  <div className="flex row">
     <div>
     {
  eateries.map(eatery => {
    return<>
      <div>
        {eatery.businessName}
        {eatery.city}
        {eatery.state}

      </div>
    </>
  })
}
{
  parks.map(park => {
    return<>
      <div>
        {park.fullName}
        {park.addresses[0].city}
        {park.addresses[0].stateCode}

      </div>
    </>
  })
}
{
  attractions.map(attraction => {
    return<>
      <div>
        {attraction.name}
        {attraction.city}
        {attraction.state}

      </div>
    </>
  })
}
     </div>
      
   <div id="map" className='h-40'>
   {
      MyMapComponent()
      }
   </div>
   </div>
   
      </>
}

