const continents={
    'africa':undefined,
    'americas':undefined,
    'asia':undefined,
    'europe':undefined,
    'oceania':undefined,
}
let continentChar;
let selectedContinent;
let selectedCountry;
let continent={}
function loadChart(_data){
    Chart.defaults.color = 'white'
     Chart.defaults.font.weight='bold'
    const ctx = document.getElementById('myChart');
    if(continentChar)
    continentChar.destroy()
    continentChar= new Chart(ctx, {
    type: 'line',
    data: _data,
    options: {
        maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
}

async function getCountries(continent)
{
    if(continents[continent])
    return continents[continent]

    const res=await fetch("https://restcountries.com/v2/region/"+continent)
    const cont=await res.json()
    continents[continent]=cont
    return cont
}

async function getCities(country)
{
    const _country=continent.find(c=>c.name===country)
    
    if(_country.cities)
    return _country.cities


    if(continent[country])
    return continent[country]

    const res=await fetch("https://countriesnow.space/api/v0.1/countries/population/cities/filter",{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            country:country.toLowerCase()
        })
    })
    const data=await res.json().then(res=>res.data)
    _country.cities=data
    return data
}


function handelContinentsButtons(){
    const continentsElem=document.querySelector(".continents")
    continentsElem.addEventListener('click',async ()=>{
        const btn=event.target
        if(btn===continentsElem)
        return
        if(selectedContinent)
        selectedContinent.classList.remove('selected')
        btn.classList.add('selected')
        selectedContinent=btn
        const continentName=btn.innerText.toLowerCase()
        continent=await getCountries(continentName)
        showContinentChar()
    })
}
function handelCountriesButtons(){
    const countriesElem=document.querySelector(".countries")
    countriesElem.addEventListener('click',async ()=>{
        const btn=event.target

        if(btn===countriesElem)
        return

        if(selectedCountry)
        selectedCountry.classList.remove('selected')
        btn.classList.add('selected')
        selectedCountry=btn

        
        const countryName=btn.innerText
        const cities=await getCities(countryName)
        const years=cities.map(c=>c.populationCounts.map(pc=>pc.year)[0])
        console.log(years);

        const data={
            labels: cities.map(c=>c.city),
            datasets: [
                {
              label: '2016',
              data:[1,2,3],
              borderWidth: 1
            },
                {
              label: '2017',
              data:[4,5,6],
              borderWidth: 1
            },
                {
              label: '2018',
              data:[7,8,9],
              borderWidth: 1
            },
          ]
          }

        loadChart(data)
    })
}


function showContinentChar(){
    showcountriesButtons()
    const data={
        labels: continent.map(c=>c.name),
        datasets: [{
          label: 'Population',
          data:  continent.map(c=>c.population),
          borderWidth: 1
        },
        {
          label: 'Number Of Neighbors',
          data: continent.map(c=>c.borders?c.borders.length:0),
          borderWidth: 1
        }
      ]
      }
    loadChart(data)
}
function showcountriesButtons(){
    const countries=document.querySelector('.countries')
    countries.innerHTML=""
    continent.map((country=>{
        const button=document.createElement('button')
        button.innerText=country.name
        button.classList.add('mybutton')
        countries.appendChild(button)
    }))
    handelCountriesButtons()
}
function StartSite(){
    handelContinentsButtons()
}

StartSite()