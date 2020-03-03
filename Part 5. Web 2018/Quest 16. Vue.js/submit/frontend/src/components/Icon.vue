<template>
    <div 
        class="icon"
        v-if="show"
    >
        <span class="icon--name">{{ type }}</span>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'Icon',
    props: {
        type: {
            type: String
        },
    },
    data() {
        return {

        }
    },
    methods: {
    },

    computed: {
        ...mapState('auth', ['isLogin']),
        show () {
            if (this.type === 'login') {
                return !this.isLogin;
            }
            return this.isLogin
        }
    },
}
</script>

<style scoped>
.icon {
    margin-left: 20px;
    padding: 10px 25px;
    background-color: #4CD579;
    border-radius: 20px;
    cursor: pointer;
}

.icon:first-child {
    margin-left: 0;
}

.icon:hover {
    background-color: #2CB559;
}


.icon--name {
    color: #fff;
    font-weight: 700;
}
</style>