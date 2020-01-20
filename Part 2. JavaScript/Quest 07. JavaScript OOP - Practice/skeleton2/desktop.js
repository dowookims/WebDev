class Desktop {
    constructor (targetDom, icons) {
        this.dom = targetDom;
        this.icons = icons;
        this.iconCount = 0;
        this._prepareDom();
    }

    _prepareDom () {
        this.icons.forEach(icon => {
            icon.adjustPosition(0, this.iconCount * 120);
            this.iconCount++;

            this.dom.append(icon.dom);
        });
    }
}

class Icon {
    constructor (name) {
        this.name = name;
        this._prepareDom();
        this.dndHandler = new DndHandler(this.dom);
    }

    _prepareDom () {
		const iconTemplate = document.getElementById('icon');
        const iconTemplateClone = document.importNode(iconTemplate.content, true);
        iconTemplateClone.querySelector('.fileName').innerHTML = this.name;
        this.dom = iconTemplateClone.querySelector('.icon');
    }

    adjustPosition (x, y) {
        this.dom.style.left = `${x}px`;
        this.dom.style.top = `${y}px`;
    }
}

class Folder {
    constructor (name) {
        this.name = name;
        this.window = null;
        this._prepareDom();
        this.dndHandler = new DndHandler(this.dom);
    }

    _prepareDom () {
		const iconTemplate = document.getElementById('icon');
        const iconTemplateClone = document.importNode(iconTemplate.content, true);
        iconTemplateClone.querySelector('.icon').classList.add('folder');
        iconTemplateClone.querySelector('.fileName').innerHTML = this.name;
        this.dom = iconTemplateClone.querySelector('.icon');
        this._openWindow();
    }

    _openWindow () {
        this.dom.addEventListener('dblclick', () => {
            this.dndHandler.isMouseDown = false;
            if (!this.window) {
                this.window = new Window(this.name)
                this.dom.append(this.window.dom);
            }
            else this.window.dom.style.display = "block";
        })
    }

    adjustPosition (x, y) {
        this.dom.style.left = `${x}px`;
        this.dom.style.top = `${y}px`;
    }
}

class Window {
    constructor (name) {
        this.name = name;
        this.dom = null;
        this._prepareDOM();
        this.dndHandler = new DndHandler(this.dom);
    }

    adjustPosition (x, y) {
        this.dom.style.left = `${x}px`;
        this.dom.style.top = `${y}px`;
    }

    _prepareDOM () {
        const windowTemplate = document.getElementById('window');
        const windowClone = document.importNode(windowTemplate.content, true);
        const windowDiv = windowClone.querySelector('.window');
        windowClone.querySelector('.window-name').innerHTML = this.name;
        windowClone.querySelector('.window-close-span').addEventListener('click', () => { 
            this.dom.style.display = 'none';
            this.adjustPosition(400, 0);
        })
        this.dom = windowDiv;
    }

}
class DndHandler {
    constructor (targetDom) {
        this.targetDom = targetDom;
        this.xCoord = 0;
        this.yCoord = 0;
        this.isMouseDown = false;
        this._prepareEvents();
    }

    _prepareEvents () {
        this.targetDom.addEventListener('mousedown', (e) => {
            this.isMouseDown = true;
            this._refreshCoords(e);

            const mouseUpEventListener = document.addEventListener('mouseup', () => {
                this.isMouseDown = false;
                document.removeEventListener('mouseup', mouseUpEventListener);
            });
        });

        this.targetDom.addEventListener('mousemove', (e) => {
            if (!this.isMouseDown) return;
            e.stopPropagation();
            const deltaX = e.clientX - this.xCoord
            const deltaY = e.clientY - this.yCoord 
            this.targetDom.style.left = `${Number(this.targetDom.style.left.replace('px', '')) + deltaX}px`
            this.targetDom.style.top = `${Number(this.targetDom.style.top.replace('px', '')) + deltaY}px`
            this._refreshCoords(e);
        });
    }

    _refreshCoords (e) {
            this.xCoord = e.clientX;
            this.yCoord = e.clientY;
    }
}
