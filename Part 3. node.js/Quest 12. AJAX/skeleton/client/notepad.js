class Notepad {
	/* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
		constructor(){
			this._prepareDOM()
		}

		_prepareDOM(){
			const menu = document.querySelector('.icon-div');

			const iconArr = [
				{name: 'new', type: 'create'},
				{name: 'load', type: 'load'},
				{name: 'save', type: 'save'}
			];
			const iconInstances = iconArr.map(icon => {
						const iconItem = new Icon(icon.name, icon.type)
						menu.append(iconItem.dom);
					}
			);
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
		constructor(){}
		
		_prepareDOM(){}

		_closeTab(){}
};

class Board {
		constructor(){}
		
		_prepareDOM(){}
};
