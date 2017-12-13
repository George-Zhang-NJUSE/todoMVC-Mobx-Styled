import { observable, useStrict, action, computed } from 'mobx';

export { Todo, Filter, StoreProps, storeInjector, Store, filters };

useStrict(true);

type Todo = {
    content: string,
    isCompleted: boolean,
    id: number
};

type Filter = 'ALL' | 'ACTIVE' | 'COMPLETED';

const filters: Filter[] = ['ALL', 'ACTIVE', 'COMPLETED'];

type AllStores = {
    store: Store
};

type StoreProps = {
    store?: Store
};

const storeInjector = (allStores: AllStores) => ({ store: allStores.store });

class Store {

    private nextTodoId = 0;

    @observable filter: Filter = 'ALL';

    @observable todos: Todo[] = [];

    @computed get leftItemsNum(): number {
        return this.todos.filter(todo => !todo.isCompleted).length;
    }

    @computed get visibleTodos(): Todo[] {
        switch (this.filter) {
            case 'ALL':
                return this.todos;
            case 'ACTIVE':
                return this.todos.filter(t => !t.isCompleted);
            case 'COMPLETED':
                return this.todos.filter(t => t.isCompleted);
            default:
                throw new Error('Invalid Filter Value!');
        }
    }

    @computed get hasCompleted(): boolean {
        return !!this.todos.find(todo => todo.isCompleted);
    }

    @action addTodo(content: string) {
        this.todos.push({
            content,
            isCompleted: false,
            id: this.nextTodoId++
        });
    }

    @action deleteTodo(id: number) {
        this.todos.splice(this.todos.findIndex(todo => todo.id === id));
    }

    @action toggleTodo(id: number) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.isCompleted = !todo.isCompleted;
        }
    }

    @action setFilter(newFilter: Filter) {
        this.filter = newFilter;
    }

    @action clearCompleted() {
        this.todos = this.todos.filter(t => !t.isCompleted);
    }

    @action toggleAll() {
        const shouldComplete = this.leftItemsNum > 0;
        this.todos.forEach(t => t.isCompleted = shouldComplete);
    }
}