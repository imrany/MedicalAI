<script setup lang="ts">
import { provide } from "vue";
import { origin } from ".";

type Userdata={
  username: string, 
  email:string, 
  photo: any,
  token:string
}

const user_data:any=localStorage.getItem("userdata")
const userdata:Userdata=JSON.parse(user_data)
provide('userdata',userdata)
provide('origin',origin)

</script>

<template>
  <RouterView/>
</template>
