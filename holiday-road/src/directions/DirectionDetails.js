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

export const MapMarker = (geoCodePromises) => {
  
  return <>
  {
    geoCodePromises.map((geoCode) => {
      console.log(geoCode)
      return (
        <Marker  position={[geoCode?.hits[0]?.point?.lat, geoCode?.hits[0]?.point?.lng]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41]})}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
      )
    })
  }
    </>   
  
}

export const DirectionDetails = () => {

  const [markers, setMarkers] = useState(<></>)
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
      itinerary?.nationalParkIds?.map(parkId => {
        getParksByIds(parkId).then(
            (park) => {
                setParks(park)
            }
        )
    })
    }, [itinerary]
  )
  useEffect(
    () => {
      itinerary?.eateryIds?.map(eateryId => {
        getEateriesByIds(eateryId).then(
            (eatery) => {
                setEateries(eatery)
            }
        )
    })
    }, [itinerary]
  )
  useEffect(
    () => {
      itinerary?.attractionIds?.map(attractionId => {
        getAttractionsByIds(attractionId).then(
            (attraction) => {
                setAttractions(attraction)
            }
        )
    })
    }, [itinerary]
  )

  useEffect(
    () => {
      LocationsMap(attractions, eateries, parks).then(
            (data) => {
              setMarkers(data)
            }
          )
    }, [itinerary]
  )
  
    function MyMapComponent() {
        return (
            <MapContainer center={[39.50, -98.35]} zoom={5} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
         markers
      }
    
    </MapContainer>
        )
      }   
  
   return <>
  <h2 className="text-center text-4xl pb-5 pt-10">Destinations</h2>
     
      
   <div id="map" className='h-40'>
   {
      MyMapComponent()
      }
   </div>
   
   
      </>
}