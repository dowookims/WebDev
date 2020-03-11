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
        ...mapActions('modal', ['getAllPosts']),
        ...mapMutations('modal', ['setOpen']),
        ...mapMutations('auth', ['setHasState']),
        ...mapMutations('tab', ['createTab', 'setSelectedTab']),
        ...mapMutations('board', ['setBoardData']),

        async handleClick () {
            if (this.type === 'login') {
                const userId = prompt('아이디를 입력하세요');
                const password = prompt('비밀번호를 입력하세요.');
                const res = await this.setLogin({userId, password});
                if (res) {
                    alert('로그인 되었습니다.')
                    const userData = await this.setTabData(userId, this.token);
                    const { tabs, selectedTab, hasState } = userData;
                    this.setHasState(hasState);
                    if (hasState) {
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
                location.reload();
            } else if (this.type ==='create') {
                this.setBoardData('', '');
                this.createTab({title: 'undefined', text: '', saved: false});
                this.setSelectedTab(this.tabList.length -1);
                console.log(this.tabList);
            } else if (this.type === 'load' ) {
                this.setOpen();
                this.getAllPosts(this.token);
            }else if (this.type ==='save') {
                const currentCursor = document.querySelector('.board--text').selectionStart;
                this.$store.commit('board/setCursor', currentCursor);
                const tabTitle = this.title ? this.title : this.tabList[this.selectedTab].title
                this.tabList[this.selectedTab].title = tabTitle;
                const data = {
                    id :this.tabList[this.selectedTab].id,
                    title: this.title,
                    text: this.text,
                    userId: this.userId,
                    saved: this.tabList[this.selectedTab].saved
                };

                const userData = {
                    userId: this.userId,
                    tabs: this.tabList,
                    selectedTab: this.selectedTab,
                    cursor: this.cursor
                }

                let res;
                if (data.saved) {
                    res = await api.putPost(this.token, data);
                } else {
                    res = await api.savePost(this.token, data);
                }
                if (res) {
                    alert("메모가 성공적으로 저장 되었습니다.")
                }

                this.tabList[this.selectedTab] = res.data;
                
                let userRes;
                if (this.hasState) {
                    userRes = await api.putUserData(this.token, userData);
                } else {
                    userRes = await api.postUserData(this.token, userData);
                }
                console.log("userRes", userRes);
            }
        }
    },

    computed: {
        ...mapState('auth', ['isLogin', 'userId', 'token', 'hasState']),
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