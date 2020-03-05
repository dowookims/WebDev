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
import api from '../api';
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
        ...mapActions('tab', ['setTabData', 'setTitle']),
        ...mapMutations('tab', ['createTab', 'setSelectedTab']),
        ...mapMutations('board', ['setBoardData']),

        async handleClick () {
            if (this.type === 'login') {
                const userId = prompt('아이디를 입력하세요');
                const password = prompt('비밀번호를 입력하세요.');
                const res = await this.setLogin({userId, password});
                if (res) {
                    alert('로그인 되었습니다.')
                    const { tabs, selectedTab } = this.setTabData(this.token);
                    if (tabs) {
                        const tab = tabs[selectedTab];
                        const boardDOM = document.querySelector('.board--text');
                        boardDOM.focus();
                        boardDOM.selectionStart = this.cursor;
                        this.setBoardData({ title: tab.title, text: tab.text});
                    } else {
                        this.setBoardData({ title: 'undefined', text: ''});
                    }
                } else {
                    alert('아이디 또는 비밀번호가 틀렸습니다.')
                }
            } else if (this.type === 'logout') {
                this.setLogout();
                alert('로그아웃 되었습니다.')
            } else if (this.type ==='create') {
                this.createTab();
                this.setSelectedTab(this.tabList.length-1);
            } else if (this.type ==='save') {
                const currentCursor = document.querySelector('.board--text').selectionStart;
                this.$store.commit('board/setCursor', currentCursor);
                this.tabList[this.selectedTab].title = this.title;
                const data = {
                    title: this.title,
                    text: this.text,
                    userId: this.userId
                };
                const userData = {
                    userId: this.userId,
                    tabs: this.tabList,
                    selectedTab: this.selectedTab,
                    cursor: this.cursor
                }
                const res = await api.savePost(this.token, data);
                const userRes = await api.postUserData(this.token, userData)
                console.log(res);
                console.log(userRes);
                alert("SAVED");
            }
        }
    },

    computed: {
        ...mapState('auth', ['isLogin', 'userId', 'token']),
        ...mapState('tab', ['tabList', 'selectedTab', 'cursor']),
        ...mapState('board', ['title', 'text']),
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