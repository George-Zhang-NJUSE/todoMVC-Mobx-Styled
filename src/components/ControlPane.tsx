import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { StoreProps, storeInjector, filters } from '../stores/store';
import styled, { css } from 'styled-components';

@inject(storeInjector) @observer
export class ControlPane extends React.Component<StoreProps> {
    render() {
        const store = this.props.store!;
        return (
            <FooterPane isHidden={store.todos.length === 0}>
                <span>{store.leftItemsNum} items left</span>
                <FilterList>
                    {filters.map(filter =>
                        <FilterItem
                            key={filter}
                            onClick={() => store.setFilter(filter)}
                            selected={store.filter === filter}
                        >{filter}
                        </FilterItem>)}
                </FilterList>
                <ClearButton
                    isHidden={!store.hasCompleted}
                    onClick={() => store.clearCompleted()}
                >Clear completed
                </ClearButton>
            </FooterPane>
        );
    }
}

type FooterPaneProps = {
    isHidden: boolean
};

const FooterPane = styled.div`
    height: 40px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 0 20px 0 20px;
    color: #a1a1a1;
    font-size: 0.8rem;

    ${(props: FooterPaneProps) => props.isHidden ? css`
        display: none;
    ` : ''}
`;

const FilterList = styled.ul`
    margin: auto;
    width: 200px;
    display: flex;
    justify-content: space-between;
    list-style: none;
`;

type FilterItemProps = {
    selected: boolean
};

const FilterItem = styled.li`
    transition: all 0.3s;
    border-radius: 3px;
    padding: 4px 8px 4px 8px;

    &:hover{
        cursor: pointer;
    }

    ${(props: FilterItemProps) => props.selected ? css`
        background: #f1f1f1;
    ` : ''}
`;

type ClearButtonProps = {
    isHidden: boolean
};

const ClearButton = styled.button`
    transition: all 0.3s;
    border-radius: 3px;
    border: 1px solid #5aadf1;
    background: transparent;
    padding: 4px 8px 4px 8px;
    color: #5aadf1;

    &:hover{
        background: #5aadf11c;
    }

    ${(props: ClearButtonProps) => props.isHidden ? css`
        visibility: hidden;
    ` : ''}
`;