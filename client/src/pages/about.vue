<template>
<div class="bg-white">
  <q-toolbar class="bg-white">
    <img src="~assets/BASE-logo.png" width="10%" class="q-ml-lg">
    <q-toolbar-title>
      <h4  class="q-ml-lg" style="font-family: Sanchez; font-weight:bold; color:#999;">Bronx Academy for Software Engineering</h4>
  </q-toolbar-title>
  </q-toolbar>
  <q-card class="q-ml-lg q-mb-lg q-mr-lg q-mt-none">
  <div class="q-pa-lg">
    <h5 class="q-ma-none text-bold">What we believe</h5>
    <p style="font-size: 18px;">
      Computer science and software engineering are skills of the 21st century – they develop the kind of thinking that everyone needs to be successful: analytic thinking, creative problem solving, effective teamwork.
    </p>
    <img src="~assets/BASE-class.png" width="100%">
  </div>
  </q-card>
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
