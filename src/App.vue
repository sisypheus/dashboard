<template>
  <div id="app">
    <div id="welcome">
      <p ref="greeting"></p>
    </div>
    <div ref="weather" id="weather">
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
      weather: {},
      weather_image: 'blue'
    }
  },
  methods: {
    greeting() {
      let date_object = new Date();
      let hour = date_object.getHours();
      let greeting;

      if (hour >= 14 && hour < 18)
        greeting = 'Good afternoon ';
      else if (hour >= 18 || hour >= 0 && hour < 9)
        greeting = 'Good night ';
      else
        greeting = 'Good morning ';
      this.$refs.greeting.innerHTML = greeting + this.name;
    },
    set_weather_image() {
      let background = document.getElementById('weather');
      console.log(background);
      console.log(this.weather.weather[0].main);
      switch (true) {
        case (this.weather.weather[0].main == "Clear"):
          this.$refs.weather.style.backgroundImage = "./assets/img/soleil.jpg";
          break;
        case (this.weather.weather[0].main == "Clouds"):
          break;
        default:
          this.$refs.weather.style.backgroundImage = "./assets/img/pluie.jpg";
          break;
      }
    },
    get_weather() {
      this.weather = fetch(`${this.baseurl}${this.location}&units=metric&appid=${this.weather_apikey}`)
        .then(res => {
          if (res.status != 200)
            return 'error';
          return res.json();
        })
        .then(this.setResults)
        .then(this.set_weather_image);
    },
    setResults (results) {
      if (results == "error") {
        this.weather = {};
        return;
      }
      this.weather = results;
      console.log(results);
    },
  },
  mounted() {
    this.greeting();
    this.get_weather();
  }
}
</script>

<style scoped>
  @import './assets/style/main.css';

  #weather {
    background-image: url('./assets/img/pluie.jpg');
  }
</style>

