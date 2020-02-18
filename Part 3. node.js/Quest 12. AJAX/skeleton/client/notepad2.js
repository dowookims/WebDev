class NotePad {
	constructor () {
		this._serverUrl = (function() {
			return '127.0.0.1:8080';
		})();
		this.dom = null;
	}

	_prepareDOM() {}
};

class NavBar {
	constructor () {
		this.tabs = [];
	}
	_prepareDOM () {}
}

class Tab {
	constructor (title="undefined") {
		this.title = undefined
		this.dom = null;
	}

	_prepareDOM() {}

	openTab() {}
	closeTab() {}
}

class Icon {
	constructor (type) {
		this.type = type;
		this.dom = null;
	}

	_prepareDOM() {}
}

class Board {
	constructor (title="", text="") {
		this.title = title;
		this.text = text;
		this.dom = null;
	}

	_prepareDOM() {}
}

class StateControl {
	constructor () {
		if (StateControl.instance) {
			return StateControl.instance;
		};
		StateControl.instance = this;
		this.boardTitle = '';
		this.boardText = '';
	}
}