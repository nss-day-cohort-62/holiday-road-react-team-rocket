const Eateries = 'http://holidayroad.nss.team/eateries'

let eateriesState = {}

export const fetchEateries = () => {
    return fetch(`${Eateries}`) 
        .then(response => response.json())
        .then((eateriesFetched) => {
            eateriesState = eateriesFetched
            console.log(eateriesState)
        }
    )
}

export const getEateries = () => {
    return eateriesState.map(eatery => ({...eatery}))
}   