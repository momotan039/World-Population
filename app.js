const continents={
    'africa':undefined,
    'americas':undefined,
    'asia':undefined,
    'europe':undefined,
    'oceania':undefined,
}

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
    debugger
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
        const continentName=btn.innerText.toLowerCase()
        const continent=await getCountries(continentName)
        
    })
}
function StartSite(){
    handelContinentsButtons()
}

StartSite()