<template>
    <div class="board">
        <div class="board--header">
            <input 
                class="board--title"
                v-model="title"
                type="text" />
        </div>
        <div class="board--content">
            <textarea 
                class="board--text"
                v-model="text"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Board',
    computed: {
        title: {
            get () {
                return this.$store.state.board.title
            },
            set (title) {
                this.$store.commit('board/setTitle', title)
            }
        },
        text: {
            get () {
                return this.$store.state.board.text
            },
            set (text) {
                this.$store.commit('board/setText', text)
            }
        }
    }
}
</script>

<style scoped>
.board {
    width: 80%;
    margin-top: 50px;
    margin-left: 10%;
}

.board--header {
    display: flex;
    justify-content: flex-start;
}

.board--title {
    width: 80%;
    border: 1px solid #333;
    border-radius: 10px;
    font-size: 24px;
}

.board--content {
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
}

.board--text {
    width: 80%;
    height: 50vh;
    border-radius: 10px;
    font-size: 24px;
}

</style>