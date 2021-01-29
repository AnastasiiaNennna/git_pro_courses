class Tabset {
    static ITEM_CLASS = 'tabset-item';
    static ITEM_TITLE_CLASS = 'tabset-item-title';
    static ITEM_BODY_CLASS = 'tabset-item-body';
    static OPEN_CLASS = 'open';
    static ACTIVE_CLASS = 'active';

    constructor(el) {
        this._el = el;
        this.bindClasses(el);
        this.bindEvents(el);
    };
    
    bindClasses(el) { 
        Array.prototype.forEach.call(el.children, (tabsetItem) => {
            tabsetItem.classList.add(Tabset.ITEM_CLASS);
            let [titleEl, bodyEl] = tabsetItem.children;
            titleEl.classList.add(Tabset.ITEM_TITLE_CLASS);
            bodyEl.classList.add(Tabset.ITEM_BODY_CLASS);
        });
    };
    
    bindEvents(el) {
        el.addEventListener('click', this.clickHandler);
    };

    clickHandler = (e) => {
        if (e.target.classList.contains(Tabset.ITEM_TITLE_CLASS)) {
        this.deactivateItems();
        this.activateTitle(e.target);
        let itemEl = this.findItem(e.target);
        this.showBody(itemEl);
        };
    };

    findBody(el) {
        let itemEl = this.findItem(el);
        return itemEl.querySelector('.' + Tabset.ITEM_BODY_CLASS);
    };

    findItem(el) {
        return el.closest('.' + Tabset.ITEM_CLASS);
    };

    showBody(itemEl) {
        let bodyEl = this.findBody(itemEl);
        bodyEl.classList.add(Tabset.OPEN_CLASS);
    };

    activateTitle(el) {
        el.classList.add(Tabset.ACTIVE_CLASS);
    };

    deactivateItems() {
        this.deactivateTitle();
        this.hideBody(); 
    };

    hideBody() {
        this._el.querySelector('.' + Tabset.OPEN_CLASS).classList.remove(Tabset.OPEN_CLASS);
    };

    deactivateTitle() {
        this._el.querySelector('.' + Tabset.ACTIVE_CLASS).classList.remove(Tabset.ACTIVE_CLASS);
    };
};