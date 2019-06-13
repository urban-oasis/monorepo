import { combineReducers } from 'redux'
import {
  ADD_USER,
  REMOVE_USER,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}
const initialState={
  users: [{name: "kalle"}, {name: "idriss"}, {name: "jfro to the flow"}]
}

function users(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      return Object.assign({}, state, {
        users: state.users.concat(action.payload)
      });
    case REMOVE_USER:
      return Object.assign({}, state, {
        users: state.users.filter((user) => !user.name == action.user.name)});
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  users
})

export default todoApp