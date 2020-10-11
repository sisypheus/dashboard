<template>
  <div id="app">
    <div id="welcome">
      <p ref="greeting"></p>
    </div>
    <div id="weather">
      <input v-model="newLocation" @keyup.enter="addLocation()">
      <button @click="addLocation()">Submit</button>
      <div v-for="(location, index) in locations" :key="location.id">
        <p v-if="typeof location.weather != 'undefined'">{{location.weather.name}}, {{location.weather.sys.country}}</p>
        <p v-if="typeof location.weather != 'undefined'">{{Math.round(location.weather.main.temp) + '°C'}}</p>
        <button @click="locations.splice(index, 1)">Delete</button>
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
      locations: [],
      newLocation: null,
      apikey: process.env.VUE_APP_API_KEY,
      baseurl: 'https://api.openweathermap.org/data/2.5/weather?q=',
      weather: {}
    }
  },
  methods: {
    greeting() {
      let date_object = new Date();
      let greeting;

      switch (true) {
        case (date_object.getHours() >= 14 && date_object.getHours() < 19):
          greeting = 'Good afternoon ';
          break;
        case (date_object.getHours() >= 19 || date_object.getHours() >= 0 && date_object.getHours() < 9):
          greeting = 'Good night ';
          break;
        case (date_object.getHours() >= 9 && date_object.getHours() < 14):
          greeting = 'Good morning ';
          break;
      }
      this.$refs.greeting.innerHTML = greeting + this.name;
    },
    addLocation() {
      this.weather = fetch(`${this.baseurl}${this.newLocation}&units=metric&appid=${this.apikey}`)
        .then(res => {
          if (res.status != 200)
            return 'error';
          return res.json();
        })
        .then(this.setResults);
    },

    setResults (results) {
      if (results == "error") {
        this.resetVar();
        return;
      }
      this.weather = results;
      this.locations.push({ title: this.newLocation, id: this.id++, weather: this.weather});
      this.resetVar();
    },

    resetVar () {
      this.newLocation = null;
      this.weather = {};
    }
  },
  mounted() {
    this.greeting();
  }
}
</script>

<style>
  @import './assets/style/main.css';
</style>

