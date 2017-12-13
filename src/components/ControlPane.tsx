import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { StoreProps, storeInjector, filters } from '../stores/store';
import styled, { css } from 'styled-components';

@inject(storeInjector) @observer
export class ControlPane extends React.Component<StoreProps> {
    render() {
        const store = this.props.store!;
        return (
            <div>
                <span>{store.leftItemsNum} items left</span>
                <span>
                    {filters.map(filter =>
                        <a
                            key={filter}
                            onClick={() => store.setFilter(filter)}
                        >{filter}
                        </a>)}
                </span>
                <ClearButton isHidden={!store.hasCompleted}>Clear completed</ClearButton>
            </div>
        );
    }
}

type ClearButtonProps = {
    isHidden: boolean
};

const ClearButton = styled.button`
    transition: all 0.3s;
    border-radius: 3px;
    &:hover{
        background: #f1f1f1;
    }

    ${(props: ClearButtonProps) => props.isHidden ? '' : css`
        visibility: hidden;
    `}
`;