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
        this._prepareDom();
        this.dndHandler = new DndHandler(this.dom);
    }

    _prepareDom () {
		const iconTemplate = document.getElementById('icon');
        const iconTemplateClone = document.importNode(iconTemplate.content, true);
        iconTemplateClone.querySelector('.icon').classList.add('folder');
        iconTemplateClone.querySelector('.fileName').innerHTML = this.name;
        this.dom = iconTemplateClone.querySelector('.icon');
    }

    adjustPosition (x, y) {
        this.dom.style.left = `${x}px`;
        this.dom.style.top = `${y}px`;
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
                document.removeEventListener(mouseUpEventListener);
            });
        });

        this.targetDom.addEventListener('mousemove', (e) => {
            if (!this.isMouseDown) return;
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
