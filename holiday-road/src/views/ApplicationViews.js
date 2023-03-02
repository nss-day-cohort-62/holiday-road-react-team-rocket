import { Outlet, Route, Routes } from "react-router-dom"
import { DirectionDetails } from "../directions/DirectionDetails"
import { Directions } from "../directions/Directions"
import { CreateItinerary } from "../itineraries/CreateItinerary"
import { SavedItineraries } from "../itineraries/SavedItineraries"
import { SavedItineraryDetails } from "../itineraries/SavedItineraryDetails"

export const ApplicationViews = () => {
    return <>
        <Routes>
        <Route path="/" element={
            <>
            <main className="image w-100 h-screen bg-no-repeat margin-auto bg-cover">
            <div className=""> 
                </div>
           </main>
            <Outlet />













            </>}/>
            <Route path="/directions" element={
                <Directions />}/>
            <Route path="/directions/details/:itineraryId" element={
                <DirectionDetails /> 
            } />
            <Route path="/savedItineraries" element={
                <SavedItineraries />}/>
            <Route path="/createItinerary" element={
                <CreateItinerary />}/>
            <Route path="/savedItineraries/details/:itineraryId" element={
                <SavedItineraryDetails /> 
            } />
        </Routes>
    </>
}