import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { StoreProps, Todo, storeInjector } from '../stores/store';
import styled, { css } from 'styled-components';

const checkLogo = require('./check.svg');

type TodoItemProps = {
    todo: Todo
} & StoreProps;

@inject(storeInjector) @observer
export class TodoItem extends React.Component<TodoItemProps> {
    render() {
        const { store, todo } = this.props;
        return (
            <HoverItem>
                <Check checked={todo.isCompleted} onChange={() => store!.toggleTodo(todo.id)} />
                <CrossableSpan isCrossed={todo.isCompleted}>{todo.content}</CrossableSpan>
                <HoverButton onClick={() => store!.deleteTodo(todo.id)}>×</HoverButton>
            </HoverItem>
        );
    }
}

const HoverItem = styled.li`
    width: 100%;
    height: 60px;

    /* &:hover {
        button {
            
        }
    } */
`;

const Check = styled.input.attrs({ type: 'checkbox' }) `
    width: 40px;
    height: 40px;
    &:checked > *::after {
        content: url(${checkLogo})
    }
`;

type CrossableSpanProps = {
    isCrossed: boolean
};

const CrossableSpan = styled.span`
    transition: all 0.3s;

    ${(props: CrossableSpanProps) => props.isCrossed ? css`
        text-decoration: line-through;
        color: #d9d9d9;
    ` : ''}
`;

const HoverButton = styled.button`
    width: 40px;
    height: 40px;
    color: #cc9a9a;
    font-size: 1.2rem;
    
    &:hover {
        color: #af5b5e;;
    }
`;