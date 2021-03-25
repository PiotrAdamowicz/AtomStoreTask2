import Vue from "vue";
import App from "./App.vue";
import LineChart from "./components/LineChart.vue";

Vue.config.productionTip = false;

Vue.component("line-chart", LineChart);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
