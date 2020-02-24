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
        this.fileList = [];
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

    createTab (title, text, saved, oldTitle) {
        const tabDiv = this.dom.querySelector('.tab-div');
        const tabInstance = new Tab(this.tabId, title, text, saved, oldTitle);
        
        if (this.board.hide) {
            this.board.show();
        }

        this.tabs.push(tabInstance);
        tabDiv.append(tabInstance.dom);
        this.tabId++;
        return tabInstance;
    };

    changeTab (tab) {
        const pastTab = this.selectedTab;
        const { title, text } = this.board.getData()

        pastTab.close();
        pastTab.setData(title, text);
        pastTab.changeTitleSpan();
        tab.open()
        this.board.setData(tab.title, tab.text);
        this.selectedTab = tab;
    }

    _fetchRequest (method, data=null) {
        if (method === 'get') {
            let result;
            try {
                fetch(`${this.serverUrl}/list`)
                .then(res => res.json())
                .then(res => this.fileList = res)
                .catch(err => console.error(err));
            } catch (e) {
                console.error(e);
            } finally {
                return result;
            }
        } else {
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
    }

    _listenCustomEvent () {
        this.dom.addEventListener('openTab', (e) => {
            this.changeTab(e.detail);
        });

        this.dom.addEventListener('createTab', () => {
            const tab = this.createTab();
            this.changeTab(tab);
        });

        this.dom.addEventListener('saveTab', () => {
            const { title, text } = this.board.getData();
            const data = { title, text };
            const isSaved = this.selectedTab.saved;
            this.selectedTab.setData(title, text);
            this.selectedTab.changeTitleSpan('title');

            if (isSaved) {
                data.oldTitle = this.selectedTab.oldTitle;
                this.selectedTab.oldTitle = title;
                this._fetchRequest('put', data);
            } else {
                this.selectedTab.saved = true;
                this.selectedTab.oldTitle = this.selectedTab.title;
                this._fetchRequest('post', data);
            }
        })

        this.dom.addEventListener('closeTab', (e) => {
            const tab = e.detail;
            const lastIdx = this.tabs.length -1;
            let currentIdx = null;
            for (let i = 0; i < lastIdx + 1; i++) {
                if (tab.id === this.tabs[i].id) {
                    currentIdx = i;
                    break;
                }
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

        this.dom.addEventListener('openModal', () => {
            if (this.fileList.length === 0) {
                this._fetchRequest('get');
            };
            setTimeout(() => {
                this.modal.open(this.fileList);
            }, 100)
        })

        this.dom.addEventListener('loadTab', (e) => {
            const {title, text, saved, oldTitle } = e.detail;
            this.createTab(title, text, saved, oldTitle)
        })
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
        } else if (this.type === 'save') {
            iconEvent = new CustomEvent('saveTab', {
                bubbles: true
            })
        } else if (this.type === 'load') {
            iconEvent = new CustomEvent('openModal', {
                bubbles: true
            })
        }
        e.target.dispatchEvent(iconEvent)
    }
}

class Tab {
    constructor (id, title="undefined", text="", saved=false, oldTitle= '') {
        this.id = id;
        this.title = title;
        this.text = text;
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
        const closeTab = new CustomEvent('closeTab', {
            bubbles: true,
            detail: this
        });
        e.target.dispatchEvent(closeTab);
        this.dom.remove();
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
            this.dom.style.display ="";
        } else {
            this.dom.style.display = "none";
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
        
        submitButton.addEventListener('click', (e) => this.loadTab(e));
        closeButton.addEventListener('click', (e) => this.close(e));
        modal.addEventListener('click', (e) => this.close(e));

        this.dom = modal;
    }

    open (fileList) {
        this.drawInnerModal(fileList);
        this.dom.style.display= 'block';
    }

    close (e) {
        if (e){
            if (e.target.className === 'modal' || e.target.className ==='modal-close') {
                this.dom.style.display = 'none';
            }
        } else {
            this.dom.style.display = 'none';
        }
    }

    drawInnerModal (fileList) {
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
            console.log(file);
			const modalClone = document.importNode(modalTemplate.content, true);
			const modalItem = modalClone.querySelector('.modal-item');
			modalItem.innerHTML = file.title;
			modalBody.append(modalItem);
			file.dom = modalItem;
			file.dom.addEventListener('click', () => { selectModalItem(file) })
			file.dom.addEventListener('dblclick', (e) => {
                console.log('dblclick')
				selectModalItem(file);
				this.loadTab(e);
			});
			this.fileList.push(file);
		});
    };
    
    loadTab (e) {
        const loadTab = new CustomEvent('loadTab', {
            bubbles: true,
            detail: this.selectedItem
        });
        e.target.dispatchEvent(loadTab);
        this.close();
    }
}