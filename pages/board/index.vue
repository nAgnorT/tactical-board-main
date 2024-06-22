<template>
    <NuxtLayout name="board" v-model="menu">
       
        <div class="w-full h-full">
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


</script>
