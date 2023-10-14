<script lang="ts" setup>
import { inject, onMounted, ref } from "vue"
import LayoutGrid from "../components/LayoutGrid.vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import { loader } from "../index";
import MobileNav from "../components/ui/MobileNav.vue";
import doctor from "../assets/images/doctor.png"

const router=useRouter()
const origin:any=inject("origin")
const route=useRoute()
const toast=useToast()
const data:any=ref({})
const userdata:any=inject("userdata")
const title="Settings"

onMounted(()=>{
    fetchUserDetails()
})

async function fetchUserDetails() {
    try {
        loader.on()
        const url=`${origin}/api/accounts/${route.query.email}`
        const response=await fetch(url,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${userdata.token}`
            }
        })
        const parseRes=await response.json()
        if (parseRes.error) {
            toast.error(parseRes.error,{
                position:"top-right",
                duration:5000,
            })
            localStorage.removeItem("userdata")
            router.back()
        } else {
            data.value=parseRes.data
        }
    } catch (error:any) {
        toast.error(error.message,{
            position:"top-right",
            duration:5000
        })
        router.back()
    }
    loader.off()
}


const open_profile=()=>{
    window.location.href=doctor
}

</script>

<template>
    <LayoutGrid>
        <template #grid-2>
           <div class="flex flex-col pb-8 pt-4 bg-white min-h-[100vh]">
                <MobileNav :title="title"/>
                <div class="mt-24 xl:mt-4  pb-7">
                    <div class="flex items-center max-sm:border-b-[1px] lg:mb-5 border-slate-200 pb-4 md:px-8 px-4">
                        <div class="flex cursor-pointer items-center flex-grow">
                            <!-- <div class=" w-[65px] h-[65px] rounded-[50px] bg-slate-300 flex justify-center items-center">
                                <i title="My profile" class="icon pi pi-user text-2xl text-gray-700 max-sm:text-lg"></i>
                            </div> -->
                            <img @click="open_profile" :src="doctor" class="w-[60px] h-[60px] rounded-[50px] object-contain"/>
                            
                            <div class="flex flex-col ml-4 flex-grow" @click="open_profile">
                                <p>{{data.username}}</p>
                                <p class="text-slate-600 text-sm max-sm:text-xs">{{data.email}}</p>
                            </div>
                        </div>
                        <i class="icon pi pi-qrcode md:text-lg cursor-pointer ml-auto"></i>
                    </div>

                    <div @click="router.push('/account')" class="md:px-8 px-4 cursor-pointer hover:bg-slate-200">
                        <div class="px-6 max-sm:px-3 py-4 flex items-center" >
                            <i class="icon pi pi-user text-xl mr-3"></i>
                            <p class="flex flex-col">
                                <span class="max-sm:text-sm">Account</span>
                                <span class="text-sm max-sm:text-xs text-slate-600">Switch account, Log out, Delete</span>
                            </p>
                        </div>
                    </div>

                    <div @click="router.push('/help')" class="md:px-8 px-4 cursor-pointer hover:bg-slate-200">
                        <div class="px-6 max-sm:px-3 py-4 flex items-center" >
                            <i class="icon pi pi-question-circle text-xl mr-3"></i>
                            <p class="flex flex-col">
                                <span class="max-sm:text-sm">Help</span>
                                <span class="text-sm max-sm:text-xs text-slate-600">Help center, Docs, contact us, privacy policy</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </LayoutGrid>
</template>
