const continents={
    'africa':undefined,
    'americas':undefined,
    'asia':undefined,
    'europe':undefined,
    'oceania':undefined,
}
let continentChar;
let selectedContinent;

function loadChart(){
    const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
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
        const continent=await getCountries(continentName)
        showContinentChar(continent)
        console.log(continent);
    })
}
function showContinentChar(continent){
    showcountriesButtons(continent)
    const mainChar=document.querySelector('.continent-chart')
     Chart.defaults.color = 'white'
     Chart.defaults.font.weight='bold'
    const ctx = document.getElementById('myChart');
    if(continentChar)
    continentChar.destroy()
    continentChar= new Chart(ctx, {
    type: 'line',
    data: {
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
    },
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
function showcountriesButtons(continent){
    const countries=document.querySelector('.countries')
    countries.innerHTML=""
    continent.map((country=>{
        const button=document.createElement('button')
        button.innerText=country.name
        button.classList.add('mybutton')
        countries.appendChild(button)
    }))
}
function StartSite(){
    handelContinentsButtons()
}

StartSite()