<template>
    <div class="tab">
        <div class="tab--name-div">
            <span class="tab--name-span">{{ title }}</span>
        </div>
        <div class="tab--close-div">
            <span 
                class="tab--close-span"
                @click="$emit('handleClose')">
                &times;
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Tab',
    props: {
        title: String,
        text: String
    },
    methods: {
        handleClose() {

        }
    }
}
</script>

<style scoped>
.tab {
    display: flex;
    position: relative;
    align-items: center;
    background-color: #bbb;
    min-width: 150px;
    max-width: 150px;
    padding: 10px;
    height: 30px;
    cursor: pointer;
}

.tab:hover {
    background-color: #999;
}

.tab--name-div {
    max-width: 120px;
    overflow-x: hidden;
    
}

.tab--close-div {
    position: absolute;
    text-align: center;
    width: 20px;
    height: 20px;
    right: 0px;
    cursor: pointer;
    border-right: 1px solid #555;
}

.tab--close-div:hover {
    background-color: #aaa;
    border-radius: 50%;
}



</style>