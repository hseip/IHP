<template>
<div class="bg-white">
  <div class="row">
    <div class="col-12">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>
          Help
        </q-toolbar-title>
      </q-toolbar>
    </div>
  </div>
  <div class="absolute-center">
      <h4 class="text-center q-ma-none q-pa-xs text-bold">Need help? Ask Jon</h4>
        <img src="~assets/Jon-Mannion.jpg">
  </div>
  <q-btn
    style="position:absolute;top:20px;right:20px;"
    round
    color="red"
    text-color="white"
    v-close-popup
  >
    <q-icon name="close" />
  </q-btn>
</div>
</template>
