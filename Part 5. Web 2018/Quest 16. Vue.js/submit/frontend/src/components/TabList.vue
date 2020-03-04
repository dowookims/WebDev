<template>
    <nav class="tab-list">
        <div class="icon--div">
            <Icon 
                v-for="(icon, idx) in icons"
                :key= "idx"
                :type= "icon"
            />
        </div>
        <div 
            class="tab--div"
            v-if="isLogin"
        >
            <Tab 
                v-for="(tab, idx) in tabList"
                :key="idx"
                :title="tab.title"
                :text="tab.text"
            />
        </div>
    </nav>
</template>

<script>
import Icon from './Icon';
import Tab from './Tab';
import { mapState } from 'vuex';
export default {
    name: 'TabList',
    components: { Icon, Tab },
    data() {
        return {
            icons: ['login', 'logout', 'create', 'load', 'save'],
        }
    },
    methods: {},
    computed: {
        ...mapState('tab', ['tabList']),
        isLogin() { 
            return this.$store.state.auth.isLogin 
        }
    }
}
</script>

<style scoped>
.tab-list {
    display: flex;
    height: 100px;
    margin-top: 20px;
}

.icon--div {
    display: flex;
    align-items: center;
    height: 50px;
    padding-left: 50px;
}

.tab--div {
    display: flex;
    height:50px;
    margin-left: 30px;
    width: 920px;
    padding-top: 5px;
    overflow-x: scroll;
}
</style>