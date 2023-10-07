<script lang="ts" setup>
    import LayoutGrid from "../components/LayoutGrid.vue"
</script>

<template>
    <LayoutGrid>
        <template #grid-2>
           <form class="fixed bottom-0 w-full xl:ml-[15%] xl:w-[85%] right-0 px-4 py-3 bg-gray-800 h-[60px] ">
            <div class="flex">
                <input class="text-black py-1 placeholder:text-black px-2 w-[95%] rounded-sm outline-none" placeholder="Enter signs and symptoms"/>
                <button class="ml-2 text-white flex justify-center items-center">
                    <span>Submit</span>
                    <i class="icon pi pi-send ml-2"></i>
                </button>
            </div>
           </form>
        </template>
    </LayoutGrid>
</template>
