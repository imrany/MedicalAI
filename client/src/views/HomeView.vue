<script lang="ts" setup>
    import LayoutGrid from "../components/LayoutGrid.vue"
    import { inject, ref } from "vue";
    import { useToast } from "vue-toast-notification";
    import doctor from "../assets/images/doctor.png"
    import health from "../assets/images/Health-insurance.avif"
    import resize from "../assets/images/resize.jpeg"

    const toast=useToast()
    const userdata:any=inject('userdata')
    const origin:any=inject('origin')
    const showGrid=ref(true)
    async function handleSubmit(e:any) {
        e.preventDefault()
        try {
            const request=e.target.request.value
            showGrid.value=false
            const url=`${origin}/api/request`;
            const response=await fetch(url,{
                method:'POST',
                headers:{
                    'content-type':'application/json',
                    'authorization':`Bearer ${userdata.token}`
                },
                body:JSON.stringify({
                    prompt:request
                })
            })
            e.target.reset()
            const parseRes=await response.json();
            if(parseRes.error){
                toast.error(parseRes.error,{
                    duration:1500,
                    position:'top-right'
                })
            }else{
                const textResponse=document.querySelector('#response') as HTMLDivElement;
                let i=``;
                let data=JSON.parse(parseRes.ans);
                    i=`
                    <div class="bg-gray-50 mb-3 flex flex-col px-4 py-5 text-gray-800">
                        <div class="flex items-center">
                            <img src="${doctor}" class="mr-2 w-[45px] h-[45px] object-fit rounded-[50px]"/>
                            <p class="text-base font-semibold">${userdata.username}</p>
                        </div>
                        <div class="my-4">
                            <div class='text' title="${request} 's response">
                                <div key=${data.organic[0].position}>
                                    <p>${data.organic[0].title}</p>
                                    <p>${data.organic[0].snippet}</p>
                                    <a class="text-blue-500" href=${data.organic[0].link} target='_blank' rel='noreferrer'>View more...</a><br/>
                                    <br/>
                                </div>
                                <div key=${data.organic[1].position}>
                                    <p>${data.organic[1].title}</p>
                                    <p>${data.organic[1].snippet}</p>
                                    <a class="text-blue-500" href=${data.organic[1].link} target='_blank' rel='noreferrer'>View more...</a><br/>
                                    <br/>
                                </div>
                                <div key=${data.organic[2].position}>
                                    <p>${data.organic[2].title}</p>
                                    <p>${data.organic[2].snippet}</p>
                                    <a class="text-blue-500" href=${data.organic[2].link} target='_blank' rel='noreferrer'>View more...</a><br/>
                                    <br/>
                                </div>
                                <div key=${data.organic[3].position}>
                                    <p>${data.organic[3].title}</p>
                                    <p>${data.organic[3].snippet}</p>
                                    <a class="text-blue-500" href=${data.organic[3].link} target='_blank' rel='noreferrer'>View more...</a><br/>
                                    <br/>
                                </div>
                            </div>
                            <small>AI's response: "${parseRes.msg}"</small>
                        </div>
                    </div>
                    `
                    textResponse.innerHTML+=i
                    const bottom=document.querySelector('#bottom') as HTMLDivElement
                    bottom.scrollIntoView()
            }
        } catch (error:any) {
            console.log(error)
            showGrid.value=true
            toast.error(error.message,{
                duration:1500,
                position:'top-right'
            })
        }
    }

    const todos=[
        {
            description:`
            Prompt using common medical signs and symptoms of illnesses e.g headache, coughing, stomache...etc
            `
        },
        {
            description:`
            Avoid non-medical prompts and unusually signs this would not generate response or result to an error.
            `
        },
        {
            description:`
            Use short, precise and quick prompts for a better response. This would help you get correct responses.
            `
        }
    ]
</script>

<template>
    <LayoutGrid>
        <template #grid-2>
            <div v-if="showGrid" class="mt-10 mx-10">
                <p class="max-md:text-lg text-2xl mb-4 text-gray-700 font-semibold">Activity Overview</p>
                <div class="grid grid-cols-3 mb-3 max-md:grid-cols-1 gap-3">
                    <div class="bg-white shadow-sm shadow-slate-300 rounded-md flex justify-center items-center px-4 py-5 text-gray-800">
                        <p>Leveraging the power of machine learning, MedicalAI can take your requests and predict the possible cause.</p>
                    </div>
                    <div class="bg-white shadow-sm shadow-slate-300 rounded-md flex justify-center items-center px-4 py-5 text-gray-800">
        
                        <p>MedicalAI would provide your with almost accurate medical remedies and preventative measures.</p>
                    </div>
                    <div class="bg-white shadow-sm shadow-slate-300 rounded-md flex justify-center items-center px-4 py-5 text-gray-800">
                        <p>Get help and assistance concerning any medical related request, we serve your requests.</p>
                    </div>
                </div>

                <p class="max-md:text-lg text-2xl mb-2 mt-7 text-gray-700 font-semibold">What to do</p>
                <div class="grid grid-cols-3 max-md:grid-cols-1 gap-3">
                    <div v-for="(item,index) in todos" :key="index" class="bg-green-400 shadow-sm shadow-slate-300 rounded-md flex flex-col text-gray-800">
                        <div class="px-4 py-2">
                            <p  class="text-lg font-semibold">To-do</p>
                        </div>
                        <div class="px-4 py-2  rounded-md bg-white">
                            <p class="">{{ item.description }}</p>
                        </div>
                    </div>
                </div>

                <p class="max-md:text-lg text-2xl mb-2 mt-7 text-gray-700 font-semibold">Our Team</p>
                <div class="bg-white shadow-sm shadow-slate-300 rounded-md flex items-center px-4 py-2 w-fit font-semibold text-gray-800">
                    <img :src="doctor" class=" w-[40px] h-[40px] object-fit rounded-[50px] mr-2"/>
                    <img :src="doctor" class=" w-[40px] h-[40px] object-fit rounded-[50px] mr-2"/>
                    <img :src="doctor" class=" w-[40px] h-[40px] object-fit rounded-[50px] mr-2"/>
                    <img :src="health" class=" w-[40px] h-[40px] object-fit rounded-[50px] mr-2"/>
                    <img :src="resize" class=" w-[40px] h-[40px] object-fit rounded-[50px] mr-2"/>
                    +5
                </div>
            </div>

            <div class="mb-[100px]" id="response">
            </div>
           <form @submit="handleSubmit" class="fixed bottom-0 w-full xl:ml-[15%] xl:w-[85%] right-0 px-4 py-3 h-[75px] bg-white">
            <div class="flex">
                <input type="text" name="request" id="request" class="text-black border-blue-400 border-[1px] py-1 placeholder:text-black px-2 w-[92%] rounded-md outline-none" placeholder="Enter signs and symptoms" required/>
                <button class="ml-2  bg-blue-500 p-2 rounded-md text-sm text-white flex justify-center items-center">
                    <span>Submit</span>
                    <i class="icon pi pi-send ml-2"></i>
                </button>
            </div>
           </form>
           <div id="bottom"></div>
        </template>
    </LayoutGrid>
</template>
