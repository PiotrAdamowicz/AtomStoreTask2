<template>
  <div id="app">        
    <line-chart  v-if="loaded" :chartdata="chartdata" :options="options" />
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'App',
  
  data:()=>({
    loaded: false,
    chartdata:null,
    options:{
      responsive: true,
      maintainAspectRatio: false
      }
  }),
  async mounted (){
    const api_url = 'https://covid-api.mmediagroup.fr/v1/history?status=Confirmed&continent=Europe';
    this.loaded = false;
    axios.get(api_url)
    .then((res)=>{
      const covidData = res.data;
      
      function datasetMaker(){    
        let result = [];    
        for (const country of Object.entries(covidData)){
          result.push({label:country[0],data:(Object.values(country[1].All.dates)).reverse()})
        }
        return result
      }
      console.log(datasetMaker())

      this.chartdata ={
        labels: [...(Object.keys(covidData.Albania.All.dates)).reverse()],
        datasets:datasetMaker()
        // [
        //   {
        //     label:covidData[0],
        //     borderColor: "#00aa00",
        //     data:[1,2,3,4,5,6,7]         
        //   }
         
        // ]
      };
      console.log(covidData)
      
      this.loaded=true;
    })
    .catch((err)=>{
      console.log(err)
    })
    

  }
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

data: ()=>({
      chartdata:{
          labels:["One","Two"],
          dataset:[
              {
                label:'Data One',
                data:[111,123]
                }
            ]
      },
      options:{
        
    }
  }),
 