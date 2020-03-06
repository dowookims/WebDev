<template>
    <div 
        class="tab"
        :class="{ active: isSelected }"
        @click="tabClick(index)"
    >
        <div class="tab--name-div">
            <span class="tab--name-span">{{ title }}</span>
        </div>
        <div class="tab--close-div">
            <span 
                class="tab--close-span"
                @click="closeTab()">
                &times;
            </span>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'Tab',
    props: {
        index: Number,
        title: String,
        text: String
    },
    methods: {
        ...mapMutations('tab', ['setSelectedTab', 'setTabList']),
        ...mapMutations('board', ['setBoardData']),
        handleClose() {},
        tabClick(idx) {
            const boardTitle = this.$store.state.board.title;
            const boardText = this.$store.state.board.text;
            const pastTab = this.$store.state.tab.tabList[this.selectedTab];
            pastTab.title = boardTitle;
            pastTab.text = boardText;
            this.setSelectedTab(idx);
            this.setBoardData({title: this.title, text: this.text})
        },
        closeTab(idx) {
            const lastIndex = this.tabList.length
            const newList = [
                ...this.tabList.slice(0, idx),
                ...this.tabList.slice(idx+1, lastIndex)
            ];
            if (idx === this.selectedTab) {
                if (idx === lastIndex -1){
                    this.setSelectedTab(idx - 2)
                } else {
                    this.setSelectedTab(idx - 1)
                }
            }
            this.setTabList(newList);
        }
    },
    computed: {
        ...mapState('tab', ['selectedTab', 'tabList']),
        isSelected() {
            return this.index == this.selectedTab;
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
    color: #fff;
    min-width: 150px;
    max-width: 150px;
    padding: 10px;
    height: 30px;
    cursor: pointer;
}

.active {
    background-color: #777;
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