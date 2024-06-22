<template>
    <div class="w-screen h-screen">
      <header class="shadow-sm bg-white">
        <nav class="container mx-auto p-4">
          <NuxtLink to ="/board" class="font-bold">Board</NuxtLink>
        </nav>
      </header>
      <div class=" mx-auto p-4 w-11/12 h-3/4">

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

  </script>
