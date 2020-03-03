<template>
    <nav class="tab-list">
        <div class="icon--div">
            <Icon 
                v-for="(icon, idx) in icons"
                :key= "idx"
                :type= "icon"
            />
        </div>
        <div class="tab--div">
            <Tab />
        </div>
    </nav>
</template>

<script>
import Icon from './Icon';
import Tab from './Tab';

export default {
    name: 'TabList',
    components: { Icon, Tab },
    data() {
        return {
            icons: ['login', 'logout', 'create', 'load', 'save'],
        }
    },
    methods: {
    },
}
</script>

<style scoped>
.tab-list {
    margin-top: 20px;
    display: flex;
}

.icon--div {
    padding-left: 50px;
    display: flex;
}

.tab--div {
    display: flex;
    background-color: yellow;
}
</style>