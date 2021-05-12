<template>
  <q-page>
    <div class="row">
      <div class="col-6">
        <q-list bordered separator class="listHeight">
          <q-item
            v-for="(location, index) in locationList"
            :key="index"
          >
            <q-item-section>{{ location.ProjectName }}</q-item-section>
            <q-item-section side>{{ location.Address }}</q-item-section>
            <q-item-section side>{{ location.Latitude }}</q-item-section>
            <q-item-section side>{{ location.Longitude }}</q-item-section>
          </q-item>
        </q-list>
        <div>
          <GChart
            type="BarChart"
            :data="chartData"
            :options="chartOptions"  
            style="height: calc((100vh / 2) - 20px);"
          />
        </div>
      </div>
      <div class="col-6">
        <div class=map id='map' />            
      </div>
    </div>
  </q-page>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader'
import { GChart } from 'vue-google-charts'
export default {
  name: 'PageIndex',
  components: {
    GChart
  },
  data () {
    return {
      locationList: [],
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
    locationList () {
      // map process
      for (const location of this.locationList) {
        const latLng = new google.maps.LatLng(location.Latitude,location.Longitude)
        const marker = new google.maps.Marker({
            position: latLng,
            title:location.Address
        })
        marker.setMap(this.map)
      }
      // chart processing
      let boroughs = this.locationList.reduce((acc, location) => {
        if (!acc[location['Borough']]) acc[location['Borough']] = 0
        acc[location['Borough']] += 1
        return acc
      }, {})
      let chartData = []
      chartData.push(['Borough', 'Locations'])
      for (const location of Object.entries(boroughs)) {
        chartData.push(location)
      }
      this.chartData = chartData      
    }
  },
  mounted () {
    const loader = new Loader({
      // apiKey: "AIzaSyDnzuLi-rwa3Mr3Bl6V4swW_o7UaUyA6BI",
      apiKey: "AIzaSyDWMpsdLHcbCdkaZ0IeXxNE6X4Cvw0Ln4w",
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
  height: calc(100vh);
  overflow:hidden;
}
.listHeight {
  height: calc(100vh / 2);
  overflow: auto;
}
</style>