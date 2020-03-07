<template>
<div 
    class="modal"
    v-if="open"
>
    <div class="modal--content">
        <div class="modal--header">
            <span 
				class="modal--close"
				@click="setOpen"
			>&times;</span>
        </div>
        <div class="modal--body">
            <div class="modal--item"></div>
        </div>
        <div class="modal--footer">
            <button class="modal--submit">load</button>
        </div>
    </div>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	name: 'modal',
	methods: {
		...mapMutations('modal', ['setOpen'])
	},
    computed: {
        ...mapState('modal', ['open'])
    }
}

</script>

<style scoped>
.modal {
	position: absolute;
	z-index: 10;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(33, 33, 33, 0.6);
}

.modal--content {
	position: absolute;
	left: calc((100vw - 500px)/2);
	top: calc((100vh - 500px)/2);
	width: 500px;
	height: 500px;
	background-color: #fff;
	border-radius: 10px;
}

.modal--header {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: 50px;
}

.modal--close {
	color: #333;
	font-size: 20px;
	margin-right: 15px;
	cursor: pointer;
}

.modal--content {
	height: 400px;
	overflow-y: scroll;
}

.modal--item {
	width: 400px;
	margin: 0 0 10px 20px;
	padding-left: 20px;
	line-height: 40px;
	font-size: 20px;
	background-color: #4CD579;
	height: 40px;
	border-radius: 10px;
	color: #fff;
	overflow-x: hidden;
	cursor: pointer;
}

.modal--item:hover {
	background-color: #2CB559;
}

.selected--item {
	background-color: #0C9539;
}

.modal--footer {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50px;
}

.modal--submit {
	width: 100px;
	height: 30px;
	background-color: #4C79D5;
	color: #fff;
	font-size: 16px;
	border: none;
	border-radius: 15px;
	cursor: pointer;
}

.modal--submit:hover {
	background-color: #2C59B5;
}
</style>