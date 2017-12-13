import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { StoreProps, storeInjector } from '../stores/store';
import { ChangeEvent, FormEvent } from 'react';
import styled, { css } from 'styled-components';

type State = {
    content: string
};

@inject(storeInjector) @observer
export class AddTodo extends React.Component<StoreProps, State> {

    state: State = {
        content: '',
    };

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.store!.addTodo(this.state.content);
        this.setState({ content: '' });
    }

    handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ content: event.target.value });
    }

    handleCheckChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.store!.toggleAll();
    }

    render() {
        const { content } = this.state;
        const store = this.props.store!;
        const hideCheckBox = store.todos.length === 0;
        const checked = store.leftItemsNum === 0;
        return (
            <Form onSubmit={this.handleSubmit}>
                <ToggleAll
                    onChange={this.handleCheckChange}
                    checked={checked}
                    isHidden={hideCheckBox}
                />
                <TextInput
                    onChange={this.handleTextChange}
                    placeholder="What needs to be done?"
                    value={content}
                />
            </Form>
        );
    }
}

const Form = styled.form`
    
`;

const TextInput = styled.input.attrs({ type: 'text' }) `
    width: 100%;
    height: 60px;
`;

type ToggleAllProps = {
    isHidden: boolean
};

const ToggleAll = styled.input.attrs({ type: 'checkbox' }) `
    width: 40px;
    height: 40px;
    border: hidden;
    &:hover{
        background: #f1f1f1; 
    }

    ${(props: ToggleAllProps) => props.isHidden ? '' : css`
        visibility: hidden;
    `}
`;