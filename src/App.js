import React from 'react'
import { Provider, Subscribe } from 'unstated'
import styled from 'styled-components'
import TodosContainer from './store'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import TodoContainer from './components/TodoContainer'

function App() {
  return (
    <Provider>
      <Wrapper>
        <Subscribe to={[TodosContainer]}>
          {todos => {
            const list = todos.getList()
            const filterVal = todos.getFilterValue()
            const containers = todos.getContainers()
            const selectedContainer = todos.getSelectedContainer()
            return (
              <TodosWrapper>
                <AddTodo
                  selectedContainer={selectedContainer}
                  onAddTodo={todos.createTodo} />
                <TodoContainer
                  containers={containers}
                  selectedContainer={selectedContainer}
                  selectContainer={todos.setSelectedContainer} />
                {
                  selectedContainer ?
                    <TodoList items={list} toggleComplete={todos.toggleComplete} filter={todos.filter} filterVal={filterVal} />
                    : ''
                }
              </TodosWrapper>
            )
          }}
        </Subscribe>
      </Wrapper>
    </Provider>
  )
}

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`

const TodosWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`

export default App
