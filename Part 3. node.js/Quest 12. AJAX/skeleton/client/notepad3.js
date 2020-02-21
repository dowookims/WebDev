class Notepad {
	constructor () {
        this.serverUrl = 'http://127.0.0.1:8080';
        this.dom = null;
        this.navBar= null;
        this.board = null;
        this.modal = null;
		this._prepareDOM();
	}

	_prepareDOM() {
        const app = document.getElementById('app');
        this.navBar = new NavBar();
        this.board = new Board();
        this.modal = new Modal();
        this.dom = app;
        app.append(this.navBar.dom);
        app.append(this.board.dom);
        app.append(this.modal.dom);
        this._listenEvents();
    }
    
    _listenEvents() {
        this.dom.addEventListener('boardDataToTab', (e) => {
            let data = this.board.getData();
            data.title = data.title ? data.title : 'undefined';
            const t = this.navBar.selectedTab;
            t.setData(data);
            const currentTab = e.detail;
            const { text, title } = currentTab.getData();
            this.board.setData(title, text)
        });

        this.dom.addEventListener('saveTab', () => {
            const isSaved = this.navBar.selectedTab.saved;
            const data = this.board.getData();
            data.title = data.title || 'undefined';
            this.navBar.selectedTab.setData(data);

            if (isSaved) {
                data.oldTitle = this.navBar.selectedTab.oldTitle;
                this.navBar.selectedTab.setSaveLog(data.title);
                this._fetchRequest('PUT', data)
            } else {
                this.navBar.selectedTab.setSaveLog(data.title);
                this._fetchRequest('POST', data)
            }
        });

        this.dom.addEventListener('createTab', () => {
            if (this.board.hide) {
                this.board.handleShow();
            }
            this.board.setData('untitled', '');
        });

        this.dom.addEventListener('emptyTabs', () => {
            this.board.handleShow();
        });

        this.dom.addEventListener('tabDataToBoard', (e) => {
            const { title, text } = e.detail;
            this.board.setData(title, text)
        })
    }

    _fetchRequest = (method, data) => {
        fetch(this.serverUrl, {
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
};

class NavBar {
	constructor () {
        this.dom = null;
        this.icons = [];
        this.tabs = [];
        this.selectedTab = null;
        this.tabId = 1;
		this._prepareDOM();
	}

	_prepareDOM () {
		const menuTemplate = document.getElementById('menu');
		const menuClone = document.importNode(menuTemplate.content, true);
		const menu = menuClone.querySelector('.menu');
		const iconDiv = menuClone.querySelector('.icon-div');
        const iconArr = ['create', 'load', 'save'];

        this.dom = menu;

        iconArr.forEach(iconData => {
            const i = new Icon(iconData);
            this.icons.push(i);
            iconDiv.append(i.dom);
        });

        this._listenEvents();
        this._prepareTabs();
    };
    
    _prepareTabs () {
        const tabData = []
		if (tabData.length > 0 ) {
			tabData.forEach (tab => {
				const t = new Tab(this.tabId, tab.title, tab.text)
                this.appendTab(t)
			})
		} else {
            const t = new Tab(this.tabId);
            this.appendTab(t)
        };
    };

    appendTab (tab) {
        if (!this.selectedTab) {
            this.selectedTab = tab;
        } else {
            // this._emitEvents(e, tab);
        }
        tab.addCloseEvent();
        this.tabs.push(tab)
        tab.dom.addEventListener('click', (e) => {
            this._emitBoardDataToTab(e, tab);
            this.changeSelectedTab(tab);
            this._emitTabDataToBoard(e, tab);
        });
        this.dom.querySelector('.tab-div').append(tab.dom);
        this.tabId++; 
        this.changeSelectedTab(tab);
    };

    changeSelectedTab (tab) {
        this.selectedTab.unSelect();
        tab.select();
        this.selectedTab = tab;
    };

    closeTab (e) {
        const findFn = (value, target) => {
            return value === target
        };

        const tab = e.detail;

        if (this.tabs.length === 1) {
            this.tabs.pop();
            this._emitEmptyTabs(e)
            return;
        };

        const currentIdx = this.tabs.findIndex( v => findFn(v.id, this.selectedTab.id));
        const idx = this.tabs.findIndex(v => findFn(v.id, tab.id));
        const lastIdx = this.tabs.length-1;
        const tabList = [
            ...this.tabs.slice(0, idx),
            ...this.tabs.slice(idx+1, lastIdx + 1)
        ];
        
        if (currentIdx === idx) {
            if (idx === currentIdx) {
                this.changeSelectedTab(this.tabs[idx-1]);
            } else {
                this.changeSelectedTab(this.tabs[idx+1]);
            };
        };
        this._emitTabDataToBoard(e, tab);

        this.tabs = tabList;
    }

    _emitBoardDataToTab (e, tab) {
        // take event to Icon & emit event to Notepad
        const boardDataToTab = new CustomEvent('boardDataToTab', {
            bubbles: true,
            detail: tab
        });
        e.target.dispatchEvent(boardDataToTab);
    };

    _emitTabDataToBoard (e, tab) {
        const tabDataToBoard = new CustomEvent('tabDataToBoard', {
            bubbles: true,
            detail: tab
        });
        e.target.dispatchEvent(tabDataToBoard);
    }

    _emitEmptyTabs (e) {
        const emptyTabs = new CustomEvent('emptyTabs', {
            bubbles: true
        });
        e.target.dispatchEvent(emptyTabs);
    }

    _listenEvents() {
        this.dom.addEventListener('createTab', (e) => {
            const t = new Tab(this.tabId);
            this.appendTab(t);
        });

        this.dom.addEventListener('closeTab', (e) => {
            this.closeTab(e);
        })
    };
};

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
        this.dom.addEventListener('click', (e) => this._emitEvents(e));
    }

    _emitEvents (e) {
        // emit event to NavBar
        if (this.type === 'create') {
            const createTab = new CustomEvent('createTab', { bubbles: true });
            e.target.dispatchEvent(createTab);
        } else if (this.type === 'save') {
            // emit event to Notepad
            const saveTab = new CustomEvent('saveTab', { bubbles: true });
            e.target.dispatchEvent(saveTab);
        }
    }
};

class Tab {
    constructor (id, title="undefined", text="", saved=false, oldTitle=null) {
		this.id = id;
		this.title = title;
		this.text = text;
		this.saved = saved;
		this.oldTitle = oldTitle;
		this.dom = null;
        this._prepareDOM();
    }
    
    _prepareDOM() {
		const tabTemplate = document.getElementById('tab');
		const tabClone = document.importNode(tabTemplate.content, true);
		const tabNameSpan = tabClone.querySelector('.tab-name');
		const tab = tabClone.querySelector('.tab');

        tabNameSpan.innerHTML = this.title;
        this.dom = tab
        this.select();
    };
    
    select () {
        this.dom.classList.add('activeTab')
    };

    unSelect () {
        this.dom.classList.remove('activeTab');
    }

    addCloseEvent () {
        const closeSpan = this.dom.querySelector('.close-tab');
        closeSpan.addEventListener('click', (e) => {
            this._emitEvents(e);
            this.dom.remove();
        })
    }

    getData () {
        return { title: this.title, text: this.text };
    }

    setData (data) {
        Object.keys(data).forEach(key => {
            if (key) {
                if (key === 'title') {
                    this.setTitleDOM(data[key]);
                } else {
                    this[key] = data[key];
                }
            }
        })
    }

    setTitleDOM (title) {
        this.title = title || 'undefined';
        this.dom.querySelector('.tab-name').innerHTML = title;
    }

    setSaveLog (title) {
        this.saved = true;
        this.oldTitle = title;
    }

    _emitEvents (e) {
        const closeTab = new CustomEvent('closeTab', { 
            bubbles: true,
            detail: this
        });
        e.target.dispatchEvent(closeTab);
    }
}

class Board {
    constructor () {
        this.dom = null;
        this.hide = false;
		this._prepareDOM();
    }
    
    _prepareDOM() {
		const textAreaTemplate = document.getElementById('board');
		const textAreaClone = document.importNode(textAreaTemplate.content, true);
		const textAreaDiv = textAreaClone.querySelector('.board');

		this.dom = textAreaDiv;
    };

    _getInputFields() {
        return { 
            titleDOM: this.dom.querySelector('.board-title'),
            textDOM: this.dom.querySelector('.textarea')
        }
    };

    handleShow () {
        this.hide = !this.hide;
        console.log(this.hide);
        if (this.hide) {
            this.dom.style.display = 'none';
        } else {
            this.dom.style.display = 'block';
        }
    }

    getData() {
        const { titleDOM, textDOM } = this._getInputFields();
        const title = titleDOM.value;
        const text = textDOM.value;
        return { title, text };
    };

    setData(title, text) {
        const { titleDOM, textDOM } = this._getInputFields();
        titleDOM.value = title;
        textDOM.value = text;
    }
    
}

class Modal {
	constructor () {
		this.dom = null;
		this.fileList = [];
		this.selectedItem = null;
		this._prepareDOM();
	};

	_prepareDOM() {
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
    }
}