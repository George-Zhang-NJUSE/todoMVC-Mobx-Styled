import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { StoreProps, Todo, storeInjector } from '../stores/store';
import styled, { css } from 'styled-components';
import { Check } from './Check/Check';

type TodoItemProps = {
    todo: Todo
} & StoreProps;

type TodoItemState = {
    animationName: string
};

@inject(storeInjector) @observer
export class TodoItem extends React.Component<TodoItemProps, TodoItemState> {

    state: TodoItemState = {
        animationName: 'enter'
    };

    deleteSelf = () => {
        const { store, todo } = this.props;
        store!.deleteTodo(todo.id);
    }

    handleAnimationEnd = () => {
        const { animationName } = this.state;
        if (animationName === 'leave') {
            this.deleteSelf();
        }
    }

    handleDeleteClick = () => {
        this.setState({ animationName: 'leave' });
    }

    render() {
        const { store, todo } = this.props;
        return (
            <HoverItem onAnimationEnd={this.handleAnimationEnd} animation={this.state.animationName}>
                <Check checked={todo.isCompleted} onChange={() => store!.toggleTodo(todo.id)} />
                <CrossableSpan isCrossed={todo.isCompleted}>{todo.content}</CrossableSpan>
                <HoverButton onClick={this.handleDeleteClick}>×</HoverButton>
            </HoverItem>
        );
    }
}

type HoverItemProps = {
    animation: string
};

const HoverItem = styled.li`
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    animation: ${(props: HoverItemProps) => props.animation} 0.3s ease-out;

    > button {
        opacity: 0;
    }

    &:hover {
        > button {
           opacity: 1; 
        }
    }

    @keyframes enter {
        from {
            height: 0;
            opacity: 0;
        }
        to {
            height: 60px;
            opacity: 1;
        }
    }

    @keyframes leave {
        from {
            height: 60px;
            opacity: 1;
        }
        to {
            height: 0;
            opacity: 0;
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