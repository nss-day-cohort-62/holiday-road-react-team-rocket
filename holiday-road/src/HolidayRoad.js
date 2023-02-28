import { Route, Routes } from "react-router-dom"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./views/ApplicationViews"

export const HolidayRoad = () => {
    return <>
        <Routes>
            <Route path="*" element={
                <>
                    <NavBar />
                    <ApplicationViews /> 
               </>
            }/>
        </Routes>
    </>
}