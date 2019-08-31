import React, { Fragment } from 'react'
import styled from 'styled-components'
import TodoItem from './TodoItem'

const TodoList = ({ items, toggleComplete, filter }) => {

  const filterList = (e) => {
    if (e.target.value)
      filter(e.target.value)
  }

  return (
    <Fragment>
      <MainCont onClick={(e) => filterList(e)}>
        <InnerCont><input type='radio' name='filter' value='All' />{`All`}</InnerCont>
        <InnerCont><input type='radio' name='filter' value='Completed' />{`Completed`}</InnerCont>
        <InnerCont><input type='radio' name='filter' value='Active' />{`Active`}</InnerCont>
      </MainCont>
      <Wrapper>
        {items.map(item => {
          const onComplete = e => {
            toggleComplete(item.id)
          }

          return <TodoItem key={item.id} {...item} onComplete={onComplete} />
        })}
      </Wrapper>
    </Fragment>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const InnerCont = styled.div`
  display: flex;
  align-items: center;
`
const MainCont = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

export default TodoList
