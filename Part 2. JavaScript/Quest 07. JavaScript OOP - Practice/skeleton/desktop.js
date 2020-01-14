class Desktop {
	/* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	constructor (data = [
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
	]) {

		/* Singleton Pattern
		if (!!Desktop.instance){
			return Desktop.instance;
		}

		Desktop.instance = this;
		this.data = data;
		this.files = []
		return this;
		*/
		if (!Desktop.len){
			Desktop.len = 0;
		} else {
			Desktop.len++;
		}

		this.data = data;
		this.files = [];
		this.desktopNum = Desktop.len;
		
	}

	_init(){
		this.getAllData();
		this.drawAllData();
	};

	getAllData(){
		this.data.forEach(file => {
			this.addFile(file);
		})
	}
	
	drawAllData(){
		let folderIdx = 0;

		const app = document.getElementsByClassName('app')[0];
		const desktop = document.createElement('section');
		
		desktop.classList.add('desktop');
		// desktop.addEventListener('mouseout', this.desktopMouseUp);
		app.appendChild(desktop);
		
		this.files.forEach((file, dataIdx) => {
			file.icon.drawIcon(desktop);
			if (file.type === 'folder'){
				const folderElem = document.getElementsByClassName('folder')[folderIdx];
				folderElem.addEventListener('click', this.files[dataIdx].handleFolderClick());
				folderIdx++;
			}
		});	
	};

	/*
		const btn = document.createElement('button');
		const desktop = document.getElementsByClassName('desktop')[0];
		btn.innerText = "click me!";
		desktop.appendChild(btn);
		btn.addEventListener('click', myDesktop.appendItem({name:'kakao', type:'folder', iconSize: {w:100, h:100}}));
	*/ 
	
	appendItem(fileData){
		this.addFile(fileData);
		this.addData(fileData);
		this.drawFile();
	};

	addData(fileData){
		this.data.push(fileData);
	};

	addFile(fileData){
		if (fileData.type === "normal"){
			this.files.push(new File(fileData))
		} else {
			this.files.push(new Folder(fileData))
		}
	}

	drawFile(){
		const desktop = document.getElementsByClassName('desktop')[this.desktopNum];
		const file = this.files[this.files.length-1];
		file.icon.drawIcon(desktop);
		if (file.type === 'folder'){
			const folderElem = document.getElementsByClassName('folder')
			folderElem[folderElem.length -1].addEventListener('dblclick', file.handleFolderClick());
		}
	};

	changeAllIcon(type, url, w, h){
		this.files.forEach(file => {
			if (file.type === type){
				file.icon.changeIcon(url, w, h)
			}
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
			if (data.type === 'normal'){
				return normalIconUrl;
			} else if(data.type === 'folder') {
				return folderIconUrl
			}
		})()
	};

	drawIcon(parent){
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

		parent.appendChild(Div);
	};

	changeIcon(url, w, h){
		this.iconSize = { w, h };
		this.imageUrl = url;

		this.iconDOM.style.backgroundImage = `url(${url})`;
		this.iconDOM.style.width = w + 'px';
		this.iconDOM.style.height = h + 'px';
	}

	handleMouseDown(e){
		const self = this;
		return function(e){
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
		return function(e){
			e.stopPropagation();
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
		this.folderDOM = null;
		this.draggable = false;
	}

	drawWindow(){
		if (!this.folderDOM && !this.open){
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
			this.folderDOM = Div
			

			this.open = !this.open;
		} else if (!this.open) {
			this.folderDOM.style.display = "";
		}
	}

	handleWindowOpen(folder){
		if (!this.open){
			this.folderName = folder.name;
			this.drawWindow();
		}
	}

	handleWindowClose(){
		const self = this;
		return function(){
			self.open = !self.open;
			self.folderDOM.style.display = "none";
		}
	}

	handleMouseDown(){
		const self = this;
		return function(e){
			self.draggable = true;
			this.style.position = 'absolute';
			this.style.zIndex = 12;
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
		return function(e){
			e.stopPropagation();
			self.draggable = false;
		}
	}
};
