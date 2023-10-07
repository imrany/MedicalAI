<script lang="ts" setup>
    import LayoutGrid from "../components/LayoutGrid.vue"
    import { inject, ref } from "vue";

    const userdata:any=inject('userdata')
    const showGrid=ref(true)
    async function handleSubmit(e:any) {
        e.preventDefault()
        try {
            const request=e.target.request.value
            showGrid.value=false
            console.log(request)
        } catch (error:any) {
            console.log(error)
        }
    }
</script>

<template>
    <LayoutGrid>
        <template #grid-2>
            <!-- <div v-if="showGrid" class="grid grid-cols-3 max-md:grid-cols-1 gap-3 mt-10 mx-10">
                <div class="bg-gray-200 rounded-md flex justify-center items-center px-4 py-5 text-gray-800">
                    <p>Leveraging the power of machine learning, MedicalAI can take your requests and predict the possible cause.</p>
                </div>
                <div class="bg-gray-200 rounded-md flex justify-center items-center px-4 py-5 text-gray-800">
    
                    <p>MedicalAI would provide your with almost accurate medical remedies and preventative measures.</p>
                </div>
                <div class="bg-gray-200 rounded-md flex justify-center items-center px-4 py-5 text-gray-800">
                    <p>Get help and assistance concerning any medical related request, we serve your requests.</p>
                </div>
            </div> -->

            <div>
                <div class="bg-gray-200 mb-3 flex flex-col px-4 py-5 text-gray-800">
                    <div class="flex items-center">
                        <div class="w-[40px] h-[40px] rounded-[5px] bg-gray-800 flex mr-2 justify-center items-center">
                            <i title="My profile" class="icon pi pi-user  text-white"></i>
                        </div>
                        <p class="text-lg">{{ userdata.username }}</p>
                    </div>
                    <div class="my-4">
                        <p>
                            You are sick from malaria
                        </p>
                    </div>
                </div>
                <div class="bg-gray-200 mb-3 flex flex-col px-4 py-5 text-gray-800">
                    <div class="flex items-center">
                        <div class="w-[40px] h-[40px] rounded-[5px] bg-gray-800 flex mr-2 justify-center items-center">
                            <i title="My profile" class="icon pi pi-user  text-white"></i>
                        </div>
                        <p class="text-lg">{{ userdata.username }}</p>
                    </div>
                    <div class="my-4">
                        <p>
                            You are sick from malaria
                        </p>
                    </div>
                </div>
            </div>
           <form @submit="handleSubmit" class="fixed bottom-0 w-full xl:ml-[15%] xl:w-[85%] right-0 px-4 py-3 bg-gray-800 h-[75px] ">
            <div class="flex">
                <input type="text" name="request" id="request" class="text-black py-1 placeholder:text-black px-2 w-[95%] rounded-sm outline-none" placeholder="Enter signs and symptoms" required/>
                <button class="ml-2 text-white flex justify-center items-center">
                    <span>Submit</span>
                    <i class="icon pi pi-send ml-2"></i>
                </button>
            </div>
           </form>
        </template>
    </LayoutGrid>
</template>
