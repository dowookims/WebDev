class Desktop {
	/* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	constructor(data = [
		{type: "normal", name: "icon1"},
		{type: "folder", name: "folder1"},
		{type: "folder", name: "folder2"}
	]){
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
		this.files.forEach(file => {
			file.icon.drawIcon(desktop);
		})
		const folders = document.getElementsByClassName("folder");
		for (let folder in folders){
			folder.addEventListener("click", Folder.addDoubleClick())
		}
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
		this.open = false;
		this.icon = new Icon(data);
		this.Window = new Window();
	}

	handleOpen(){
		this.open = !this.open
		this.Window.handleOpen();
		if (this.Window.open){
			this.Window.drawWindow();
		}
	}

	addDoubleClick(){
		this.handleOpen();
		this.Window.handleOpen();
	}

	
};

class Window {
	/* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	constructor(open = false){
		this.open = open
	}

	drawWindow(){
		const Div = document.createElement('div');
		const WindowTop = document.createElement('div');
		const WindowCloseBox = document.createElement('div');
		const WindowContent = document.createElement('div');
		WindowTop.classList.add('window-top');
		WindowContent.classList.add('window-content');
		WindowCloseBox.classList.add('window-closebox');
		WindowCloseBox.innerHTML = "x";
		Div.appendChild(WindowTop);
		Div.appendChild(WindowContent);
		Div.classList.add("window")
	}

	handleOpen(){
		this.open = !this.open
	}
};
