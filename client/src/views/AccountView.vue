<script lang="ts" setup>
import { inject } from "vue"
import LayoutGrid from "../components/LayoutGrid.vue";
import { useRouter } from "vue-router";
import MobileNav from "../components/ui/MobileNav.vue";
import DesktopNav from "../components/ui/DesktopNav.vue";

const router=useRouter()
const userdata:any=inject("userdata")
const title="Account"

const logout=()=>{
    localStorage.removeItem('userdata')
    router.push("/signin")
}

async function delete_account() {
    try {
        
    } catch (error:any) {
        
    }
}
const name=!userdata.username?``:`account`

</script>

<template>
    <LayoutGrid>
        <template #grid-2>
           <div class="flex flex-col pb-8">
                <MobileNav :title="title"/>
                <DesktopNav :title="title"/>
                <div class="max-xl:mt-20 pb-7 bg-white min-h-[100vh]">
                    <div @click="logout" class="md:px-8 px-4 cursor-pointer hover:bg-yellow-200">
                        <div class="px-6 max-sm:px-3 py-4 flex items-center" >
                            <i class="icon text-gray-800 pi pi-exclamation-circle text-xl mr-3"></i>
                            <p class="flex flex-col">
                                <span class="max-sm:text-sm text-gray-800">Logout</span>
                                <span class="text-sm max-sm:text-xs text-slate-600">Sign out of your {{name}}</span>
                            </p>
                        </div>
                    </div>

                    <div @click="delete_account" class="md:px-8 px-4 cursor-pointer hover:bg-red-200">
                        <div class="px-6 max-sm:px-3 py-4 flex items-center" >
                            <i class="icon text-gray-800 pi pi-exclamation-triangle text-xl mr-3"></i>
                            <p class="flex flex-col">
                                <span class="max-sm:text-sm text-gray-800">Delete {{name}}</span>
                                <span class="text-sm max-sm:text-xs text-slate-600">By deleting your {{name}}, you will lost all your data</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </LayoutGrid>
</template>
