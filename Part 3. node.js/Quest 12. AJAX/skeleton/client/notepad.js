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
		this.currentTab.dom.classList.add("activeTab");

		const boardInstance = new Board();
		app.append(boardInstance.dom);
		this.dom = app;
	}

	_customEventHandler() {
		function toggleTab(e) {
			const textArea = document.getElementById('textarea')
			this.currentTab.dom.classList.remove("activeTab");
			this.currentTab.text = textArea.value;
			this.currentTab = e.detail.tab;
			textArea.value = this.currentTab.text || '';
			this.currentTab.dom.classList.add("activeTab");
		}

		this.dom.addEventListener('removeTab', (e) => {
				this.tabs =  this.tabs.filter(tab => {
				tab.id !== e.detail.id
				})
		});

		this.dom.addEventListener('createTab', (e) => {
			this.tabs.push(e.detail.tab)
			toggleTab.call(this, e)
		});
		
		this.dom.addEventListener('openTab', (e) => {
			toggleTab.call(this, e)
		});
	}
};

class Icon {
	constructor (name,type) {
		this.name = name;
		this.type = type;
		this.dom = null;
		this._prepareDOM()
	}
	
	_prepareDOM () {
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
			const tabItem = Tab.create('untitled', '');
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
		this.dom.addEventListener('click', () => this._openEvent())
		this._removeEvent();
	}

	static create(name, text) {
		const tapDiv = document.querySelector('.tab-div');
		const tabItem = new Tab(name, text);
		const createTab = new CustomEvent('createTab', {
			bubles: true,
			detail: {tab: (() => tabItem)()}
		});
		
		app.dispatchEvent(createTab);
		tapDiv.append(tabItem.dom);
		return tabItem;
	};

	_removeEvent() {
		this.dom.querySelector('.close-tab').addEventListener('click', e => {
			this.dom.remove();
			const removeTab = new CustomEvent('removeTab', {
				bubbles: true,
				detail: {id: (() => this.id)()}
			});
			app.dispatchEvent(removeTab);
		})
	};

	_openEvent() {
		const openTab = new CustomEvent('openTab', {
			bubles: true,
			detail: {tab: (() => this)()}
		})
		app.dispatchEvent(openTab);
	}
};

class Board {
	constructor(text="") {
		this.text =text;
		this.dom = null;
		this._prepareDOM();
	}
	
	_prepareDOM() {
		const textAreaTemplate = document.getElementById('board');
		const textAreaClone = document.importNode(textAreaTemplate.content, true);
		const textAreaDiv = textAreaClone.querySelector('.board');
		this.dom = textAreaDiv;
	}
};
