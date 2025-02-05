<template>
    <div class="bg-background min-h-screen w-screen">
        <Navbar/>
    </div>
    <div class="fixed bottom-6 px-6 flex items-center justify-between text-gray w-screen">
        <nuxt-link to="/colophon">
            Colophon/Imprint
        </nuxt-link>
        <p v-if="weatherInfo">
            {{weatherInfo}}
        </p>
    </div>
</template>
<script setup>
import Navbar from "~/components/navbar.vue";
import {format} from "date-fns";
const { data: weatherInfo } = useAsyncData(async () => {
    const latitude = 52.9399 // Saskatchewan, Canada
    const longitude = -106.4509
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode&timezone=auto`

    const response = await fetch(apiUrl)
    const data = await response.json()

    // Extract temperature
    const temperature = data.current.temperature_2m

    // Map weather codes to descriptions
    const weatherDescriptions = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Drizzle: Light intensity",
        53: "Drizzle: Moderate intensity",
        55: "Drizzle: Dense intensity",
        56: "Freezing Drizzle: Light intensity",
        57: "Freezing Drizzle: Dense intensity",
        61: "Rain: Slight intensity",
        63: "Rain: Moderate intensity",
        65: "Rain: Heavy intensity",
        66: "Freezing Rain: Light intensity",
        67: "Freezing Rain: Heavy intensity",
        71: "Snowfall: Slight intensity",
        73: "Snowfall: Moderate intensity",
        75: "Snowfall: Heavy intensity",
        77: "Snow grains",
        80: "Rain showers: Slight intensity",
        81: "Rain showers: Moderate intensity",
        82: "Rain showers: Violent intensity",
        85: "Snow showers: Slight intensity",
        86: "Snow showers: Heavy intensity",
        95: "Thunderstorm: Slight or moderate",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail"
    };
    const weatherCondition = weatherDescriptions[data.current.weathercode] || 'Unknown'

    // Format time
    const formattedTime = format(new Date(data.current.time), 'h:mm a') // Example: 10:35 AM

    return `${formattedTime}, ${weatherCondition} at ${temperature} °C`
})
</script>