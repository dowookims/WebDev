class Notepad {
    constructor () {
        this.serverUrl = 'http://127.0.0.1:8080';
        this.tabId = 1;
        this.dom = null;
        this.icons = [];
        this.tabs= [];
        this.selectedTab = null;
        this.board = null;
        this.modal = null;
        this._prepareDOM();
    }

    _prepareDOM () {
        const app = document.getElementById('app');
        const menuTemplate = document.getElementById('menu');
        const menuClone = document.importNode(menuTemplate.content, true);
        const menu = menuClone.querySelector('.menu');
        const iconDiv = menuClone.querySelector('.icon-div');

        this.board = new Board();
        this.modal = new Modal();

        app.append(menu);
        app.append(this.board.dom);
        app.append(this.modal.dom);
        this.dom = app;

        const iconArray = ['create', 'load', 'save'];
        iconArray.forEach(icon => {
            const iconInstance = new Icon(icon)
            
            this.icons.push(iconInstance);
            iconDiv.append(iconInstance.dom);
        });

        this._listenCustomEvent();
        this._prepareTab();
    }

    _prepareTab () {
        const tabData = [];
        if (tabData.length > 0 ) {
            for (let i = 0; i< tabData.length; i++) {
                const tabInstance = this.createTab(tabData[i].title);
                if (i !== tabData.length - 1) {
                    tabInstance.close();
                } else {
                    this.selectedTab = tabInstance;
                }
            }
        } else {
            const tabInstance = this.createTab()
            this.selectedTab = tabInstance;
        }
        this.selectedTab.open();
        this.board.setData(this.selectedTab.title, this.selectedTab.text);
    };

    createTab (title = undefined) {
        const tabDiv = this.dom.querySelector('.tab-div');
        const tabInstance = new Tab({id: this.tabId, title: title});
        this.tabs.push(tabInstance);
        tabDiv.append(tabInstance.dom);
        this.tabId++;
        return tabInstance;
    };

    changeTab (tab) {
        const pastTab = this.selectedTab;
        const selectedTab = tab;

        pastTab.close();
        const { title, text } = this.board.getData()
        pastTab.setData(title, text);
        pastTab.changeTitleSpan();
        this.selectedTab = tab;
        selectedTab.open();
        this.board.setData(selectedTab.title, selectedTab.text);
    }

    _listenCustomEvent () {
        this.dom.addEventListener('openTab', (e) => {
            this.changeTab(e.detail);
        });

        this.dom.addEventListener('createTab', () => {
            const tab = this.createTab();
            this.changeTab(tab);
        });

        this.dom.addEventListener('closeTab', (e) => {
            const tab = e.detail;
            const lastIdx = this.tabs.length -1;
            let currentIdx;
            for (let i = 0; i < lastIdx + 1; i++) {
                if (tab.id === this.tabs.id) currentIdx = i;
                break;
            };

            if (this.selectedTab.id === tab.id) {
                if (lastIdx === 0) {
                    this.board.show()
                } else if (currentIdx === lastIdx) {
                    this.changeTab(this.tabs[currentIdx-1]);
                } else {
                    this.changeTab(this.tabs[currentIdx+1]);
                }
            };
            this.tabs = [
                ...this.tabs.slice(0, currentIdx),
                ...this.tabs.slice(currentIdx+1, lastIdx+1)
            ];
        });
    }
}

class Icon {
    constructor (type) {
        this.type = type;
        this.dom = null;
        this._prepareDOM();
    }

    _prepareDOM () {
        const iconTemplate = document.getElementById('icon');
        const iconClone = document.importNode(iconTemplate.content, true);
        const iconNameSpan = iconClone.querySelector('.icon-name');
        
        this.dom = iconClone.querySelector('.icon');
        this.dom.addEventListener('click', (e) => this._handleEvent(e));
		iconNameSpan.innerHTML = this.type;
    }

    _handleEvent (e) {
        let iconEvent;
        if (this.type === 'create') {
            iconEvent = new CustomEvent('createTab', {
                bubbles: true
            })
        }
        e.target.dispatchEvent(iconEvent)
    }
}

class Tab {
    constructor (id, title, text, saved, oldTitle) {
        this.id = id;
        this.title = title ? title : 'undefined';
        this.text = text ? text : '';
        this.saved = saved;
        this.oldTitle = oldTitle;
        this._prepareDOM();
    }

    _prepareDOM () {
        const tabTemplate = document.getElementById('tab');
		const tabClone = document.importNode(tabTemplate.content, true);
        const tabNameSpan = tabClone.querySelector('.tab-name');
        const closeSpan = tabClone.querySelector('.close-tab');
        const tab = tabClone.querySelector('.tab');
        
        tab.addEventListener('click', (e) => this._emitOpen(e));
        closeSpan.addEventListener('click', (e) => this._emitClose(e));
        tabNameSpan.innerHTML = this.title;
        this.dom = tab
    }

    open () {
        this.dom.classList.add('activeTab');
    }

    _emitOpen (e) {
        const openTab = new CustomEvent('openTab', {
            bubbles: true,
            detail: this
        });
        e.target.dispatchEvent(openTab);
    }

    close () {
        this.dom.classList.remove('activeTab');
    }

    _emitClose (e) {
        this.dom.remove();
        const closeTab = new CustomEvent('closeTab', {
            bubbles: true,
            detail: this
        });
        e.target.dispatchEvent(closeTab);
    }

    setData (title, text) {
        this.title = title ? title : 'undefined';
        this.text = text;
    }

    changeTitleSpan () {
        this.dom.querySelector('.tab-name').innerHTML = this.title;
    }
}

class Board {
    constructor () {
        this.dom = null;
        this.hide = false;
		this._prepareDOM();
    }

    _prepareDOM () {
        const textAreaTemplate = document.getElementById('board');
		const textAreaClone = document.importNode(textAreaTemplate.content, true);
		const textAreaDiv = textAreaClone.querySelector('.board');
		this.dom = textAreaDiv;
    }

    _getInputFields() {
        return { 
            titleDOM: this.dom.querySelector('.board-title'),
            textDOM: this.dom.querySelector('.textarea')
        }
    };

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

    show () {
        if (this.hide) {
            this.dom.display = "none";
        } else {
            this.dom.display ="";
        };
        this.hide = !this.hide;
    }
}

class Modal {
    constructor () {
        this.dom = null;
		this.fileList = [];
		this.selectedItem = null;
		this._prepareDOM();
    }

    _prepareDOM () {
        const modalTemplate = document.getElementById('modal');
		const modalClone = document.importNode(modalTemplate.content, true);
		const modal = modalClone.querySelector('.modal');
		const closeButton = modalClone.querySelector('.modal-close');
        const submitButton = modalClone.querySelector('.modal-submit');
        
        this.dom = modal;
    }

    open () {}

    close () {}

    loadTab () {}
}