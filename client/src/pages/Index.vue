<template>
  <q-page>
    <q-ajax-bar
      ref="bar"
      position="top"
      color="red"
      size="5px"
    />
    <q-bar class="bg-secondary text-white">
      <q-btn flat round dense icon="menu" class="text-white" >
                <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup @click="help=true">
              <q-item-section>About BASE</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
        </q-btn>
      <div class="text-weight-bold">
        Bronx Academy of Software Engineering - Inclusionary Housing Project
      </div>
    </q-bar>
    <q-select color="teal" filled v-model="borough" :options="boroughs" label="Select a New York city borough">
      <template v-slot:prepend>
        <q-avatar size="45px">
        <img src="~assets/Statue-of-Liberty.jpg">
      </q-avatar>
      </template>
    </q-select>
    <div class="row">
      <div class="col-6">
        <q-list bordered separator class="listHeight">
          <q-item
            v-for="(location, index) in filteredLocations"
            :key="index"
          >
            <q-item-section>{{ location.ProjectName }}</q-item-section>
            <q-item-section side>{{ location.Address }}</q-item-section>
            <q-item-section side>{{ location.Latitude }}</q-item-section>
            <q-item-section side>{{ location.Longitude }}</q-item-section>
          </q-item>
        </q-list>
        <div class="relative-position chartHeight">
          <div v-if="chartData.length > 1">
            <GChart
              type="BarChart"
              :data="chartData"
              :options="chartOptions"  
              class="chartHeight"
            />
          </div>
          <div v-else>
            <p class="q-ma-none absolute-center">There are no projects in {{ this.borough }}.</p>          
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class=map id='map' />            
      </div>
    </div>
        <q-dialog
      v-model="curtain"
      persistent
      :maximized="true"
      transition-show=""
      transition-hide="slide-up"
    >
      <curtain />
    </q-dialog>
        <q-dialog
      v-model="help"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-up"
    >
      <about />
    </q-dialog>
  </q-page>
</template>

<script>
import About from 'pages/About'
import Curtain from 'pages/Curtain'
import { Loader } from '@googlemaps/js-api-loader'
import { GChart } from 'vue-google-charts'
export default {
  name: 'PageIndex',
  components: {
    GChart,
    About,
    Curtain
  },
  data () {
    return {
      help: false,
      curtain: true,
      borough: null,
      boroughs: ['all boroughs', 'Manhattan', 'Bronx', 'Brooklyn', 'Queens', 'Staten Island'],
      locationList: [],
      filteredLocations: [],
      mapMarkers: [],
      map: null,
      mapOptions: {
        center: {
          lat: 40.752655,
          lng: -73.977295
        },
        zoom: 10
      },
      chartData: [],
      chartOptions: {
        title: 'NYC Locations by Borough',
        titleTextStyle: {
          fontSize: 18,
          color: '#1976d2'
        },
        legend: { position: 'none' },
        vAxis: {
          textStyle: {
            fontSize: 14
          }
        }
      }
    }
  },
  watch: {
    borough () {
      this.filteredLocations = this.locationList.filter(location => location.Borough === this.borough || this.borough === 'all boroughs')
      this.updateDisplay()
    },
    locationList () {
      this.filteredLocations = this.locationList
      this.updateDisplay()
    }
  },
  methods: {
    updateDisplay () {
      // map process
      for( const marker of this.mapMarkers) {
        marker.setMap(null)
      }
      this.mapMarkers.length = 0
      for (const location of this.filteredLocations) {
        const latLng = new google.maps.LatLng(location.Latitude,location.Longitude)
        const marker = new google.maps.Marker({
            position: latLng,
            title:location.Address
        })
        this.mapMarkers.push(marker)
        marker.setMap(this.map)
      }
      // chart processing
      let boroughs = this.filteredLocations.reduce((acc, location) => {
        if (!acc[location['Borough']]) acc[location['Borough']] = 0
        acc[location['Borough']] += 1
        return acc
      }, {})
      let chartData = []
      this.chartData = []
      chartData.push(['Borough', 'Locations'])
      for (const location of Object.entries(boroughs)) {
        chartData.push(location)
      }
      this.chartData = chartData 
    }
  },
  mounted () {
    const loader = new Loader({
      apiKey: process.env.GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ["places"]
    })
    loader
      .load()
      .then(() => {
        this.map = new google.maps.Map(document.getElementById('map'), this.mapOptions)
      })
      .then(() =>{
        return this.$axios.get('/api/location-list')
      }).then((response) => {
          console.log(response)
          this.locationList = response.data
      })
      .catch(e => {
        console.log(e)
        this.$q.notify({
          message: e.toString(),
          type: 'negative'
        })
      })
  }
}
</script>
<style scoped>
.map {
  width: calc(100vw / 2); 
  height: calc(100vh - 88px);
  overflow:hidden;
}
.listHeight {
  height: calc(100vh / 2 - 88px);
  overflow: auto;
}
.chartHeight {
  height: calc((100vh / 2) - 20px);
}
</style>