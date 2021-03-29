<template>
  <div id="app">
    <h3>Click country label to remove it from chart below</h3>
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
      options:{
        responsive: true,
        maintainAspectRatio: false
      }}
  }, 
  
  async mounted (){
    this.loaded = false;
    axios.get(api_url)
      .then((res)=>{   
        
      const covidData = res.data;

      function covidDataMaker(){
        let top10 = [];
        for(const country of Object.entries(covidData)){
          top10.push(
            {country:country[1].All.country,
              dates: country[1].All.dates,
              population: country[1].All.population
              })          
        }
        top10.sort((a,b)=>{
          if(a.population>b.population)return -1;
          if(a.population<b.population)return 1;
          return 0
        });
        top10.splice(10,top10.length-1);

        let result = [];
        for (const country of top10){
          result.push({
            label:country.country,
            borderColor: randomColorGenerator(),
            data:(Object.values(country.dates)).reverse()
          })         
        }
        return result
      }  

      this.chartdata ={
        labels: [...(Object.keys(covidData.Albania.All.dates)).reverse()],
        datasets:covidDataMaker()
        
      };
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
  height: 100%;
  background: #b4cdce2f;
  margin-top: 60px;
}
</style> 