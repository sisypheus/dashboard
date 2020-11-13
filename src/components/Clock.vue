<template>
    <div id="clock">
        <div>
            <div>
                <h1 class="text-white">{{date | capitalize}}</h1>
                <h1 class="text-white time">{{time}}</h1>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'

    export default {
        name: "Clock",
        data: function () {
            return {
                time: '',
                date: ''
            }
        },
        methods: {
            clock() {
                this.time = moment().locale('fr').format('LT');
                this.date = moment().locale('fr').format('dddd Do MMMM YYYY');
            }
        },
        mounted() {
            this.clock();
            this.$options.interval = setInterval(this.clock, 1000);
        },
        beforeDestroy() {
            clearInterval(this.$options.interval);
        },
        filters: {
            capitalize: function (value) {
                if (!value) return '';
                value = value.toString();
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        }
    }
</script>

<style scoped>
    h1 {
        margin-bottom: 0;
    }

    #clock {
        margin-top: -15vh;
    }

    .text-white {
        text-align: center;
        color: white;
    }

    .time {
        text-align: center;
    }
</style>