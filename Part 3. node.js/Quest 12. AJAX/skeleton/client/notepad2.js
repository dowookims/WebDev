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
		const navBar = new NavBar();
		const board = new Board();
		this.dom = app;
		app.append(navBar.dom);
		app.append(board.dom);
	}
};

class NavBar {
	constructor () {
		this.dom = null;
		this._prepareDOM();
		
	}

	_prepareDOM () {
		const menuTemplate = document.getElementById('menu');
		const menuClone = document.importNode(menuTemplate.content, true);
		const menu = menuClone.querySelector('.menu');
		const iconDiv = menuClone.querySelector('.icon-div');
		const tabDiv = menuClone.querySelector('.tab-div');
		const domController = new DomController

		domController.navBar = menu;
		
		const domAppend = (instances, dom) => {
			instances.forEach(instance => {
				dom.append(instance.dom)
			});
		};

		const iconArr = this._prepareIcons();
		const tabArr = this._prepareTabs();

		domAppend(iconArr, iconDiv);
		domAppend(tabArr, tabDiv);

		this.dom = menu;
	};

	_prepareIcons () {
		const menuTemplate = document.getElementById('menu');
		const menuClone = document.importNode(menuTemplate.content, true);
		const iconArr = [
			{name: 'new', type: 'create'},
			{name: 'load', type: 'load'},
			{name: 'save', type: 'save'}
		];

		return iconArr.map(icon => {
			return new Icon(icon.type);
		});
	};

	_prepareTabs () {
		const stateController = new StateController();
		const tabData = stateController.tabs;
		if (tabData.length > 0 ) {
			tabData.forEach(tab => {
				const t = new Tab(tab.title, tab.text)
				tabData.push(t);
			})
		} else {
			new Tab();
		}
		return tabData;
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
		const stateController = new StateController();
		const domController = new DomController();

		const tabTemplate = document.getElementById('tab');
		const tabClone = document.importNode(tabTemplate.content, true);
		const tabNameSpan = tabClone.querySelector('.tab-name');
		const closeSpan = tabClone.querySelector('.close-tab');
		const tab = tabClone.querySelector('.tab');

		tabNameSpan.innerHTML = this.title;
		this.dom = tab

		closeSpan.addEventListener('click', (e) => this._closeTab(e));
		this.dom.addEventListener('click', () => this._openTab());
		this._openTab();

		stateController.tabs.push(this);
		domController.navBar.querySelector('.tab-div').append(this.dom);
		
	}

	_openTab() {
		const stateController = new StateController();
		const domController = new DomController();
		if (stateController.selectedTab) {
			stateController.selectedTab.title = domController.board.dom.querySelector('.board-title').value;
			stateController.selectedTab.text = domController.board.dom.querySelector('.textarea').value;
			stateController.selectedTab.dom.querySelector('.tab-name').innerHTML = stateController.selectedTab.title || 'undefined';
			stateController.selectedTab.dom.classList.remove('activeTab');
		}
		stateController.selectedTab = this;
		this.dom.classList.add('activeTab');
		if (domController.board) {
			domController.board.dom.querySelector('.board-title').value = this.title;
			domController.board.dom.querySelector('.textarea').value = this.text;
		}
		
	};

	_closeTab(e) {
		e.stopPropagation();
		const stateController = new StateController();
		let tabArr = []
		for (let i = 0; i < stateController.tabs.length; i++) {
			if (stateController.tabs[i].title === this.title) {
				tabArr = [
					...stateController.tabs.slice(0, i),
					...stateController.tabs.slice(i+1, stateController.tabs.length)
				];

				if (stateController.selectedTab === this) {
					console.log(i);
					if (stateController.selectedTab.length === 1) {
						
					} else if (i === 0) {
						stateController.tabs[i+1].dom.add('activeTab')
					} else {
						stateController.tabs[i-1].dom.add('activeTab')
					}
				}
				break;
			}
		}
		stateController.tabs = tabArr;
		this.dom.remove();
	}
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
			const t = new Tab();
		} else if (this.type ==='load') {
			const getList = new CustomEvent('getList', {
				bubbles: true,
			});
			app.dispatchEvent(getList);
		} else if (this.type === 'save') {
			const stateController = new StateController();
			const domController = new DomController();
			const tab =  stateController.selectedTab;
			tab.title = domController.board.dom.querySelector('.board-title').value;
			tab.text = domController.board.dom.querySelector('.textarea').value;
			tab.dom.querySelector('.tab-name').innerHTML = tab.title;
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
		const domController = new DomController();

		const boardDiv = document.querySelector('.board-div');
		const textAreaTemplate = document.getElementById('board');
		const textAreaClone = document.importNode(textAreaTemplate.content, true);
		const textAreaDiv = textAreaClone.querySelector('.board');

		domController.board = this;
		this.dom = textAreaDiv;
	}
}

class StateController {
	constructor () {
		if (StateController.instance) {
			return StateController.instance;
		};
		StateController.instance = this;
		this.tabs = [];
		this.boardTitle = '';
		this.boardText = '';
		this.selectedTab = '';
	};
};

class DomController {
	constructor () {
		if (DomController.instance) {
			return DomController.instance;
		};
		DomController.instance = this;
		this.navBar = null;
		this.board = null;
	}
}