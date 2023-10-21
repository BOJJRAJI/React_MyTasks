import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    task: '',
    activeTagId: '',
    selectId: tagsList[0].optionId,
    tasksList: [],
  }

  addToTasks = e => {
    e.preventDefault()
    const {task, selectId} = this.state
    const tagDetails = tagsList.filter(item => item.optionId === selectId)
    console.log(tagDetails)
    const details = {
      id: v4(),
      name: task,
      type: selectId,
      text: tagDetails[0].displayText,
    }
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, details],
      selectId: tagsList[0].optionId,
      task: '',
    }))
  }

  render() {
    const {task, activeTagId, tasksList, selectId} = this.state
    let filterList = []

    if (activeTagId === '') {
      filterList = tasksList
    } else {
      filterList = tasksList.filter(item => item.type === activeTagId)
    }

    return (
      <div className="bg-container">
        <form className="task-container" onSubmit={this.addToTasks}>
          <h1 className="task-heading">Create a task!</h1>
          <div className="label-input-container">
            <label htmlFor="input" className="label">
              Task
            </label>
            <br />
            <input
              className="input"
              id="input"
              type="text"
              placeholder="Enter the task here"
              value={task}
              onChange={e => this.setState({task: e.target.value})}
            />
          </div>
          <div className="label-input-container">
            <label htmlFor="select" className="label">
              Tags
            </label>
            <br />
            <select
              className="select"
              value={selectId}
              onChange={e => this.setState({selectId: e.target.value})}
              id="select"
            >
              {tagsList.map(item => (
                <option value={item.optionId} key={item.optionId}>
                  {item.displayText}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="add-button">
            Add Task
          </button>
        </form>
        <div className="tags-tasks-container">
          <h1 className="heading">Tags</h1>

          <ul className="tags-container">
            {tagsList.map(item => {
              const className =
                activeTagId === item.optionId ? 'active-tab' : 'normal-tab'
              return (
                <li className="tab-list" key={item.optionId}>
                  {activeTagId === item.optionId ? (
                    <button
                      className={className}
                      type="button"
                      onClick={() => this.setState({activeTagId: ''})}
                    >
                      {item.displayText}
                    </button>
                  ) : (
                    <button
                      className={className}
                      type="button"
                      onClick={() =>
                        this.setState({activeTagId: item.optionId})
                      }
                    >
                      {item.displayText}
                    </button>
                  )}
                </li>
              )
            })}
          </ul>

          <h1 className="heading">Tasks</h1>
          {tasksList.length === 0 ? (
            <div className="no-task-container">
              <p className="no-task-heading">No Tasks Added Yet</p>
            </div>
          ) : (
            <ul className="tasks-display-container">
              {filterList.map(item => (
                <li className="task-list" key={item.id}>
                  <p className="task-name">{item.name}</p>
                  <p className="task-type">{item.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
