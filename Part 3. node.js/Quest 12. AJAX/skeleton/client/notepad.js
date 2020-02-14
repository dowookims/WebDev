class Notepad {
	/* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
	constructor(){
		this.tabs = [];
		this.currentTab = null;
		this._prepareDOM();
		this._customEventHandler();
		this.serverUrl = 'http://127.0.0.1:8080'
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
		});
		
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
		function toggleTab(tabInstance) {
			const textArea = document.getElementById('textarea');
			const boardTitle = document.getElementById('board-title');

			this.currentTab.dom.classList.remove("activeTab");
			this.currentTab.text = textArea.value;
			this.currentTab.name = boardTitle.value;
			this.currentTab.dom.querySelector('.tab-name').innerHTML = boardTitle.value;
			this.currentTab = tabInstance || this.currentTab;
			textArea.value = this.currentTab.text || '';
			boardTitle.value = this.currentTab.name || '';
			this.currentTab.dom.classList.add("activeTab");
		}

		this.dom.addEventListener('removeTab', (e) => {
			this.tabs =  this.tabs.filter(tab => {
				tab.id !== e.detail.id
			})
		});

		this.dom.addEventListener('createTab', (e) => {
			this.tabs.push(e.detail.tab)
			toggleTab.call(this, e.detail.tab)
		});
		
		this.dom.addEventListener('openTab', (e) => {
			toggleTab.call(this, e.detail.tab)
		});

		this.dom.addEventListener('saveData', async() => {
			toggleTab.call(this, this.currentTab)
			const res = await fetch(this.serverUrl, {
				method: 'POST',
				credentials: 'same-origin',
				mode: 'cors',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify({
					name: this.currentTab.name,
					text: this.currentTab.text
				})
			});
			console.log(await res.json());
		});

		this.dom.addEventListener('getList', async () => {
			const res = await fetch(`${this.serverUrl}/list`);
			const fileList = await res.json();
			fileList.fileList.forEach(file => {
				Tab.create(file.title, file.text)
			})
		})
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
			const getList = new CustomEvent('getList', {
				bubles: true,
			});
			app.dispatchEvent(getList);
		} else if (this.type === 'save') {
			const saveData = new CustomEvent('saveData', {
				bubles: true,
			});
			app.dispatchEvent(saveData);
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
		console.log("THIS", this);
		console.log(this.name);
		console.log(this.dom);
	}

	// Load 클릭시 서버에서 데이터는 불러와지나, tab의 이름과, board에서 title 이름이 나오지 않는거 추가 수정
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
	constructor() {
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
