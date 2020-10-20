<template>
  <div id="app">
    <div id="welcome">
      <p ref="greeting"></p>
    </div>
    <div id="weather">
      <img id="weather_image" v-if="weather_image != null" v-bind:src="require(`@/assets/img/${weather_image}`)"/>
      <div id="weather_container">
        <p v-if="weather.name && weather.sys && weather.sys.country">{{weather.name}}, {{weather.sys.country}}</p>
        <p v-if="weather.main && weather.main.temp">{{weather.main.temp}} °C</p>
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
      weather_image: 'lille.jpg'
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

<style scoped>
  @import './assets/style/main.css';

  #weather {
    color: black;
    position: relative;
    width: 90%;
  }

  #weather_container {
    margin-top: 5%;
    background-color: rgba(255, 255, 255, 0.5);
    width: 30%;
    margin-left: 35%;
    border-radius: 10%;
  }

  p {
    text-align: center;
    font-weight: 400;
    text-shadow: 1px 1.2px rgba(0, 0, 0, 0.25);
  }

  #weather_image {
    opacity: 0.8;
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 20rem;
    border-radius: 3%;
    z-index: -1;
    object-fit: cover;
  }
</style>

