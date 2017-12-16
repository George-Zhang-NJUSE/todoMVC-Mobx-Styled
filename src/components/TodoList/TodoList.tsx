import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { StoreProps, storeInjector } from '../../stores/store';
import styled from 'styled-components';
import { TodoItem } from './TodoItem';
import * as TransitionGroup from 'react-addons-css-transition-group';
import './TodoList.css';

@inject(storeInjector) @observer
export class TodoList extends React.Component<StoreProps> {
    render() {
        const { store } = this.props;
        return (
            <List>
                <TransitionGroup
                    transitionName="grow"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {store!.visibleTodos.map(todo =>
                        <TodoItem key={todo.id} todo={todo} />)}
                </TransitionGroup>
            </List>
        );
    }
}

const List = styled.ul`
    width: 600px;
    list-style: none;
    padding: 0;
    margin: 0;
`;
