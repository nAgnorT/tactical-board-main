<template>
    <NuxtLayout name="board" v-model="menu">
       
        <div class="w-full h-full">
          <Boards v-model="menu"/>
    </div>
    </NuxtLayout>
</template>
<script setup>
const menu = ref('mouse')


</script>
