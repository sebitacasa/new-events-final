/* import React from "react";
import {Bar} from "react-chartjs-2";

function Barras(){
    const data={
        labels: ["estados unidos", "mexico", "italia"],
        datasets: [{
            label:"habitantes",
            backgroundColor:"rgba(0,255,0,1)",
            borderColor:"black",
            borderWidth:1,
            data:[327,126,60]
        }]
    };
    const opciones={
        maintainAspectRatio:false,
        responsive:true
    }
    return(
        <div >
            <h2>poblacion</h2>
            <Bar data={data} options={opciones}/>
        </div>
    )
}

export default Barras */

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
/* import faker from 'faker'; */

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      /* position: 'top' as const, */
    },
    title: {
      display: true,
      text: 'Meses con mayores ventas',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: ({ min: 0, max: 1000 }),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export function App() {
  return <Bar options={options} data={data} />;
}