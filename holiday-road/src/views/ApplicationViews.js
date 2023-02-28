import { Outlet, Route, Routes } from "react-router-dom"
import { Directions } from "../directions/Directions"
import { CreateItinerary } from "../itineraries/Createitinerary"
import { SavedItineraries } from "../itineraries/SavedItineraries"

export const ApplicationViews = () => {
    return <>
        <Routes>
        <Route path="/" element={
            <>
            <header>About</header>
            <Outlet />
            </>}/>
            <Route path="/directions" element={
                <Directions />}/>
            <Route path="/savedItineraries" element={
                <SavedItineraries />}/>
            <Route path="/createItinerary" element={
                <CreateItinerary />}/>
        </Routes>
    </>
}