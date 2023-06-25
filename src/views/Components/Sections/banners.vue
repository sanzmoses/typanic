<template lang="">
  <div class="q-pa-md q-py-xl">

    <q-chip square size="lg" class="text-weight-bold">
      <q-avatar icon="star" color="accent" text-color="black" />
      Banners
    </q-chip>

    <p class="q-my-xl"></p>

    <div class="q-pa-md q-gutter-sm">

      <q-banner inline-actions rounded class="bg-orange text-white">
        You have lost connection to the internet. This app is offline.

        <template v-slot:action>
          <q-btn flat label="Turn ON Wifi" />
          <q-btn flat label="Dismiss" />
        </template>
      </q-banner>

      <q-banner class="bg-primary text-black">
        Unfortunately, the credit card did not  go through, please try again.
        <template v-slot:action>
          <q-btn flat color="black" label="Dismiss" />
          <q-btn flat color="black" label="Update Credit Card" />
        </template>
      </q-banner>

      <q-banner class="bg-red">
        <template v-slot:avatar>
          <q-icon name="signal_wifi_off" color="white" />
        </template>
        You have lost connection to the internet. This app is offline.
        <template v-slot:action>
          <q-btn flat color="white" label="Turn on Wifi" />
        </template>
      </q-banner>

    </div>

  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="">
  
</style>