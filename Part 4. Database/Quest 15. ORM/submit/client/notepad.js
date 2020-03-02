class Notepad {
    constructor () {
        localStorage.clear();
        this.serverUrl = 'http://127.0.0.1:8080';
        this.tabId = 1;
        this.dom = null;
        this.icons = [];
        this.tabs= [];
        this.selectedTab = null;
        this.board = null;
        this.modal = null;
        this.isLogin = false;
        this.nickname = null;
        this.fileList = [];
        this.noState = false;
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

        const iconArray = ['login', 'logout', 'create', 'load', 'save'];
        iconArray.forEach(icon => {
            let isLogin = this.isLogin ? true : false;
            if (icon === 'login') { isLogin = !isLogin; }
            const iconInstance = new Icon(icon, isLogin)
            this.icons.push(iconInstance);
            iconDiv.append(iconInstance.dom);
        });

        this._listenCustomEvent();
    }

    _prepareTab (data) {
        let tabData;
        if (data.tabs) {
            tabData = data.tabs;
            for (let i = 0; i< tabData.length; i++) {
                const tabInstance = this.createTab(tabData[i].title, tabData[i].text, true, tabData[i].title);
                if (data.selectedTab.title === tabInstance.title) {
                    this.selectedTab = tabInstance;
                }
            };
        } else {
            const tabInstance = this.createTab()
            this.selectedTab = tabInstance;
        };

        this.selectedTab.open();
        this.board.setData(this.selectedTab.title, this.selectedTab.text);
        data.cursor && this.board.setCursor(data.cursor);
    };

    createTab (title, text, saved, oldTitle) {
        const tabDiv = this.dom.querySelector('.tab-div');
        const tabInstance = new Tab(this.tabId, title, text, saved, oldTitle);
        
        this.board.hide && this.board.show();

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
    };


    saveUserInitData () {
        const data = {
            userId: localStorage.getItem('userId'),
            tabs: this.tabs,
            selectedTab: this.selectedTab,
            cursor: this.board.getCursor()
        };
        if (this.noState) {
            this._fetchRequest('post', 'userdata', data)
        } else {
            this._fetchRequest('put', 'userdata', data);
            this.noState = false;
        }
    }

    _fetchRequest (method, target, data=null) {
        if (method === 'get') {
            return fetch(`${this.serverUrl}/${target}`).then(res => res.json())
        } else {
            return fetch(`${this.serverUrl}/${target}`, {
                method: `${method}`,
                credentials: 'same-origin',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .catch(e => console.error(e));
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

        this.dom.addEventListener('saveTab', async () => {
            const { title, text } = this.board.getData();
            const data = { title, text };
            const isSaved = this.selectedTab.saved;
            let method;
            this.selectedTab.setData(title, text);
            this.selectedTab.changeTitleSpan('title');

            if (isSaved) {
                data.oldTitle = this.selectedTab.oldTitle;
                this.selectedTab.oldTitle = title;
                method ='수정';
            } else {
                this.selectedTab.saved = true;
                this.selectedTab.oldTitle = this.selectedTab.title;
                method ='작성';
            }

            try {
                let res = await this._fetchRequest('post', 'notepad', data);
                if (res.success) {
                    this.saveUserInitData();
                    alert(`${title}파일 ${method}이 완료되었습니다.`);
                } else {
                    throw new Error('Server error');
                }
            } catch (e) {
                console.error(e);
            }
        });

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

        this.dom.addEventListener('openModal', async () => {
            if (this.fileList.length === 0) {
                const res = await this._fetchRequest('get', 'list')
                this.fileList = res
                this.modal.open(this.fileList);
            };
        })

        this.dom.addEventListener('loadTab', (e) => {
            const {title, text, saved, oldTitle } = e.detail;
            const tab = this.createTab(title, text, saved, oldTitle)
            this.changeTab(tab);
        });

        this.dom.addEventListener('login', async () => {
            const data = {
                userId: prompt('아이디를 입력하세요'),
                password: prompt('비밀번호를 입력하세요.')
            }

            try {
                const res = await this._fetchRequest('post', 'login', data);
                this.isLogin = res.isLogin;
                if (this.isLogin) {
                    this.icons.forEach(icon => { icon.show() });
                    localStorage.setItem('userId', res.userId);
                    alert(`${res.username} 님 환영합니다.`);
                    const loadLoginData = await this._fetchRequest('get', 'userdata');
                    this._prepareTab(loadLoginData);
                    this.noState = loadLoginData.noState || false;
                } else {
                    alert('아이디 또는 비밀번호를 잘못 입력하셨습니다.');
                }}
            catch (e) {
                console.error(e);
            }
        });

        this.dom.addEventListener('logout', async () => {
            try {
                const res = await this._fetchRequest('post', 'logout', {});
                if(res.result) {
                    this.login = false;
                    localStorage.clear();
                    alert('로그아웃 되었습니다.');
                    this.icons.forEach(icon => { icon.show() });
                    location.reload();
                }
            } catch (e) {
                console.error(e);
            }
        })
    }
}

class Icon {
    constructor (type, isLogin) {
        this.type = type;
        this.dom = null;
        this.hide = isLogin;
        this._prepareDOM();
    }

    _prepareDOM () {
        const iconTemplate = document.getElementById('icon');
        const iconClone = document.importNode(iconTemplate.content, true);
        const iconNameSpan = iconClone.querySelector('.icon-name');
        
        this.dom = iconClone.querySelector('.icon');
        this.dom.classList.add(this.type);
        this.dom.addEventListener('click', (e) => this._handleEvent(e));
        if (!this.hide) {
            this.dom.style.display = 'none';
        }
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
        } else if (this.type === 'login') {
            iconEvent = new CustomEvent('login', {
                bubbles: true,
            })
        } else if (this.type === 'logout') {
            iconEvent = new CustomEvent('logout', {
                bubbles: true,
            })
        }
        e.target.dispatchEvent(iconEvent)
    }

    show() {
        if (!this.hide) {
            this.dom.style.display = 'flex';
        } else {
            this.dom.style.display = 'none';
        }
        this.hide = !this.hide;
    }
}

class Tab {
    constructor (id, title="undefined", text="", saved=false, oldTitle= '') {
        this.id = id;
        this.title = title;
        this.text = text;
        this.saved = saved;
        this.oldTitle = oldTitle;
        this.dom = null;
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
        this.hide = true;
		this._prepareDOM();
    }

    _prepareDOM () {
        const textAreaTemplate = document.getElementById('board');
		const textAreaClone = document.importNode(textAreaTemplate.content, true);
		const textAreaDiv = textAreaClone.querySelector('.board');
        this.dom = textAreaDiv;
        this.dom.style.display = 'none';
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
    };

    getCursor () {
        return this.dom.querySelector('.textarea').selectionStart;
    };

    setCursor (cursor) {
        const board = this.dom.querySelector('.textarea');
        board.focus();
        board.selectionStart = cursor;
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
        closeButton.addEventListener('click', (e) => this.exitByPress(e));
        modal.addEventListener('click', (e) => this.exitByPress(e));

        this.dom = modal;
    }

    open (fileList) {
        this.drawInnerModal(fileList);
        this.dom.style.display= 'block';
    }

    exitByPress (e) {
        if (e.target.className === 'modal' || e.target.className ==='modal-close') {
            this.dom.style.display = 'none';
        }
    };

    exitBySubmit () {
        this.dom.style.display = 'none';
    }

    removeItems () {
        this.fileList.forEach(file => {
            file.dom.remove();
        })
        this.fileList = [];
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
			const modalClone = document.importNode(modalTemplate.content, true);
			const modalItem = modalClone.querySelector('.modal-item');
			modalItem.innerHTML = file.title;
			modalBody.append(modalItem);
			file.dom = modalItem;
			file.dom.addEventListener('click', () => { selectModalItem(file) })
			file.dom.addEventListener('dblclick', (e) => {
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
        this.removeItems();
        this.exitBySubmit();
    }
}