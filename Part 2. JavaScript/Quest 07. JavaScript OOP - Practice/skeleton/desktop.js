class Desktop {
	/* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	constructor(data = [
		{type: "normal", name: "icon1"},
		{type: "folder", name: "folder1"},
		{type: "folder", name: "folder2"}
	]) {
		if (!!Desktop.instance){
			return Desktop.instance;
		}

		Desktop.instance = this;
		this.data = data;
		this.files = []
		return this;
	}

	_init(){
		this.getData();
		this.drawData();
	};

	getData(){
		this.data.forEach(file => {
			if (file.type === "normal"){
				this.files.push(new File(file))
			} else {
				this.files.push(new Folder(file))
			}
		})
	}
	drawData(){
		const desktop = document.getElementsByClassName('desktop')[0]
		let dataIdx = 0;
		let folderIdx = 0;
		this.files.forEach(file => {
			file.icon.drawIcon(desktop);
			if (file.type === 'folder'){
				const folderElem = document.getElementsByClassName('folder')[folderIdx];
				const that = this.files[dataIdx]
				folderElem.addEventListener('click', this.files[dataIdx].handleFolderClick());
				folderIdx++;
			}
			dataIdx++;
		})
	}
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
		this.name = data.name;
		this.type = data.type;
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
		parent.appendChild(Div);
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
			Div.appendChild(WindowTop);
			Div.appendChild(WindowContent);
			WindowCloseSpan.addEventListener('click', this.handleWindowClose());
			this.folderDOM = Div
			Div.classList.add("window");
			Desktop.appendChild(Div);

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
};
