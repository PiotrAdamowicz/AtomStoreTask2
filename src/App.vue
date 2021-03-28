<template>
  <div id="app">        
    <line-chart  v-if="loaded" :chartdata="chartdata" :options="options" />
  </div>  
</template>

<script>
import axios from "axios"

const api_url = 'https://covid-api.mmediagroup.fr/v1/history?status=Confirmed&continent=Europe';
const randomColorGenerator=()=>{
  // TODO:randomize leter, number order/position
  const leter =()=>"abcdef"[Math.abs(Math.floor(Math.random()*10-5))];
  const number=()=>Math.floor(Math.random()*10);
  const R = `${number()}${leter()}`;
  const G = `${number()}${leter()}`;
  const B = `${number()}${leter()}`;
  return(`#${R}${G}${B}`)
}

export default {
  name: 'App',
  data: function(){
    return{
      loaded: false,
      chartdata:null,
      covidData:null,
      options:{
        responsive: true,
        maintainAspectRatio: false
      }}
  }, 
  
  async mounted (){
    this.loaded = false;
    axios.get(api_url)
      .then((res)=>{   
        
      function covidDataMaker(){
        let result = [];
        for(const country of Object.entries(res.data)){
          result.push(
            {country:country[1].All.country,
              iso: country[1].All.iso,
              population: country[1].All.population
              })          
        }
        result.sort((a,b)=>{
          if(a.population>b.population)return -1;
          if(a.population<b.population)return 1;
          return 0
        });
        return result
      }

      function datasetMaker(){    
        let result = [];    
        for (const country of Object.entries(res.data)){
          result.push({label:country[0],borderColor:randomColorGenerator(),data:(Object.values(country[1].All.dates)).reverse()})
        }
        return result
      }      

      this.chartdata ={
        labels: [...(Object.keys(res.data.Albania.All.dates)).reverse()],
        datasets:datasetMaker()
        
      };      
      console.log(covidDataMaker())
      this.loaded=true;
    })
    .catch((err)=>{
      console.log(err)
    })
    
  },  
 
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> 