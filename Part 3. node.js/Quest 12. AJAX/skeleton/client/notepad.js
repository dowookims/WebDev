class Notepad {
	/* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
		constructor(){
			this.tabs = []
			this._prepareDOM()
		}

		_prepareDOM(){
			const iconDiv = document.querySelector('.icon-div');
			const tapDiv = document.querySelector('.tab-div');

			const iconArr = [
				{name: 'new', type: 'create'},
				{name: 'load', type: 'load'},
				{name: 'save', type: 'save'}
			];
			const iconInstances = iconArr.map(icon => {
						const iconItem = new Icon(icon.name, icon.type)
						iconDiv.append(iconItem.dom);
					}
			);

			if (this.tabs.length === 0) {
					const newTab = new Tab(1, 'untitled', '');
					tapDiv.append(newTab.dom);
			} else {
					this.tabs.forEach(tab => {
						const tabItem = new Tab(tab.id, tab.name, tab.text);
						tapDiv.append(tabItem.dom);
					})
			}
		}
};

class Icon {
		constructor(name,type){
				this.name = name;
				this.type = type;
				this.dom = null;
				this._prepareDOM()
		}
		
		_prepareDOM(){
				const iconTemplate = document.getElementById('icon');
				const iconClone = document.importNode(iconTemplate.content, true);
				const iconNameSpan = iconClone.querySelector('.icon-name');
				iconNameSpan.innerHTML = this.name;
				this.dom = iconClone.querySelector('.icon');
		}

		clickEvent(){}
};

class Tab {
		constructor(id, name, text){
			this.id = id;
			this.name = name;
			this.text = text;
			this.dom = null;
			this._prepareDOM();
		}
		
		_prepareDOM(){
				const tabTemplate = document.getElementById('tab');
				const tabClone = document.importNode(tabTemplate.content, true);
				const tabNameSpan = tabClone.querySelector('.tab-name');
				tabNameSpan.innerHTML = this.name;
				this.dom = tabClone.querySelector('.tab');
		}

		_closeTab(){}
};

class Board {
		constructor(){}
		
		_prepareDOM(){}
};
