import Constances from './constances.js'
import { Controls } from './controls.mjs'

export function getPopulationByYear(year, cities) {
    return cities.reduce((p, c, i) => {
        const population = c.population.find(p => p.year === year)
        p.push(population ? population.value : "0")
        return p
    }, [])
}

export function getPopulationCityByYear(year, cities, city) {
    const c = cities.find(c => c.city === city)
    const population = c.population.find(p => p.year === year)
    return population ? Number(population.value).toLocaleString() : 0
}

export async function getCountries(continentName) {
 
    if (Constances.continents[continentName])
        return Constances.continents[continentName]

        Controls.showLoadingElement()
        Controls.hideContinentChartElement()

    const res = await fetch("https://restcountries.com/v2/region/" + continentName)
    const cont = await res.json()
    Constances.continents[continentName] = cont
    Controls.hideLoadingElement()
    // show chart after fethcing data
    Controls.showContinentChartElement()
    return cont
}

export async function getCities(country) {

    const continent=Constances.continent
    const _country = continent.find(c => c.name === country)

    if (_country.cities)
        return _country.cities

    if (continent[country])
        return continent[country]

        Controls.hideContinentChartElement()
        Controls.showLoadingElement()

    const res = await fetch("https://countriesnow.space/api/v0.1/countries/population/cities/filter", {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            country: country.toLowerCase()
        })
    })

    if(!res.ok)
    {
        Controls.hideLoadingElement()
        Controls.showContinentChartElement()
        return undefined
    }

    const data = await res.json().then(res => res.data)
    _country.cities = data

    Controls.hideLoadingElement()
    Controls.showContinentChartElement()
    return data
}

export * as Data from './data.mjs'