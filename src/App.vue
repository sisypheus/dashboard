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
      <h2>Bank</h2>
      <div id="bank_wrapper">
        <img class="bill left" src="@/assets/img/money.png"/>
        <p id ="balance" v-if="balance != null">{{ balance }}€</p>
        <img class="bill right" src="@/assets/img/money.png"/>
      </div>
    </div>

    <div id="clock_wrapper">
      <Clock></Clock>
      <img id="clock_img" src="@/assets/img/clock.png"/>
    </div>
  </div>
</template>

<script>
import Clock from './components/Clock.vue';

export default {
  name: "App",
  data() {
    return {
      name: "Theo",
      id: 0,
      location: "Lille",
      weather_apikey: "9c08c70c211d111c1764de9691e3c902",
      baseurl: "https://api.openweathermap.org/data/2.5/weather?q=",
      weather: {},
      weather_image: "lille.jpg",
      balance: null,
      quote: {}
    };
  },
  components: {
    'Clock': Clock,
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
        `${this.baseurl}${this.location}&units=metric&appid=${this.weather_apikey}`)
        .then((res) => {
          if (res.status != 200)
            return "error";
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
        })
        .catch(() => {
          this.balance = Math.floor(Math.random() * (50 - 357 + 1) + 257);
        });
    },
    get_quote_of_the_day() {
      this.$http
        .get('https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/today')
        .then((response) => {
          this.quote = {text: response.data[0].q, author: response.data[0].a};
        })
        .catch(() => {
          this.quote = {text: 'Make your own quote', author: 'You'};
          return;
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

#welcome {
  margin-top: 1.2rem;
  margin-left: 25%;
  margin-top: 6rem;
  margin-bottom: 4rem;
  background-color: #01032e;
  border-radius: 5%;
  box-shadow: 10px 5px 5px #010324;
  width: 50%;
}

#greeting {
  grid-area: a;
  font-size: 2rem;
  font-weight: 600;
}

#weather {
  grid-area: b;
  color: black;
  position: relative;
  margin-top: 1.2rem;
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
  background-color: #01032e;
  border-radius: 10%;
  box-shadow: 10px 5px 5px #010324;
  margin-left: 32.5%;
  width: 35%;
  height: 65%;
}

#text_styling {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: -12vh;
  margin-bottom: -10vh;
  height: 35vh;
  width: 35vh;
}

#quote {
  background-color: #01032e;
  border-radius: 10%;
  box-shadow: 10px 5px 5px #010324;
  width: 82%;
  margin-top: 2rem;
  margin-left: 9%;
}

#quote_text {
  font-size: 2rem;
  font-weight: 600;
  margin-left: 2.5rem;
  margin-right: 2.5rem;
}

#quote_author {
  font-size: 1.6rem;
  margin-bottom: -.5rem;
}

#clock_wrapper {
  background-color: #01032e;
  border-radius: 10%;
  box-shadow: 10px 5px 5px #010324;
  margin-left: 19%;
  margin-top: -15vh;
  margin-bottom: 1.5rem;
  width: 62%;
}

#clock_img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1.2rem;
  width: 20%;
  height: auto;
}

#bank {
  margin-top: 4rem;
}

#bank_wrapper {
  display: inline-block;
  text-align: center;
}

.left, .right {
  display: inline-block;
}

.bill {
  vertical-align: middle;
  width: 15%;
}

#balance {
  display: inline-block;
  margin: 1rem;
  margin-top: -5rem;
  font-size: 1.5rem;
  font-weight: 600;
}
</style>