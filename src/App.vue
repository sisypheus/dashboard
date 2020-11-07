<template>
  <div id="app">
    <div id="welcome">
      <p ref="greeting" id="greeting"></p>
      <img id="text_styling" src="@/assets/img/style_el.svg" />
    </div>

    <div id="weather">
      <img
        id="weather_image"
        v-if="weather_image != null"
        v-bind:src="require(`@/assets/img/${weather_image}`)"
      />
      <div id="weather_container">
        <p v-if="weather.name && weather.sys && weather.sys.country">
          {{ weather.name }}, {{ weather.sys.country }}
        </p>
        <p v-if="weather.main && weather.main.temp">
          {{ Math.round(weather.main.temp) }} °C
        </p>
        <p v-if="weather.weather && weather.weather[0].main">
          {{ weather.weather[0].main }}
        </p>
      </div>
    </div>

    <div v-if="quote" id="quote">
      <p v-if="quote.text" id="quote_text">
        {{ quote.text }}
      </p>
      <h2 v-if="quote.author" id="quote_author">
        {{ quote.author }}
      </h2>
    </div>

    <div id="bank">
      <h2>Bank status</h2>
      <p v-if="balance != null">{{ balance }}€, careful with that budget!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      name: "Theo",
      id: 0,
      location: "Lille",
      weather_apikey: process.env.VUE_APP_API_KEY,
      baseurl: "https://api.openweathermap.org/data/2.5/weather?q=",
      weather: {},
      weather_image: "lille.jpg",
      balance: null,
      quote: {}
    };
  },
  methods: {
    greeting() {
      let date_object = new Date();
      let hour = date_object.getHours();
      let greeting;

      if (hour >= 14 && hour < 18) greeting = "Good afternoon ";
      else if (hour >= 18 || (hour >= 0 && hour < 9)) greeting = "Good night ";
      else greeting = "Good morning ";
      this.$refs.greeting.innerHTML = greeting + this.name;
    },
    get_weather() {
      this.weather = fetch(
        `${this.baseurl}${this.location}&units=metric&appid=${this.weather_apikey}`
      )
        .then((res) => {
          if (res.status != 200) return "error";
          return res.json();
        })
        .then(this.setResults);
    },
    setResults(results) {
      if (results == "error") {
        this.weather = {};
        return;
      }
      this.weather = results;
    },
    get_balance() {
      this.$http
        .get("https://bankin-scraper.herokuapp.com/")
        .then((response) => {
          this.balance = response.data.balance;
        });
    },
    get_quote_of_the_day() {
      this.$http
        .get("https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/today")
        .then((response) => {
          this.quote = {text: response.data[0].q, author: response.data[0].a};
        });
    }
  },
  mounted() {
    this.greeting();
    this.get_weather();
    this.get_balance();
    this.get_quote_of_the_day();
  },
};
</script>

<style scoped>
@import "./assets/style/main.css";
@import "./assets/style/mobile.css";

#greeting {
  grid-area: a;
  font-size: 1.7rem;
  margin-top: 8rem;
  font-weight: 600;
}

#weather {
  grid-area: b;
  color: black;
  position: relative;
}

#weather_container {
  position: relative;
  margin-top: 5%;
  background-color: rgba(0, 0, 0, 0.8);
  width: 30%;
  margin-left: 35%;
  border-radius: 10%;
}

p {
  color: white;
  font-size: 1.3rem;
  text-align: center;
  font-weight: 400;
  text-shadow: 1px 1.2px rgba(0, 0, 0, 0.25);
}

h2 {
  text-align: center;
  font-weight: 500;
  color: white;
  font-size: 1.9rem;
}

#weather_image {
  opacity: 0.85;
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 25rem;
  border-radius: 3%;
  z-index: 0;
  object-fit: cover;
}

#bank {
  grid-area: d;
}

#text_styling {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: -10vh;
  margin-bottom: -12vh;
  height: 35vh;
  width: 35vh;
}

#quote_text {
  font-size: 2rem;
  font-weight: 600;
}

#quote_author {
  font-size: 1.6rem;
}
</style>

