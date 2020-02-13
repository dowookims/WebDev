class Notepad {
	/* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
		constructor(){
			this.tabs = []
			this._prepareDOM()
		}

		_prepareDOM(){
			const app = document.getElementById('app');
			const iconDiv = document.querySelector('.icon-div');
			const tapDiv = document.querySelector('.tab-div');
			const boardDiv = document.querySelector('.board-div');

			const iconArr = [
				{name: 'new', type: 'create'},
				{name: 'load', type: 'load'},
				{name: 'save', type: 'save'}
			];
			const iconInstances = iconArr.map(icon => {
						const iconItem = new Icon(icon.name, icon.type)
						iconDiv.append(iconItem.dom);
					}
			);

			if (this.tabs.length === 0) {
					const newTab = new Tab(1, 'untitled', '');
					tapDiv.append(newTab.dom);
			} else {
					this.tabs.forEach(tab => {
						const tabItem = new Tab(tab.id, tab.name, tab.text);
						tapDiv.append(tabItem.dom);
					})
			};

			const boardInstance = new Board();
			app.append(boardInstance.dom);
		}
};

class Icon {
		constructor(name,type){
				this.name = name;
				this.type = type;
				this.dom = null;
				this._prepareDOM()
		}
		
		_prepareDOM(){
				const iconTemplate = document.getElementById('icon');
				const iconClone = document.importNode(iconTemplate.content, true);
				const iconNameSpan = iconClone.querySelector('.icon-name');
				iconNameSpan.innerHTML = this.name;
				this.dom = iconClone.querySelector('.icon');
				this.dom.addEventListener('click', () => this._clickEvent())
		}

		_clickEvent(){
				if (this.type === 'create') {
						const tabDiv = document.querySelector('.tab-div');
						const tabItem = new Tab(1, 'untitled', '');
						tabDiv.append(tabItem.dom);
				} else if (this.type ==='load') {
						console.log("LOAD");
				} else if (this.type === 'save') {
						console.log("SAVE");
				} 
				
		}
};

class Tab {
		constructor(id, name, text){
			this.id = id;
			this.name = name;
			this.text = text;
			this.dom = null;
			this._prepareDOM();
		}
		
		_prepareDOM() {
				const tabTemplate = document.getElementById('tab');
				const tabClone = document.importNode(tabTemplate.content, true);
				const tabNameSpan = tabClone.querySelector('.tab-name');
				const closeTabSpan = tabClone.querySelector('.close-tab');
				tabNameSpan.innerHTML = this.name;
				this.dom = tabClone.querySelector('.tab');

				closeTabSpan.addEventListener('click', () => {
						this.dom.remove();
				})
		}
};

class Board {
		constructor(text=""){
			this.text =text;
			this.dom = null;
			this._prepareDOM();
		}
		
		_prepareDOM(){
			const textAreaTemplate = document.getElementById('board');
			const textAreaClone = document.importNode(textAreaTemplate.content, true);
			const textAreaDiv = textAreaClone.querySelector('.board');
			this.dom = textAreaDiv;
		}
};
