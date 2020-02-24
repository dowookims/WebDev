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
        this.tabs = [];
        this.icons = [];
        this.selectedTab = null;
		this._prepareDOM();	
	}

	_prepareDOM () {
		const menuTemplate = document.getElementById('menu');
		const menuClone = document.importNode(menuTemplate.content, true);
		const menu = menuClone.querySelector('.menu');
		const iconDiv = menuClone.querySelector('.icon-div');
		const tabDiv = menuClone.querySelector('.tab-div');
		const stateController = new StateController();

        const iconArr = [
			{name: 'new', type: 'create'},
			{name: 'load', type: 'load'},
			{name: 'save', type: 'save'}
		];

		stateController.navBar = this;
		this.dom = menu;
		

		iconArr.forEach(iconData => {
            const icon = new Icon(iconData.type);
            this.icons.push(icon);
            iconDiv.append(icon);
        });
		this._prepareTabs();
	};

	_prepareIcons () {
		return iconArr.map(icon => {
			return new Icon(icon.type);
		});
	};

	_prepareTabs () {
		if (this.tabs.length > 0 ) {
			this.tabs.forEach(tab => {
				const t = new Tab(tab.title, tab.text)
                this.appendTab(t.dom);
			})
		} else {
            const t = new Tab();
            this.appendTab(t.dom);
		}
	}

	appendTab (dom) {
        this.tabs.push(t);
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
		const tabTemplate = document.getElementById('tab');
		const tabClone = document.importNode(tabTemplate.content, true);
		const tabNameSpan = tabClone.querySelector('.tab-name');
		const closeSpan = tabClone.querySelector('.close-tab');
		const tab = tabClone.querySelector('.tab');

		tabNameSpan.innerHTML = this.title;
		this.dom = tab

		closeSpan.addEventListener('click', () => this._closeTab());
		this.dom.addEventListener('click', () => this._openTab());
		this._openTab();
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

	_closeTab() {
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
		this.navBar.appendTab(dom)
	}
};