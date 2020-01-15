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
			file.type === type &&file.icon.changeIcon(url, w, h);
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
		this.iconDOM = null;
		this.iconSize = data.iconSize;
		this.name = data.name;
		this.type = data.type;
		this.draggable = false;
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
		Div.addEventListener('mousedown', this.handleMouseDown());
		Div.addEventListener('mousemove', this.handleMouseMove());
		Div.addEventListener('mouseup', this.handleMouseUp());
		
		this.iconDOM = Div;
		console.log("DIVV", Desktop)
		Desktop.appendChild(Div);
	};

	changeIcon(url, w, h){
		this.iconSize = { w, h };
		this.imageUrl = url;

		this.iconDOM.style.backgroundImage = `url(${url})`;
		this.iconDOM.style.width = w + 'px';
		this.iconDOM.style.height = h + 'px';
	}

	handleMouseDown(){
		const self = this;
		return function(){
			self.draggable = true;
			this.style.position = 'absolute';
			this.style.zIndex = 10;
		}
	};

	handleMouseMove(){
		const self = this;
		return function(e){
			if (self.draggable){
				self.moveIcon(e.pageX, e.pageY, this);
			}
		}
	};

	moveIcon(pageX, pageY, target) {
		target.style.left = pageX - target.offsetWidth / 2 + 'px';
		target.style.top = pageY - target.offsetHeight / 2 + 'px';
	};

	handleMouseUp(){
		const self = this;
		return function(){
			self.draggable = false;
		}
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
		const self = this;
		return function(){
			self.Window.handleWindowOpen(self);
		}
	}	
};

class Window {
	/* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	constructor(open = false){
		this.open = open;
		this.folderName = null;
		this.windowDOM = null;
		this.draggable = false;
		this.shiftX = 0;
		this.shiftY = 0;
	}

	drawWindow(){
		if (!this.windowDOM && !this.open){
			const Desktop = document.getElementsByClassName('desktop')[0];
			const Div = document.createElement('div');
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
			Div.appendChild(WindowTop);
			Div.appendChild(WindowContent);
			Div.classList.add("window");

			Div.addEventListener('mousedown', this.handleMouseDown());
			Div.addEventListener('mousemove', this.handleMouseMove());
			Div.addEventListener('mouseup', this.handleMouseUp());

			Desktop.appendChild(Div);
			this.windowDOM = Div
			

			this.open = !this.open;
		} else if (!this.open) {
			this.windowDOM.style.display = "";
		}
	}

	handleWindowOpen(folder){
		if (!this.open){
			this.folderName = folder.name;
			this.drawWindow();
		}
	}

	handleWindowClose(){
		return () => {
			this.open = false;
			this.windowDOM.style.display = "none";
		}
	}

	handleMouseDown(){
		return (e) => {
			this.shiftX = e.clientX - this.windowDOM.getBoundingClientRect().left;
			this.shiftY = e.clientY - this.windowDOM.getBoundingClientRect().top;
			this.draggable = true;
			this.windowDOM.style.zIndex = 12;
		}
	};

	handleMouseMove(){
		return (e) => {
			if (this.draggable){
				this.moveWindow(e.pageX, e.pageY, this.windowDOM, this);
			}
		}
	};

	moveWindow(pageX, pageY, target, self) {
		target.style.left = pageX - self.shiftX + 'px';
		target.style.top = pageY - self.shiftY + 'px';
	};

	handleMouseUp(){
        return () => { this.draggable = false; };
	}
};

class DragDOM {
// 	static 
}