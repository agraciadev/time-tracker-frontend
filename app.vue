<script setup>
import { ref, watch } from 'vue'
import { useDisplay } from 'vuetify'
import Errors from "@/components/errors.vue"

const { mobile } = useDisplay()
const drawer = ref(false)
const group = ref(null)
const items = ref([
  {
    text: "Tracker",
    icon: "mdi-clock",
    to: "/"
  },
  {
    text: "List",
    icon: "mdi-list-box",
    to: "/list"
  }
])

watch(group, () => {
  drawer.value = false
})

onMounted(() => {
  drawer.value = !mobile.value
})

</script>



<template>
  <v-layout>
    <v-app-bar color="primary" prominent>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Time tracker</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary" variant="plain" :to="item.to">
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.text" link></v-list-item-title>
      </v-list-item>
    </v-navigation-drawer>

    <v-main style="height: 500px;">
      <v-card-text>
        <nuxtPage />
      </v-card-text>
    </v-main>
    <Errors />
  </v-layout>
</template>
