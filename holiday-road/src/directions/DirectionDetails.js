import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export const DirectionDetails = () => {
    function MyMapComponent() {
        return (
            <MapContainer center={[39.50, -98.35]} zoom={5} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
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