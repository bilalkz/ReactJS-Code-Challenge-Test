import { Container } from 'unstated'

const defaultState = {
  filter: 'All',
  selectedContainer: null,
  containers: [
    {
      id: 1,
      text: 'Provided'
    },
    {
      id: 2,
      text: 'Newly Added 1'
    },
    {
      id: 3,
      text: 'Newly Added 2'
    },
    {
      id: 4,
      text: 'Newly Added 3'
    },
    {
      id: 5,
      text: 'Newly Added 4'
    }
  ],
  list: [
    {
      id: 1,
      completed: false,
      text: 'Read README',
      containerId: 1
    },
    {
      id: 2,
      completed: false,
      text: 'Add one todo',
      containerId: 1
    },
    {
      id: 3,
      completed: false,
      text: 'Add filters',
      containerId: 1
    },
    {
      id: 4,
      completed: false,
      text: 'Add multiple lists',
      containerId: 1
    },
    {
      id: 5,
      completed: false,
      text: 'Optional: add tests',
      containerId: 1
    },
    {
      id: 5,
      completed: false,
      text: 'sample',
      containerId: 2
    }
  ]
}

class TodosContainer extends Container {
  constructor(props) {
    super(props)

    this.state = this.readStorage()
  }

  readStorage() {
    if (window && window.localStorage) {
      const state = window.localStorage.getItem('appState')
      if (state) {
        return JSON.parse(state)
      }
    }

    return defaultState
  }

  syncStorage() {
    if (window && window.localStorage) {
      const state = JSON.stringify(this.state)
      window.localStorage.setItem('appState', state)
    }
  }

  getList() {
    const {list, selectedContainer, filter} = this.state;
    const selectedList = list.filter(item => item.containerId === selectedContainer)
    switch (filter) {
      case 'Completed':
        return selectedList.filter(item => item.completed === true)
      case 'Active':
        return selectedList.filter(item => item.completed === false)
      default:
        return selectedList
    }
  }

  getContainers() {
    return this.state.containers
  }

  getSelectedContainer() {
    return this.state.selectedContainer
  }

  getFilterValue() {
    return this.state.filter
  }

  setSelectedContainer = async id => {
    await this.setState(_ => {
      return { selectedContainer: id }
    })

    this.syncStorage()
  }

  toggleComplete = async id => {
    const {list} = this.state;
    const item = list.find(i => i.id === id)
    const completed = !item.completed

    // We're using await on setState here because this comes from unstated package, not React
    // See: https://github.com/jamiebuilds/unstated#introducing-unstated
    await this.setState(state => {
      const list = state.list.map(item => {
        if (item.id !== id) return item
        return {
          ...item,
          completed
        }
      })
      return { list }
    })

    this.syncStorage()
  }

  createTodo = async text => {
    await this.setState(state => {
      let {selectedContainer} = this.state;
      if (selectedContainer) {
        const item = {
          completed: false,
          text,
          id: this.state.list.length + 1,
          containerId: selectedContainer
        }
        const list = state.list.concat(item)
        return { list }
      } else {
        const item = {
          text,
          id: this.state.containers.length + 1,
        }
        const containers = state.containers.concat(item)
        return { containers }
      }
    })
    this.syncStorage()
  }

  filter = async val => {
    await this.setState(_ => {
      return { filter: val }
    })
    this.syncStorage()
  }
}

export default TodosContainer
