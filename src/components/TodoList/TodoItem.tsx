import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { StoreProps, Todo, storeInjector } from '../../stores/store';
import styled, { css } from 'styled-components';
import { Check } from '../Check/Check';

type TodoItemProps = {
    todo: Todo
} & StoreProps;

@inject(storeInjector) @observer
export class TodoItem extends React.Component<TodoItemProps> {

    deleteSelf = () => {
        const { store, todo } = this.props;
        store!.deleteTodo(todo.id);
    }

    render() {
        const { store, todo } = this.props;
        return (
            <HoverItem>
                <Check checked={todo.isCompleted} onChange={() => store!.toggleTodo(todo.id)} />
                <CrossableSpan isCrossed={todo.isCompleted}>{todo.content}</CrossableSpan>
                <HoverButton onClick={this.deleteSelf}>×</HoverButton>
            </HoverItem>
        );
    }
}

const HoverItem = styled.li`
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    > button {
        opacity: 0;
    }

    &:hover {
        > button {
           opacity: 1; 
        }
    }

`;

type CrossableSpanProps = {
    isCrossed: boolean
};

const CrossableSpan = styled.span`
    transition: all 0.3s;
    font-size: 1.2rem;

    ${(props: CrossableSpanProps) => props.isCrossed ? css`
        text-decoration: line-through;
        color: #d9d9d9;
    ` : ''}
`;

const HoverButton = styled.button`
    width: 40px;
    height: 40px;
    color: #cc9a9a;
    font-size: 2rem;
    margin-left: auto;
    background: transparent;
    border: none;
    transition: all 0.3s;

    &:hover {
        color: #af5b5e;;
    }
`;