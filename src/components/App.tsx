import * as React from 'react';
import { AddTodo } from './AddTodo';
import { TodoList } from './TodoList';
import { ControlPane } from './ControlPane';
import styled from 'styled-components';
// import DevTools from 'mobx-react-devtools';

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
                {/* <DevTools /> */}
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
    border-radius: 4px;
    box-shadow: 2px 2px 20px 5px #d1d1d1;
`;

const Title = styled.header`
    font-size: 5rem;
    color: #cc9a9a;
`;

export default App;
