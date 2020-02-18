class Notepad {
	constructor () {
		this.dom = null;
		this._prepareDOM()
	}

	_prepareDOM() {
		const domController = new DomController();
		const app = document.getElementById('app');
		const modal = new Modal();
		const navBar = new NavBar();
		const board = new Board();
		this.dom = app;
		app.append(navBar.dom);
		app.append(board.dom);
		app.append(modal.dom);
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

		domController.navBar = this;
		this.dom = menu;
		
		const domAppend = (instances, dom) => {
			instances.forEach(instance => {
				dom.append(instance.dom)
			});
		};

		const iconArr = this._prepareIcons();
		const tabArr = this._prepareTabs();

		domAppend(iconArr, iconDiv);
		domAppend(tabArr, tabDiv);
	};

	_prepareIcons () {
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

	appendTabDOM (dom) {
		this.dom.querySelector('.tab-div').append(dom);
	}
}

class Tab {
	constructor (title="undefined", text="") {
		this.created_at = new Date();
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
		domController.navBar.appendTabDOM(this.dom);
	}

	_openTab() {
		const stateController = new StateController();
		const domController = new DomController();
		const pastTab = stateController.selectedTab;
		const boardDOM = domController.board;

		if (pastTab) {
			let boardTitle ='',
				boardText = '';
			if (boardDOM) {
				const boardData = boardDOM.getBoardData();
				boardTitle = boardData.title;
				boardText = boardData.text;
			}
			pastTab.title = boardTitle;
			pastTab.text = boardText;
			const pastTabTitle = pastTab.title || 'undefined';
			pastTab.setTabTitle(pastTabTitle);
			pastTab.dom.classList.remove('activeTab');
		}

		stateController.selectedTab = this;

		if (boardDOM) {
			boardDOM.setBoardData(stateController.selectedTab.title, stateController.selectedTab.text);
		}

		this.dom.classList.add('activeTab');
	};

	_closeTab(e) {
		const stateController = new StateController();
		const domController = new DomController();
		const tabList = stateController.tabs;
		const lastIndex = tabList.length;
		let tabArr = [];
		let selectedTabIdx = null;

		e.preventDefault();

		for (let i = 0; i < lastIndex; i++) {

			if (tabList[i].created_at === stateController.selectedTab.created_at) {
				selectedTabIdx = i;
			};

			if (tabList[i].created_at === this.created_at) {
				tabArr = [
					...tabList.slice(0, i),
					...tabList.slice(i+1, lastIndex)
				];

				if (selectedTabIdx === i) {
					if (lastIndex === 1) {
						domController.board.setBoardData("", "");
					} else if (i === lastIndex -1) {
						tabList[i-1]._openTab();
					} else {
						tabList[i+1]._openTab();
					}
				}
				break;
			}
		}
		stateController.tabs = tabArr;
		this.dom.remove();
	}

	setTabTitle(title) {
		this.title = title;
		this.dom.querySelector('.tab-name').innerHTML = title;
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
		this.dom.addEventListener('click', (e) => this._clickEvent(e))
	}

	_clickEvent(){
		const domController = new DomController();
		const stateController = new StateController();
		const serverUrl = 'http://127.0.0.1:8080';

		if (this.type === 'create') {
			new Tab();
		} else if (this.type ==='load') {
			const modal = domController.modal;
			modal.handleOpen();
			let fileList = {};
			fetch(`${serverUrl}/list`)
			.then(res => res.json())
			.then(res => console.log(res.fileList))
			.catch(err => console.error(err));
		} else if (this.type === 'save') {
			const boardData = domController.board.getBoardData();
			fetch(serverUrl, {
				method: 'POST',
				credentials: 'same-origin',
				mode: 'cors',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(boardData)
			}).then(res => res.json())
			.then(res => {
				const message = res.success ? "success" : "fail"
				alert(`file save ${message}`)
			})
			.catch(err => console.log(err));
			
			stateController.selectedTab.setTabTitle(boardData.title);
		} 	
	}
}

class Board {
	constructor () {
		this.title = null;
		this.text = null;
		this.dom = null;
		this._prepareDOM();
	}

	_prepareDOM() {
		const domController = new DomController();
		const textAreaTemplate = document.getElementById('board');
		const textAreaClone = document.importNode(textAreaTemplate.content, true);
		const textAreaDiv = textAreaClone.querySelector('.board');
		this.title = textAreaDiv.querySelector('.board-title');
		this.text = textAreaDiv.querySelector('.textarea');

		this.dom = textAreaDiv;
		domController.board = this;
	}

	setBoardData(title, text) {
		console.log(this.title)
		this.title.value = title;
		this.text.value = text;
	};

	getBoardData() {
		return {title: this.title.value, text: this.text.value};
	}
};

class Modal {
	constructor () {
		this.dom = null;
		this.open = false;
		this._prepareDOM();
	};

	_prepareDOM() {
		const domController = new DomController();
		const modalTemplate = document.getElementById('modal');
		const modalClone = document.importNode(modalTemplate.content, true);
		const modal = modalClone.querySelector('.modal');
		const closeButton = modalClone.querySelector('.modal-close');
		closeButton.addEventListener('click', () => this.handleClose());
		this.dom = modal;
		domController.modal = this;
		console.log(domController.modal)
	}

	handleOpen() {
		this.dom.style.display = "";
	};

	handleClose() {
		this.dom.style.display = "none";
	}
}

class StateController {
	constructor () {
		if (StateController.instance) {
			return StateController.instance;
		};
		StateController.instance = this;
		this.tabs = [];
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
		this.modal = null;
	}
}