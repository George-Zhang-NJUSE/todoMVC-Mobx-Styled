import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { StoreProps, storeInjector } from '../stores/store';
import { ChangeEvent, FormEvent } from 'react';
import styled, { css } from 'styled-components';
import { Check } from './Check/Check';

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
        const content = this.state.content.trim();
        if (content) {
            this.props.store!.addTodo(this.state.content);
            this.setState({ content: '' }); 
        }
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
    display: flex;
    flex-flow: row nowrap;
    height: 60px;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;
`;

const TextInput = styled.input.attrs({ type: 'text' }) `
    width: 100%;
    height: 100%;
    font-size: 1.5rem;
    background: transparent;
    border: none;

    &::-webkit-input-placeholder {
        color: #d1d1d1;
    }
`;

type ToggleAllProps = {
    isHidden: boolean
};

const ToggleAll = Check.extend`
    ${(props: ToggleAllProps) => props.isHidden ? css`
        visibility: hidden;
    ` : ''}
`;