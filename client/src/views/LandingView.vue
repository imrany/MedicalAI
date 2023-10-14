<script lang="ts" setup>
import {useRouter} from "vue-router"

const router=useRouter()
const year=new Date().getFullYear()
</script>
<template>
    <div class="flex flex-col" id="landing_page">
        <div class="flex justify-between items-center font-semibold text-red-500 bg-white pl-6 h-[40px]">
            <div class="flex items-center">
                <p class="text-xl ml-2">MedicalAI</p>
            </div>
            <div class="flex items-center font-normal">
                <RouterLink to="/get_verified" class="text-base w-[100px]">Try now</RouterLink>
                <RouterLink to="/signin" class="text-base ml-2 bg-red-500 items-center justify-center flex h-[40px] w-[130px] text-white">
                    <p>Login</p>
                </RouterLink>
            </div>
        </div>
        <div class="hero-image h-[90vh] max-md:pt-5 bg-no-repeat bg-contain pt-2 sm:px-20 max-sm:px-6 pb-16 w-full">
            <div class="flex flex-col">
                <div class="lg:flex gap-x-4 items-center mt-20 lg:py-10 text-white">
                    <p class="font-bold text-7xl max-md:text-4xl md:w-[680px] my-10 md:leading-[80px]">
                        Get first medical assistance.
                    </p>
                    <div class="lg:mt-24">
                        <p class="md:w-[450px] mb-10 max-sm:text-base text-lg">
                           MedicalAI is medical household program that helps users diagnose themselves, leveraging the 
                           power of machine learning to give users remedies and advice on their underlining sickness.
                        </p> 

                        <div class="flex justify-between items-center md:w-[35vw] max-md:w-[70vw] max-sm:w-[80vw] text-red-500">
                            <button class="md:w-[150px] max-md:w-[120px] max-md:text-sm max-md:h-[40px] bg-white h-[50px]  rounded-[30px] transition-all shadow-sm hover:rounded-[10px] flex justify-center items-center  font-semibold" @click="router.push('/get_verified')">Try it now</button>
                            <button class="md:w-[150px] max-md:w-[120px] max-md:text-sm max-md:h-[40px] bg-white h-[50px]  rounded-[30px] transition-all shadow-sm hover:rounded-[10px] flex justify-center items-center  font-semibold" @click="router.push('/signin')">Sign in</button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="flex flex-col items-center justify-center p-10 max-md:border-b-[1px]">
            <div style="line-height:25px;" class="mt-6 grid lg:grid-cols-3 gap-10 md:grid-cols-2 max-md:grid-cols-1 text-base  ">
               <div class="text-2xl max-md:text-lg md:font-semibold">
                    <p>Get an account and get a more personalized experience.</p>
                    <RouterLink to="/get_verified" class="text-lg max-md:text-sm font-normal underline ">Get started now</RouterLink>
               </div>
               <div class="text-2xl max-md:text-lg md:font-semibold">
                    <p>Get an account and get a more personalized experience.</p>
                    <RouterLink to="/" class="text-lg max-md:text-sm font-normal underline ">Learn more</RouterLink>
               </div>
               <div class="text-2xl max-md:text-lg md:font-semibold">
                    <p>Get an account and get a more personalized experience.</p>
                    <RouterLink to="/" class="text-lg max-md:text-sm font-normal underline">Learn more</RouterLink>
               </div>
            </div>
        </div>

        <div class="flex flex-col items-center justify-center p-10">
            <div style="line-height:25px;" class="mt-6 grid lg:grid-cols-3 gap-10 md:grid-cols-2 max-md:grid-cols-1 text-base  ">
               <div class="text-2xl max-md:text-lg md:font-semibold">
                    <p>Get an account and get a more personalized experience.</p>
                    <RouterLink to="" class="text-lg max-md:text-sm font-normal underline">Learn more</RouterLink>
               </div>
               <div class="text-2xl max-md:text-lg md:font-semibold">
                    <p>Get an account and get a more personalized experience.</p>
                    <RouterLink to="" class="text-lg max-md:text-sm font-normal underline">Learn more</RouterLink>
               </div>
               <div class="text-2xl max-md:text-lg md:font-semibold">
                    <p>Get an account and get a more personalized experience.</p>
                    <RouterLink to="" class="text-lg max-md:text-sm font-normal underline">Learn more</RouterLink>
               </div>
            </div>
        </div>

        <footer class="flex max-md:flex-col p-10 mt-10 bg-red-500 md:justify-between text-white md:items-center">
            <div class="">
                <p class="text-2xl font-semibold"><i class="icon pi pi-link mr-1"></i>Quick links</p>
                <ul class="my-3">
                    <li>
                        <RouterLink to="/signup" title="Sign up to Wekafile">Get Started</RouterLink>
                    </li>
                     <li class="mt-1">
                        <RouterLink to="/signin" title="Sign in to Wekafile">Sign in</RouterLink>
                    </li>
                     <li class="mt-2">
                        <RouterLink to="/upgrade" title="Upgrade your account">Upgrade</RouterLink>
                    </li>
                     <li class="mt-2">
                        <RouterLink to="/guide" title="Upgrade your account">Terms and conditions</RouterLink>
                    </li>
                </ul>
            </div>
            <div class="max-md:mt-6">
                <p class="text-2xl font-semibold"><i class="icon pi pi-globe text-xl mr-1"></i> Social Media links</p>
                <ul class="my-3">
                    <li>
                        <a href="https://twitter.com/matano_imran" target="_blank" class="flex">
                            <i class="icon pi pi-twitter text-base mr-1"></i>
                            <span>matano_imran</span>
                        </a>
                    </li>
                     <li class="mt-1">
                        <a href="https://www.linkedin.com/in/imranmatano/" target="_blank" class="flex">
                            <i class="icon pi pi-linkedin text-base mr-1"></i>
                            <span>imranmatano</span>
                        </a>
                    </li>
                    <li class="mt-1">
                        <a href="https://instagram.com/imrany00" target="_blank" class="flex">
                            <i class="icon pi pi-instagram text-base mr-1"></i>
                            <span>imran</span>
                        </a>
                    </li>
                     <li class="mt-2">
                         <a mailto="imranmat254@gmail.com" target="_blank" class="flex">
                            <i class="icon pi pi-google text-base mr-1"></i>
                            <span>mail</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div class="max-md:mt-6">
                <p class="text-2xl font-semibold"><i class="icon pi pi-comment text-xl mr-1"></i>Help Center</p>
                <ul class="my-3">
                    <li>
                        <a tel="+254734720752" target="_blank" class="flex">
                            <i class="icon pi pi-phone text-base mr-1"></i>
                            <span>Call us at +254734720752</span>
                        </a>
                    </li>
                     <li class="mt-1">
                        <a mailto="imranmat254@gmail.com" target="_blank" class="flex">
                            <i class="icon pi pi-envelope text-base mr-1"></i>
                            <span>Email us</span>
                        </a>
                    </li>
                     <li class="mt-1">
                        <a href="https://wa.me/254734720752" target="_blank" class="flex">
                            <i class="icon pi pi-whatsapp text-base mr-1"></i>
                            <span>Text us</span>
                        </a>
                    </li>
                    <li class="mt-1">
                        <a href="https://twitter.com/matano_imran" target="_blank" class="flex">
                            <i class="icon pi pi-twitter text-base mr-1"></i>
                            <span>Text us</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div class="my-3 max-md:flex max-md:justify-center max-md:items-center">
                <a href="https://twitter.com/matano_imran" target="_blank" class="flex">
                    <i class="icon pi pi-twitter text-base hover:bg-gray-100 text-white hover:text-black w-[30px] rounded-md flex items-center justify-center h-[30px]"></i> 
                </a>
                <a href="https://www.linkedin.com/in/imranmatano/" target="_blank" class="hover:bg-gray-100 my-1 text-white hover:text-black w-[30px] rounded-md flex items-center justify-center h-[30px]">
                    <i class="icon pi pi-linkedin text-base"></i> 
                </a>
                <a href="https://instagram.com/imrany00" target="_blank" class="hover:bg-gray-100 text-white hover:text-black w-[30px] rounded-md flex items-center justify-center h-[30px]">
                    <i class="icon pi pi-instagram text-base"></i> 
                </a>
                <a mailto="imranmat254@gmail.com" target="_blank" class="hover:bg-gray-100 my-1 text-white hover:text-black w-[30px] rounded-md flex items-center justify-center h-[30px]">
                    <i class="icon pi pi-google text-base"></i> 
                </a>
                <a href="https://wa.me/254734720752" target="_blank" class="hover:bg-gray-100 my-1 text-white hover:text-black w-[30px] rounded-md flex items-center justify-center h-[30px]">
                    <i class="icon pi pi-whatsapp text-base"></i> 
                </a>
            </div>
        </footer>
        <div class="flex items-center text-sm max-sm:text-xs justify-center">
            &copy; copyright {{year}}. All rights reserved
        </div>
    </div>
</template>
