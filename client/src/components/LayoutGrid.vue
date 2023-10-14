<script setup lang="ts">
import { inject, onMounted, ref } from "vue"
import { RouterLink, useRoute, useRouter } from "vue-router"
import doctor from "../assets/images/doctor.png"

const userdata:any=inject("userdata")
const router=useRouter()
const status:any=ref({
  bool:true,
  message:""
})
const route=useRoute()

onMounted(()=>{
  getStatus()
})

function getStatus(){
  if(!navigator.onLine){
    status.value.bool=false
    status.value.message="No internet connection"
  }
}
const reload=()=>window.location.reload()

</script>

<template>
  <div class="flex min-h-[100vh]">
    <div v-if="userdata" class="md:w-[15%] fixed border-r-[1px] border-blue-100 top-0 bottom-0 shadow-sm left-0 pt-[8px] pb-5 text-slate-700" id="sideshow">
      <RouterLink to="/" class="font-bold text-2xl pr-12 pl-7 text-blue-500">
        MedicalAI
      </RouterLink>
      <div class="flex font-semibold flex-col w-full mt-8">
        <div class="flex flex-col">
          <div class="px-4">
            <RouterLink to="/home" class="rounded-[5px] hover:bg-blue-100 ">
              <div class="px-6 py-2 rounded-[5px] bg-blue-100 transition-all" v-if="route.fullPath.includes('/home')">
                <i class="icon pi pi-th-large mr-2"></i>
                <span>Overview</span>
              </div>
              <div class="px-6 py-2"  v-else>
                <i class="icon pi pi-th-large mr-2"></i>
                <span>Overview</span>
              </div>
            </RouterLink>
  
            <div @click="router.push(`/users?email=${userdata.email}`)" class="my-1 cursor-pointer rounded-[5px] hover:bg-blue-100">
              <div class="rounded-[5px] px-6 bg-blue-100 py-2 transition-all" v-if="route.fullPath===`/users?email=${userdata.email}`">
                <i class="icon pi pi-cog mr-2"></i>
                <span>Settings</span>
              </div>
              <div class="px-6 py-2" v-else>
                <i class="icon pi pi-cog mr-2"></i>
                <span>Settings</span>
              </div>
            </div>
          </div>

          <div class="fixed bottom-0 bg-gray-100 pb-[19px] pt-4 w-fit px-4">
            <div class="flex items-center">
              <img :src="doctor" class=" w-[40px] h-[40px] rounded-[50px] mr-2"/>
              <p>{{ userdata.username }}</p>
              <div @click="router.push(`/users?email=${userdata.email}`)" class="cursor-pointer ml-[53px]">
                <i class="icon pi pi-cog text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="userdata?'xl:ml-[15%] xl:w-[85%]':'xl:w-[100%]'" class="bg-blue-50" id="panel">
      <div class='preload'></div>
      <div class="bg-blue-500 text-white" v-if="status.bool==false">
        <div class="flex justify-center items-center h-3 text-xs sm:text-sm  py-2">
          <p>{{status.message}}</p>
        </div>
      </div>
      <slot name="grid-2"></slot>
    </div>
  </div>
</template>
