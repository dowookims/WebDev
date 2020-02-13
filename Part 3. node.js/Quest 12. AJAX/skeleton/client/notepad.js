class Notepad {
	/* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
		constructor(){
			this.tabs = [];
			this.currentTab = null;
			this._prepareDOM();
			this._customEventHandler();
		}

		_prepareDOM(){
			const app = document.getElementById('app');
			const iconDiv = document.querySelector('.icon-div');

			const iconArr = [
				{name: 'new', type: 'create'},
				{name: 'load', type: 'load'},
				{name: 'save', type: 'save'}
			];

			// icon initiating
			const iconInstances = iconArr.map(icon => {
						const iconItem = new Icon(icon.name, icon.type)
						iconDiv.append(iconItem.dom);
					}
			);
			
			// tab init
			if (this.tabs.length === 0) {
					const newTab = Tab.create('untitled', '');
					this.tabs.push(newTab);
			} else {
					this.tabs.forEach(tab => {
						const tabItem = Tab.create(tab.name, tab.text, tab.id);
						this.tabs.push(tabItem);
					})
			};

			this.currentTab = this.tabs[this.tabs.length-1];

			const boardInstance = new Board();
			app.append(boardInstance.dom);
			this.dom = app;
		}

		_customEventHandler() {
				this.dom.addEventListener('removeTab', (e) => {
					console.log(e.detail.id())
						this.tabs =  this.tabs.filter(tab => {
						tab.id !== e.detail.id
				})
				console.log(this.tabs);
		})
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
						const tabItem = new Tab('untitled', '');
						tabDiv.append(tabItem.dom);
				} else if (this.type ==='load') {
						console.log("LOAD");
				} else if (this.type === 'save') {
						const textData = document.getElementById("textarea").value;
						console.log(textData);
				} 
				
		}
};

class Tab {
		constructor(name, text, id = new Date()){
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
				tabNameSpan.innerHTML = this.name;
				this.dom = tabClone.querySelector('.tab');
				this._removeEvent();
		}

		static create(name, text) {
			const tapDiv = document.querySelector('.tab-div');
			const tabItem = new Tab(name, text);
			const createTab = new CustomEvent('createTab', {
				bubles: true,
				detail: {
					id: () => tabItem.id,
					name: () => tabItem.name,
					text: () => tabItem.text
				}
			});
			app.dispatchEvent(createTab);
			tapDiv.append(tabItem.dom);
			return tabItem
		}

		_removeEvent() {
				this.dom.querySelector('.close-tab').addEventListener('click', e => {
					this.dom.remove();
					const removeTab = new CustomEvent('removeTab', {
						bubbles: true,
						detail: {id: () => this.id}
					});
					app.dispatchEvent(removeTab);
				})
		};

		_openEvent() {
				const openTab = new CustomEvent('openTab', {
					bubles: true,
					detail: {}
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
