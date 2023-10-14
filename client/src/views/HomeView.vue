<script lang="ts" setup>
    import LayoutGrid from "../components/LayoutGrid.vue"
    import { inject, ref } from "vue";
    import { useToast } from "vue-toast-notification";

    const toast=useToast()
    const userdata:any=inject('userdata')
    const origin:any=inject('origin')
    const showGrid=ref(true)
    async function handleSubmit(e:any) {
        e.preventDefault()
        try {
            const request=e.target.request.value
            showGrid.value=false
            const url=`${origin}/api`;
            const response=await fetch(url,{
                method:'POST',
                headers:{
                    'content-type':'application/json'
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
                    <div class="bg-gray-200 mb-3 flex flex-col px-4 py-5 text-gray-800">
                        <div class="flex items-center">
                            <div class="w-[35px] h-[35px] rounded-[5px] bg-blue-400 flex mr-2 justify-center items-center">
                                <i title="My profile" class="icon pi pi-user  text-white"></i>
                            </div>
                            <p class="text-base">${userdata.username}</p>
                        </div>
                        <div class="my-4">
                            <p class="req"> ${request}  <small> <i>AI's response: "${parseRes.msg}"</i></small></p>
                            <div class='text' title="${request} 's response">
                                <div key=${data.organic[0].position}>
                                    <p>${data.organic[0].title}</p>
                                    <p>${data.organic[0].snippet}</p>
                                    <a href=${data.organic[0].link} target='_blank' rel='noreferrer'>View more...</a><br/>
                                    <br/>
                                </div>
                                <div key=${data.organic[1].position}>
                                    <p>${data.organic[1].title}</p>
                                    <p>${data.organic[1].snippet}</p>
                                    <a href=${data.organic[1].link} target='_blank' rel='noreferrer'>View more...</a><br/>
                                    <br/>
                                </div>
                                <div key=${data.organic[2].position}>
                                    <p>${data.organic[2].title}</p>
                                    <p>${data.organic[2].snippet}</p>
                                    <a href=${data.organic[2].link} target='_blank' rel='noreferrer'>View more...</a><br/>
                                    <br/>
                                </div>
                                <div key=${data.organic[3].position}>
                                    <p>${data.organic[3].title}</p>
                                    <p>${data.organic[3].snippet}</p>
                                    <a href=${data.organic[3].link} target='_blank' rel='noreferrer'>View more...</a><br/>
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                    textResponse.innerHTML+=i
                    const bottom=document.querySelector('#bottom') as HTMLDivElement
                    bottom.scrollIntoView()
            }
        } catch (error:any) {
            console.log(error)
            toast.error(error.message,{
                duration:1500,
                position:'top-right'
            })
        }
    }
</script>

<template>
    <LayoutGrid>
        <template #grid-2>
            <div v-if="showGrid" class="grid grid-cols-3 max-md:grid-cols-1 gap-3 mt-10 mx-10">
                <div class="bg-gray-200 rounded-md flex justify-center items-center px-4 py-5 text-gray-800">
                    <p>Leveraging the power of machine learning, MedicalAI can take your requests and predict the possible cause.</p>
                </div>
                <div class="bg-gray-200 rounded-md flex justify-center items-center px-4 py-5 text-gray-800">
    
                    <p>MedicalAI would provide your with almost accurate medical remedies and preventative measures.</p>
                </div>
                <div class="bg-gray-200 rounded-md flex justify-center items-center px-4 py-5 text-gray-800">
                    <p>Get help and assistance concerning any medical related request, we serve your requests.</p>
                </div>
            </div>

            <div class="mb-[100px]" id="response">
               
            </div>
           <form @submit="handleSubmit" class="fixed bottom-0 w-full xl:ml-[15%] xl:w-[85%] right-0 px-4 py-3 h-[75px] bg-white">
            <div class="flex">
                <input type="text" name="request" id="request" class="text-black border-blue-400 border-[1px] py-1 placeholder:text-black px-2 w-[95%] rounded-md outline-none" placeholder="Enter signs and symptoms" required/>
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
