import * as React from 'react';
import { AddTodo } from './AddTodo';
import { TodoList } from './TodoList';
import { ControlPane } from './ControlPane';
import styled from 'styled-components';

class App extends React.Component {
    render() {
        return (
            <RootContainer>
                <Title>todos</Title>
                <AppContainer>
                    <AddTodo />
                    <TodoList />
                    <ControlPane />
                </AppContainer>
            </RootContainer>
        );
    }
}

const RootContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
`;

const AppContainer = styled.div`
    background: white;
    width: 600px;
`;

const Title = styled.header`
    font-size: 5rem;
    color: #cc9a9a;
`;

export default App;
