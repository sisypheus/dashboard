<template>
  <div id="app">
    <div id="welcome">
      <p ref="greeting"></p>
    </div>
    <div id="weather">
      <div id="weather_display">
        <p v-if="weather.name && weather.sys && weather.sys.country">{{weather.name}}, {{weather.sys.country}}</p>
        <p v-if="weather.main && weather.main.temp">{{weather.main.temp}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      name: 'Theo',
      id: 0,
      location: 'Lille',
      weather_apikey: process.env.VUE_APP_API_KEY,
      baseurl: 'https://api.openweathermap.org/data/2.5/weather?q=',
      weather: {}
    }
  },
  methods: {
    greeting() {
      let date_object = new Date();
      let hour = date_object.getHours();
      let greeting;

      if (hour >= 14 && hour < 19)
        greeting = 'Good afternoon ';
      else if (hour >= 19 || hour >= 0 && hour < 9)
        greeting = 'Good night ';
      else
        greeting = 'Good morning ';
      this.$refs.greeting.innerHTML = greeting + this.name;
    },
    get_weather() {
      this.weather = fetch(`${this.baseurl}${this.location}&units=metric&appid=${this.weather_apikey}`)
        .then(res => {
          if (res.status != 200)
            return 'error';
          return res.json();
        })
        .then(this.setResults);
    },

    setResults (results) {
      if (results == "error") {
        this.weather = {};
        return;
      }
      this.weather = results;
    },
  },
  mounted() {
    this.greeting();
    this.get_weather();
  }
}
</script>

<style>
  @import './assets/style/main.css';
</style>

