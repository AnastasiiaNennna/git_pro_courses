class NewTodoItem {
    static ADD_BUTTON_SELECTOR = '.add-todo-btn';
    static NEW_TODO_SELECTOR = '.new-todo';
    
    constructor (options) {
        this._$el = this.initForm();
        this._$newTodo = this._$el.find(NewTodoItem.NEW_TODO_SELECTOR);
        this._options = options;
    };

    initForm() {
        return $(`<form id="todoForm">
                    <input 
                        class="new-todo" 
                        type ="text" 
                        placeholder="Type what you want to do"
                    />
                    <button class="add-todo-btn"> ADD </button>
                    </form>`)
                .on('click', NewTodoItem.ADD_BUTTON_SELECTOR, this.onAddBtnClick.bind(this));
    };

    appendTo($container){
        $container.append(this._$el);
    };

    onAddBtnClick(e) {
        e.preventDefault();
        const newTodo = {
            completed: false,
            title: this._$newTodo.val()
            };
        this._options.onSave(newTodo);
        this.clearForm();
    };

    clearForm() {
        this._$newTodo.val('');
    };
};