import { Chart } from "./scripts/chart.mjs";
import Constances from "./scripts/constances.js";
import { Controls } from "./scripts/controls.mjs";



async function  StartSite() {
   await Controls.handelContinentsButtons()
}

StartSite()