<template>
    <div 
        class="icon"
        v-if="show"
        @click="handleClick"
    >
        <span class="icon--name">{{ type }}</span>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
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
        ...mapActions('auth', [ 'setLogin', 'setLogout']),
        ...mapMutations('tab', ['createTab']),
        async handleClick () {
            if (this.type === 'login') {
                const userId = prompt('아이디를 입력하세요');
                const password = prompt('비밀번호를 입력하세요.');
                const res = await this.setLogin({userId, password});
                if (res) {
                    alert('로그인 되었습니다.')
                } else {
                    alert('아이디 또는 비밀번호가 틀렸습니다.')
                }
            } else if (this.type === 'logout') {
                this.setLogout();
                alert('로그아웃 되었습니다.')
            } else if (this.type ==='create') {
                this.createTab();
            }
        }
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