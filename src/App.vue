<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Something works"/>
    <line-chart  v-if="loaded" :chartdata="chartdata" :options="options" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import axios from "axios"


export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data:()=>({
    loaded: false,
    chartdata:null,
    countrys:[],
    options:{
        responsive: true,
        maintainAspectRatio: false
        }
  }),
  async mounted (){
    this.loaded = false;
    axios.get('https://covid-api.mmediagroup.fr/v1/history?status=Confirmed&continent=Europe')
    .then((res)=>{
      const covidData = res.data;
      this.chartdata ={
        labels: [...(Object.keys(covidData.Albania.All.dates)).reverse()],
        datasets:[
          {
            label:covidData.Albania.All.country,
            backgroundColor: "#00aa00",
            data:(Object.values(covidData.Albania.All.dates)).reverse()           
          },
          {
            label:covidData.Poland.All.country,
            backgroundColor: "#ff0000",
            data:(Object.values(covidData.Poland.All.dates)).reverse()
          }
        ]
      };
      console.log(covidData.Poland.All)
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
  //TODO: map all the countrys to datasets and label