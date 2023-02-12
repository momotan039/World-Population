import Constances from './constances.js';
import { Controls } from './controls.mjs';

export function loadChart(_data, _plugins = {}) {
    Chart.defaults.color = 'white'
    Chart.defaults.font.weight = 'bold'
    const ctx = document.getElementById('myChart');
    if (Constances.chart_instance)
    Constances.chart_instance.destroy()
    Constances.chart_instance = new Chart(ctx, {
        type: 'line',
        data: _data,
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: _plugins
        }
    })
}

export function showContinentChar() {
    Controls.showcountriesButtons()
    const data = {
        labels: Constances.continent.map(c => c.name),
        datasets: [{
                label: 'population',
                data: Constances.continent.map(c => c.population),
                borderWidth: 1
            },
            {
                label: 'Number Of Neighbors',
                data: Constances.continent.map(c => c.borders ? c.borders.length : 0),
                borderWidth: 1
            }
        ]
    }
   loadChart(data)
}

export * as Chart from './chart.mjs'
