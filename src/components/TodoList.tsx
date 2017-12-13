import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { StoreProps, storeInjector } from '../stores/store';
import styled from 'styled-components';
import { TodoItem } from './TodoItem';

@inject(storeInjector) @observer
export class TodoList extends React.Component<StoreProps> {
    render() {
        const { store } = this.props;
        return (
            <List>
                {store!.visibleTodos.map(todo =>
                    <TodoItem key={todo.id} todo={todo} />)}
            </List>
        );
    }
}

const List = styled.ul`
    width: 600px;
    list-style: none;
`;
