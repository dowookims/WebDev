class Notepad {
    constructor () {
        this.serverUrl = 'http://127.0.0.1:8080';
        this.tabId = 1;
        this.dom = null;
        this.tabs= null;
        this.board = null;
        this.modal = null;
		this._prepareDOM();
    }

    _prepareDOM () {
        const app = document.getElementById('app');
        this.dom = app;
    }

    _prepareIcon () {}

    _prepareTab () {}
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
		iconNameSpan.innerHTML = this.type;
    }

    _handleEvent () {}
}

class Tab {
    constructor (id, title, text, saved, oldTitle) {
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
        const tab = tabClone.querySelector('.tab');
        
        tabNameSpan.innerHTML = this.title;
        this.dom = tab
    }

    open () { }

    emitOpen () { }

    close () { }

    emitClose () { }

    setTabTitle () {}
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