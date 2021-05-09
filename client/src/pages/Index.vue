<template>
  <q-page class="q-pa-lg">
    <q-list bordered separator>
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
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      locationList: []
    }
  },
  mounted () {
    this.$axios.get('/api/location-list').then((response) => {
      console.log(response)
      this.locationList = response.data
    })
  }
};
</script>
