class Desktop {
	/* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	constructor (data = 
		[
            {
                type: "normal",
                name: "icon1",
                iconSize: { h: 100, w: 100 }
            },
            {
                type: "folder", 
                name: "folder1", 
                iconSize: { h: 100, w: 100 }
            },
            {
                type: "folder", 
                name: "folder2", 
                iconSize: { h: 100, w: 100 }
            }
		]
	) {
		Desktop.len ? Desktop.len++ : Desktop.len = 0;

		this.data = data;
		this.files = [];
		this.desktopNum = Desktop.len;
		
	}

	_init(){
		this.drawAllFiles();
	};
	
	drawAllFiles() {
		const app = document.getElementsByClassName('app')[0];
		const desktop = document.createElement('section');
		
		desktop.classList.add('desktop');
		app.appendChild(desktop);
		
		this.data.forEach((file) => {
			this.addFile(file);
		});
	};

	/*
		const btn = document.createElement('button');
		const desktop = document.getElementsByClassName('desktop')[0];
		btn.innerText = "click me!";
		desktop.appendChild(btn);
		btn.addEventListener('click', myDesktop.appendItem({name:'kakao', type:'folder', iconSize: {w:100, h:100}}));
	*/ 
	

	addFile(fileData){
		const desktop = document.getElementsByClassName('desktop')[this.desktopNum];

		this.files.length && this.data.push(fileData)

		fileData.type === "normal" 
		? this.files.push(new File(fileData)) 
		: this.files.push(new Folder(fileData));

		const file = this.files[this.files.length-1];
		file.icon.drawIcon(desktop);

		file.type === 'folder' && (() => {
			const folderElem = document.getElementsByClassName('folder');
			folderElem[folderElem.length -1].addEventListener('dblclick', file.handleFolderClick());
		})();
	}


	changeAllIcon(type, url, w, h){
		this.files.forEach(file => {
			file.type === type && file.icon.changeIcon(url, w, h);
		});
	};
};

class File {
	/* 파일들을 관리하는 클래스 */ 
	constructor(data){
		this.name = data.name;
		this.type = data.type;
		this.icon = new Icon(data)
	}
}

class Icon {
	/* TODO: Icon 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	constructor(data){
		this.DOM = null;
		this.iconSize = data.iconSize;
		this.name = data.name;
		this.type = data.type;
		this.draggable = false;
		this.shiftX = 0;
		this.shiftY = 0;
		this.imageUrl = (function(){
			const normalIconUrl = "https://pbs.twimg.com/profile_images/706869492098400257/B9sZcbmV_400x400.jpg";
			const folderIconUrl = "https://www.vippng.com/png/detail/96-965935_transparent-images-pluspng-icon-white-folder-icon-transparent.png";
			return data.type === 'normal' ? normalIconUrl : folderIconUrl
		})()
	};

	drawIcon(Desktop){
		const Div = document.createElement('div');
		const P = document.createElement('p');

		Div.classList.add('icon');
		if (this.type === "normal"){
			Div.classList.add("file")
		} else {
			Div.classList.add("folder")
		}

		P.classList.add("fileName")
		P.innerHTML = this.name;
		Div.appendChild(P);

		Div.style.backgroundImage = `url(${this.imageUrl})`;
		Div.style.width = this.iconSize.w + 'px';
		Div.style.height = this.iconSize.h + 'px';
		Div.addEventListener('mousedown', DragDOM.handleMouseDown(this));
		Div.addEventListener('mousemove', DragDOM.handleMouseMove(this));
		Div.addEventListener('mouseup', DragDOM.handleMouseUp(this));
		
		this.DOM = Div;
		Desktop.appendChild(Div);
	};

	changeIcon(url, w, h){
		this.iconSize = { w, h };
		this.imageUrl = url;

		this.DOM.style.backgroundImage = `url(${url})`;
		this.DOM.style.width = w + 'px';
		this.DOM.style.height = h + 'px';
	}
};



class Folder {
	/* TODO: Folder 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	constructor(data){
		this.name = data.name;
		this.type = data.type;
		this.icon = new Icon(data);
		this.Window = new Window();
	}

	handleFolderClick(){
		return () => {
			this.Window.handleWindowOpen(this.name)
		};
	}	
};

class Window {
	/* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	constructor(open = false){
		this.open = open;
		this.folderName = null;
		this.DOM = null;
		this.draggable = false;
		this.shiftX = 0;
		this.shiftY = 0;
	}

	drawWindow(){
		if (!this.DOM && !this.open){
			const Desktop = document.getElementsByClassName('desktop')[0];
			const Window = document.createElement('div');
			const WindowTop = document.createElement('div');
			const WindowNameSpan = document.createElement('span');
			const WindowCloseSpan = document.createElement('span');
			const WindowContent = document.createElement('div');


			WindowTop.classList.add('window-top');
			WindowContent.classList.add('window-content');
			WindowNameSpan.classList.add('window-name');
			WindowCloseSpan.classList.add('window-close-span');

			WindowNameSpan.innerHTML = this.folderName;
			WindowCloseSpan.innerHTML = "&times";

			WindowTop.appendChild(WindowNameSpan);
			WindowTop.appendChild(WindowCloseSpan);
			WindowCloseSpan.addEventListener('click', this.handleWindowClose());
			Window.appendChild(WindowTop);
			Window.appendChild(WindowContent);
			Window.classList.add("window");

			Window.addEventListener('mousedown', DragDOM.handleMouseDown(this));
			Window.addEventListener('mousemove', DragDOM.handleMouseMove(this));
			Window.addEventListener('mouseup', DragDOM.handleMouseUp(this));

			Desktop.appendChild(Window);
			this.DOM = Window
			

			this.open = !this.open;
		} else if (!this.open) {
			this.DOM.style.display = "";
		}
	}

	handleWindowOpen(folderName){
		!this.open && (() => {
			this.folderName = folderName;
			this.drawWindow();
		})();
	}

	handleWindowClose(){
		return () => {
			this.open = false;
			this.DOM.style.display = "none";
		}
	}
};

class DragDOM {
// 	static 
	constructor(){}

	static handleMouseDown(Obj) {
		return (e) => {
			Obj.shiftX = e.clientX - Obj.DOM.getBoundingClientRect().left;
			Obj.shiftY = e.clientY - Obj.DOM.getBoundingClientRect().top;
			Obj.draggable = true;
			Obj.DOM.style.position = 'absolute';
			Obj.DOM.style.zIndex = 10;
		};
	};

	static handleMouseMove(Obj) {
		return e =>  Obj.draggable && (() => {
			Obj.DOM.style.left = e.pageX - Obj.shiftX + 'px';
			Obj.DOM.style.top = e.pageY - Obj.shiftY + 'px';
		})();
	};

	static handleMouseUp(Obj) {
		return () => Obj.draggable = false;
	};
}