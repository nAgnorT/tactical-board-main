<template>
    <div class="w-screen h-screen">
      <header class="shadow-sm bg-white">
        <nav class="container mx-auto p-4">
          <NuxtLink to ="/board" class="font-bold">Board</NuxtLink>
        </nav>
      </header>
      <div class=" mx-auto p-4 w-11/12 h-3/4">
        <div class = "flex justify-center">
  <button id="mouse" width="100" height="30" class="svg-button" @click="updateAction('mouse')" >mouse</button>
  <button id="homeplayer"  width="100" height="30" class="svg-button" @click="updateAction('homeplayer')" >Vẽ cầu thủ đội nhà</button>
  <button id="awayplayer"  width="100" height="30" class="svg-button" @click="updateAction('awayplayer')" >Vẽ cầu thủ đội khách</button>
  <button id="line"  width="100" height="30"class="svg-button" @click="updateAction('line')">Vẽ đường thẳng</button>
  <button id="curve"  width="100" height="30" class="svg-button" @click="updateAction('curve')">Vẽ duong cong</button>
  <button id="polygon"  width="100" height="30" class="svg-button" @click="updateAction('polygon')">Vẽ da giac</button>
  <button id="draw"  width="100" height="30"class="svg-button" @click="updateAction('draw')">Vẽ tu do</button>
  <button id="delete"  width="100" height="30"class="svg-button" @click="updateAction('delete')">Xoa tat ca</button>
  <button id="22ct"  width="100" height="30"class="svg-button" @click="updateAction('22ct')">22ct</button>
    </div> 
        <slot />
    </div>
    <!-- <footer class="container mx-auto p-4 flex justify-between border-t-2">
        <ul class="flex gap-4">
          <li>
            <NuxtLink to ="/" >Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to ="/Board" >Products</NuxtLink>
          </li>
        </ul>
        </footer> -->
    </div>
  </template>
  <script setup>
    const menu = defineModel()
    const updateAction = (action) => {
  menu.value = action
}
  </script>
