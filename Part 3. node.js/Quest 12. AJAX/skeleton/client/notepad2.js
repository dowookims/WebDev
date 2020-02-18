class Notepad {
	constructor () {
		this._serverUrl = (function() {
			return '127.0.0.1:8080';
		})();
		this.dom = null;
		this._prepareDOM()
	}

	_prepareDOM() {
		const app = document.getElementById('app');
		const boardDiv = document.querySelector('.board-div');
		const navBar = new NavBar();
		const board = new Board();
		app.append(navBar.dom);
		this.dom = app;
	}
};

class NavBar {
	constructor () {
		this.tabs = [];
		this.dom = null;
		this._prepareDOM();
	}

	_prepareDOM () {
		const menu = document.querySelector('.menu');
		this._prepareIcons();
		this._prepareTabs();
	};

	_prepareIcons () {
		const iconDiv = document.querySelector('.icon-div');
		const iconArr = [
			{name: 'new', type: 'create'},
			{name: 'load', type: 'load'},
			{name: 'save', type: 'save'}
		];

		iconArr.map(icon => {
			const iconItem = new Icon(icon.type);
			iconDiv.append(iconItem.dom);
		});
	};

	_prepareTabs () {
		const tabDiv = document.querySelector('.tab-div');
		const tabData = [];
		if (tabData.length > 0 ) {
			tabData.forEach(tab => {
				const t = new Tab(tab.title, tab.text)
				tabDiv.append(t.dom);
				this.tabs.push(t);
			})
		} else {
			const tab = new Tab();
			this.tabs.push(tab);
			tabDiv.append(tab.dom);
		}
	}
}

class Tab {
	constructor (title="undefined", text="") {
		this.title = title;
		this.text = text;
		this.dom = null;
		this._prepareDOM();
	}

	_prepareDOM() {
		const tabTemplate = document.getElementById('tab');
		const tabClone = document.importNode(tabTemplate.content, true);
		const tabNameSpan = tabClone.querySelector('.tab-name');
		const stateControl = new StateControl();
		tabNameSpan.innerHTML = this.title;
		this.dom = tabClone.querySelector('.tab');
	}

	openTab() {}
	closeTab() {}
}

class Icon {
	constructor (type) {
		this.type = type;
		this.dom = null;
		this._prepareDOM();
	}

	_prepareDOM() {
		const iconTemplate = document.getElementById('icon');
		const iconClone = document.importNode(iconTemplate.content, true);
		const iconNameSpan = iconClone.querySelector('.icon-name');
		iconNameSpan.innerHTML = this.type;
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
				bubbles: true,
			});
			app.dispatchEvent(getList);
		} else if (this.type === 'save') {
			const saveData = new CustomEvent('saveData', {
				bubbles: true,
			});
			app.dispatchEvent(saveData);
		} 	
	}
}

class Board {
	constructor (title="", text="") {
		this.title = title;
		this.text = text;
		this.dom = null;
		this._prepareDOM();
	}

	_prepareDOM() {
		const boardDiv = document.querySelector('.board-div');
		const textAreaTemplate = document.getElementById('board');
		const textAreaClone = document.importNode(textAreaTemplate.content, true);
		const textAreaDiv = textAreaClone.querySelector('.board');
		this.dom = textAreaDiv;
		boardDiv.append(this.dom);
	}
}

class StateControl {
	constructor () {
		if (StateControl.instance) {
			return StateControl.instance;
		};
		StateControl.instance = this;
		this.boardTitle = '';
		this.boardText = '';
		this.selectedTab = '';
	}
}