<script lang="ts" setup>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const toast=useToast()
const router=useRouter()
const email=ref("")
const origin:any=inject("origin")
const password=ref("")
const isLoading=ref(false)
const wait=ref("")
const counter=ref(0)

const handleSubmit=async(e:any)=>{
    e.preventDefault()
   if(counter.value<3){
    try {
        counter.value=counter.value+1
        if(password.value.length<7){
            toast.info("Kindly, fill in the fields as required.",{
                duration:3000,
                position:"top-right"
            }) 
        }else if(password.value.length>7){
            isLoading.value=true
            wait.value="cursor-progress bg-gray-400"
            let url=`${origin}/api/auth/login`
            const response=await fetch(url,{
                method:"POST",
                body:JSON.stringify({
                    email:email.value,
                    password:password.value
                }),
                headers:{
                    "content-type":"application/json"
                }
            })
            const parseRes=await response.json()
            if(parseRes.error){
                toast.error(parseRes.error,{
                    position:"top-right",
                    duration:1000
                })
            }else{
                toast.success(parseRes.msg,{
                    position:"top-right",
                    duration:5000
                })
                const user_data=JSON.stringify(parseRes.data)
                localStorage.setItem("userdata",user_data)
                window.location.reload()
            }
        }
        isLoading.value=false
        wait.value="cursor-pointer bg-blue-500"
    } catch (error:any) {
        isLoading.value=false
        wait.value="cursor-pointer bg-blue-500"
        console.log(error.message)
        toast.error(error.message,{
            duration:2000,
            position:"top-right"
        })
    }
   }else{
    email.value="",
    password.value=""
    toast.info("Try again in the next 50 seconds",{
        duration:8000,
        position:"top-right"
    })
    isLoading.value=true
    wait.value="cursor-progress bg-gray-400"
    setTimeout(()=>{
        counter.value=0
        isLoading.value=false
        wait.value="cursor-pointer bg-blue-500"
    },50000)
   }
}

const checkInput=()=>{
    if(password.value.length<6&&!email.value){
        isLoading.value=true
        wait.value="cursor-not-allowed"
    }else if(password.value.length>6&&email.value){
        isLoading.value=false
        wait.value="cursor-pointer"
    }
}
</script>
<template>
    <div class="flex flex-col bg-white justify-center items-center h-[100vh]">
        <div class="flex flex-col justify-center items-center md:w-[350px] max-md:w-[80vw] ">
            <p class="text-2xl font-semibold mb-4 text-gray-700">Sign in to <span class="text-blue-500">MedicalAI</span></p>
            <form class="my-3 flex flex-col w-full" @submit="handleSubmit" @keydown="checkInput" >
                <label for="email" class="ml-1 flex justify-between max-md:text-sm"><span>Enter your email</span></label>
                <input type="email" v-model="email" id="email" name="email" class="mt-2 h-[40px] border-blue-400 border-[1px] bg-white rounded-lg focus:outline-1 focus:outline-blue-500 py-2 px-4 placeholder:text-gray-900" placeholder="johndoe@example.com" required/>
                <label for="password" class="ml-1 mt-4 flex justify-between max-md:text-sm"><span>Enter password</span> <span class="text-red-600 text-sm" v-if="password.length<8&&password.length>0">Requires a minimum of 8 letters</span></label>
                <input type="password" :maxlength="24" v-model="password" id="password" name="password" class="mt-2 h-[40px] border-blue-400 border-[1px] bg-white rounded-lg focus:outline-1 focus:outline-blue-500 py-2 px-4 placeholder:text-gray-900" placeholder="Password" required/>
                <div class="flex justify-between gap-2 max-sm:text-sm">
                    <button type="button" @click="router.back()" class="font-semibold flex my-3 mt-6 justify-center items-center rounded-[50px] h-[40px] max-sm:w-[130px] w-[150px] border-[1px] border-blue-500 text-black">
                        Back
                    </button>
                    <button :class="wait" :disabled="isLoading" class="w-[150px] font-semibold flex my-3 mt-6 justify-center items-center rounded-[50px] h-[40px] max-sm:w-[130px] bg-blue-500 text-white">
                        Sign in
                    </button>
                </div>
            </form>
            <div class="flex justify-between items-center gap-10 mb-10 w-full text-sm max-sm:text-xs">
                <div @click="router.push('/get_verified')" class="text-blue-500 font-semibold  cursor-pointer">Create an account?</div>
                <div  class="text-blue-500 font-semibold cursor-pointer">Forgot password?</div>
            </div>
        </div>
    </div>
</template>
