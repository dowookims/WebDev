class Notepad {
	constructor () {
		this.dom = null;
		this._prepareDOM()
	}

	_prepareDOM() {
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
		const stateController = new StateController();

		stateController.navBar = this;
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
	constructor (title="undefined", text="", saved=false, originName=null) {
		Tab.id ? Tab.id ++ : Tab.id = 1;
		this.id = Tab.id;
		this.title = title;
		this.text = text;
		this.saved = saved;
		this.originName = originName;
		this.dom = null;
		this._prepareDOM();
	}

	_prepareDOM() {
		const stateController = new StateController();

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
		stateController.appendTabToNavbar(this.dom)
	}

	_openTab() {
		const stateController = new StateController();
		const pastTab = stateController.selectedTab;
		const board = stateController.board;

		if (pastTab) {
			let boardTitle ='',
				boardText = '';

			if (board) {
				const boardData = board.getData();
				boardTitle = boardData.title;
				boardText = boardData.text;
			};

			pastTab.title = boardTitle;
			pastTab.text = boardText;

			const pastTabTitle = pastTab.title || 'undefined';
			pastTab.setTabTitle(pastTabTitle);
			pastTab.dom.classList.remove('activeTab');
		}

		stateController.selectedTab = this;

		board && board.setData(this.title, this.text);

		this.dom.classList.add('activeTab');
	};

	_closeTab(e) {
		e.stopPropagation();
		const stateController = new StateController();
		const tabList = stateController.tabs;
		const lastIndex = tabList.length;
		let tabArr = [];
		let selectedTabIdx = null;

		for (let i = 0; i < lastIndex; i++) {
			if (tabList[i].id === stateController.selectedTab.id) {
				selectedTabIdx = i;
			};

			if (tabList[i].id === this.id) {
				tabArr = [
					...tabList.slice(0, i),
					...tabList.slice(i+1, lastIndex)
				];

				if (selectedTabIdx === i) {
					if (lastIndex === 1) {
						new Tab();
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
		const stateController = new StateController();
		const SERVER_URL = stateController.serverUrl;

		if (this.type === 'create') {
			new Tab();

		} else if (this.type ==='load') {
			const modal = stateController.modal;
			modal.handleOpen();
			modal.createItems(stateController.getNotepadData());

		} else if (this.type === 'save') {
			const boardData = stateController.board.getData();
			const isSaved = stateController.selectedTab.saved;
			const fetchRequest = (serverUrl, method, data) => {
				fetch(serverUrl, {
					method: `${method}`,
					credentials: 'same-origin',
					mode: 'cors',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify(data)
				})
				.then(res => res.json())
				.then(res => {
					const message = res.success ? "success" : "fail"
					alert(`file ${method} ${message}`)
				})
				.catch(err => console.log(err));
			}

			if (isSaved){
				boardData.oldTitle = stateController.selectedTab.originName;
				stateController.selectedTab.originName = boardData.title;
				fetchRequest(SERVER_URL, 'PUT', boardData)
			} else {
				stateController.selectedTab.saved = true;
				stateController.selectedTab.originName = boardData.title;
				fetchRequest(SERVER_URL, 'POST', boardData)
			}
			stateController.selectedTab.setTabTitle(boardData.title);
		} 	
	}
}

class Board {
	constructor () {
		this.dom = null;
		this._prepareDOM();
	}

	_prepareDOM() {
		const stateController = new StateController();
		const textAreaTemplate = document.getElementById('board');
		const textAreaClone = document.importNode(textAreaTemplate.content, true);
		const textAreaDiv = textAreaClone.querySelector('.board');

		this.dom = textAreaDiv;
		stateController.board = this;
	}

	_getInputFields() {
		return {
			titleDOM: this.dom.querySelector('.board-title'),
			textDOM: this.dom.querySelector('.textarea')
		}
	}

	setData(title, text) {
		console.log(this._getInputFields());
		const {titleDOM, textDOM} = this._getInputFields();
		titleDOM.value = title;
		textDOM.value = text;
	};

	getData() {
		const {titleDOM, textDOM} = this._getInputFields();
		return {title: titleDOM.value, text: textDOM.value};
	}
};

class Modal {
	constructor () {
		this.dom = null;
		this.fileList = [];
		this.selectedItem = null;
		this._prepareDOM();
	};

	_prepareDOM() {
		const stateController = new StateController();
		const modalTemplate = document.getElementById('modal');
		const modalClone = document.importNode(modalTemplate.content, true);
		const modal = modalClone.querySelector('.modal');
		const closeButton = modalClone.querySelector('.modal-close');
		const submitButton = modalClone.querySelector('.modal-submit');
		
		closeButton.addEventListener('click', () => this._handleClose());
		submitButton.addEventListener('click', () => this._loadDataToTab());
		modal.addEventListener('click', (e) => {
			if(e.target.className === 'modal') this._handleClose();
		})
		this.dom = modal;
		stateController.modal = this;
	}

	_handleClose() {
		this.fileList.forEach(file => {
			file.dom.remove();
		});
		this.dom.style.display = "none";
	};

	_loadDataToTab() {
		const data = this.selectedItem
		new Tab(data.title, data.text, data.saved, data.originName);
		this._handleClose();
	};

	handleOpen() {
		this.dom.style.display = "block";
	};

	createItems(fileList) {
		const modalBody = this.dom.querySelector('.modal-body');
		const modalItem = this.dom.querySelector('.modal-item')
		const modalTemplate = document.getElementById('modal');

		const selectModalItem = (item) => {
			this.selectedItem && this.selectedItem.dom.classList.remove('selected-item');
			this.selectedItem = item;
			item.dom.classList.add('selected-item');
		};

		modalItem && modalItem.remove();
		
		fileList.forEach(file => {
			const modalClone = document.importNode(modalTemplate.content, true);
			const modalItem = modalClone.querySelector('.modal-item');
			modalItem.innerHTML = file.title;
			modalBody.append(modalItem);
			file.dom = modalItem;
			file.dom.addEventListener('click', () => {selectModalItem(file)})
			file.dom.addEventListener('dblclick', () => {
				selectModalItem(file)
				this._loadDataToTab()
			});
			this.fileList.push(file);
		});
	};
};

class StateController {
	constructor () {
		if (StateController.instance) {
			return StateController.instance;
		};
		StateController.instance = this;
		this.navBar = null;
		this.board = null;
		this.modal = null;
		this.fileList = [];
		this.tabs = [];
		this.serverUrl = 'http://127.0.0.1:8080';
		this.selectedTab = '';
		this.getNotepadData();
	};

	getNotepadData() {
		if (this.fileList.length === 0) {
			fetch(`${this.serverUrl}/list`)
			.then(res => res.json())
			.then(res => { this.fileList = res })
			.catch(err => console.error(err));
		} else {
			return this.fileList;
		}
	}
	appendTabToNavbar (dom) {
		this.navBar.appendTabDOM(dom)
	}
};

// class View {
// 	constructor (controller) {
// 		this.title;
// 		this.text;
// 		this.tabs = []
// 		this.tabDiv;
// 		this.create;
// 		this.load;
// 		this.delete;
// 		this.save;
// 		this.selectedTab;
// 		this.controller = controller;
// 	}

// 	createTab() {
// 		let nuTab = new Tab()
// 		nuTab.addEventListener('click', (e) => {
// 			this.selectedTab = e.target
// 		})
// 		return nuTab
// 	}

// 	create() {
// 		let d = this.title.value;
// 		let tab = this.createTab()
// 		this.tabDiv.appendToChild(tab)
// 		this.tabs.push(nuTab)
// 		// this.controller.createTag(d)
// 	}

// 	save() {
// 		let d = this.title.value;
// 		let c = this.text.value;
// 		this.selectedTab.value = d

// 		this.save({ title: d, content: c})
// 	}

// 	successModal(t) {
// 		this.modal.style.display = 'block'
// 		this.modal.style.position = 'fixed'
// 		this.modal.style.transform = 'translate(-50%, -50%)'
// 		this.modal.style.top = '50%'
// 		this.modal.style.left = '50%'
// 		this.modal.content = t
// 	}
// }
// class Controller {
// 	constructor() {
// 		this.m = new Model(this)
// 		this.v = new View(this)
// 	}

// 	createTag(d) {
		
// 	}

// 	save(data, success, error) {
// 		this.m.save(data, (t) => {
// 			this.v.successModal(t)
// 		}, error)
// 	}

// 	load() {
// 		this.m.load()
// 	}

// 	update(old, nu) {
// 		this.m.update(old, nu)
// 	}

// 	delete(t) {
// 		this.m.delete(t)
// 	}
// }
// class Model {
// 	//server
// 	save(data, s, e = console.log) {
// 		axios.post().then(s).catch(e)
// 	}
// 	load() {}
// 	update() {}
// 	delete() {}
// }