import React, { Fragment } from 'react'
import styled from 'styled-components'

const TodoContainer = ({ containers, selectedContainer, selectContainer }) => {
  return (
    <Fragment>
      <MainCont>
        {containers && containers.map(item =>
          <InnerCont
            style={selectedContainer === item.id ?
              { backgroundColor: 'white', color: '#282c34' } :
              { backgroundColor: '#282c34', color: 'white' }
            }
            onClick={_ => selectContainer(item.id)}
            key={item.id}>
            {item.text}
          </InnerCont>
        )
        }
      </MainCont>
    </Fragment>
  )
}

const MainCont = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const InnerCont = styled.div`
  border: 2px solid;
  padding: 5px;
  margin: 5px;
  cursor: pointer;
`

export default TodoContainer
