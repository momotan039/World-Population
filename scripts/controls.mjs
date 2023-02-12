import { Chart } from './chart.mjs'
import Constances from './constances.js'
import { Data } from './data.mjs'

export async function handelContinentsButtons() {
    const continentsElem = document.querySelector(".continents")
    continentsElem.addEventListener('click', async () => {
        const btn = event.target
        if (btn === continentsElem)
            return

            hideMessageCity404()
            showChart()
            
        if (Constances.selectedContinent)
        Constances.selectedContinent.classList.remove('selected')

        btn.classList.add('selected')
        Constances.selectedContinent = btn

        const continentName = btn.innerText.toLowerCase()
        Constances.continent = await Data.getCountries(continentName)
        Chart.showContinentChar()
    })
}


export function handelCountriesButtons() {

    const countriesElem = document.querySelector(".countries")
    countriesElem.addEventListener('click', async () => {
        const btn = event.target

        if (btn === countriesElem)
            return

        if (Constances.selectedCountry)
        Constances.selectedCountry.classList.remove('selected')
        btn.classList.add('selected')
        Constances.selectedCountry = btn


        const countryName = btn.innerText
        const cities = await Data.getCities(countryName)
        if(!cities)
        {
            showMessageCity404()
            hideChart()
            Constances.chart_instance.destroy()
            return
         }

         hideMessageCity404()
         showChart()
        const _cities = cities.map(c => ({
            city: c.city,
            population: c.populationCounts.map(p => ({
                year: p.year,
                value: p.value
            }))
        }))
        console.log('cities',_cities);
        let years = cities.map(c => c.populationCounts.map(pc => pc.year))
        years = years.reduce((acc, val) => acc.concat(val), []);
        const uniqeYears = [...new Set(years)];

        const dataset=Array.from(uniqeYears).map(year => {
           return {
            'label':year,
            data:Data.getPopulationByYear(year,_cities)
           }
        })

        const data = {
            labels:cities.map(c=>c.city),
            datasets: dataset
        }
        const plugins={
            tooltip: {
                callbacks: {
                    label: function(context) {
                         return uniqeYears.map((year,i)=>{
                            if(year===context.dataset.label)
                            return `* ${year} : ${Data.getPopulationCityByYear(year,_cities,context.label)}`
                            else
                            return `${year} : ${Data.getPopulationCityByYear(year,_cities,context.label)}`
                        })
                        
                    },
                },
                
            }
        }
        // every year must be appropriate dataset
       Chart.loadChart(data,plugins)
    })
}



export function showcountriesButtons() {
    const countries = document.querySelector('.countries')
    countries.innerHTML = ""
    Constances.continent.map((country => {
        const button = document.createElement('button')
        button.innerText = country.name
        button.classList.add('mybutton')
        countries.appendChild(button)
    }))
    handelCountriesButtons()
}



export function showLoadingElement(){
    const loading=document.querySelector('.loading')
    loading.classList.remove('hidden')
}
export function hideLoadingElement(){
    const loading=document.querySelector('.loading')
    loading.classList.add('hidden')
}
export function showContinentChartElement(){
    const continent_chart=document.querySelector('.continent-chart')
    continent_chart.classList.remove('hidden')
}

export function hideContinentChartElement(){
    const continent_chart=document.querySelector('.continent-chart')
    continent_chart.classList.add('hidden')
}

export function showMessageCity404(){
    const message=document.querySelector('.error-message')
    message.classList.remove('hidden')
}

export function hideMessageCity404(){
    const message=document.querySelector('.error-message')
    message.classList.add('hidden')
}


export function showChart(){
    const chart=document.getElementById('myChart')
    chart.classList.remove('hidden')
}

export function hideChart(){
    const chart=document.getElementById('myChart')
    chart.classList.add('hidden')
}

export * as Controls from './controls.mjs'