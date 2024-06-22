<template>
    <NuxtLayout name="board" v-model="menu">
        <div class = "flex justify-center">
  <button id="mouse" width="100" height="30" class="svg-button" @click="updateAction('mouse')" >mouse</button>
  <button id="homeplayer"  width="100" height="30" class="svg-button" @click="updateAction('homeplayer')" >Vẽ cầu thủ đội nhà</button>
  <button id="awayplayer"  width="100" height="30" class="svg-button" @click="updateAction('awayplayer')" >Vẽ cầu thủ đội khách</button>
  <button id="line"  width="100" height="30"class="svg-button" @click="updateAction('line')">Vẽ đường thẳng</button>
  <button id="curve"  width="100" height="30" class="svg-button" @click="updateAction('curve')">Vẽ duong cong</button>
  <button id="polygon"  width="100" height="30" class="svg-button" @click="updateAction('polygon')">Vẽ da giac</button>
  <button id="draw"  width="100" height="30"class="svg-button" @click="updateAction('draw')">Vẽ tu do</button>
  <button id="delete"  width="100" height="30"class="svg-button" @click="updateAction('delete')">Xoa tat ca</button>
    </div>        
        <div class="w-full h-full" v-if="loaded">
          <Boards v-model="menu"/>
    </div>
    </NuxtLayout>
</template>
<script setup>
//   import { useActionStore } from '~/stores/store';
//   import { createPinia } from 'pinia'
// import { createApp } from 'vue'
// import App from '~/App.vue'
// defineEmits(['updateAction'])
// const pinia = createPinia()
// const app = createApp(App)
// app.use(pinia)
//   const dataStore = useActionStore();
//   const updateAction = dataStore.updateData;
const menu = ref('mouse')
const loaded = ref(true)
const updateAction = (action) => {
  menu.value = action
  loaded.value = false
  loaded.value = true
}

</script>
