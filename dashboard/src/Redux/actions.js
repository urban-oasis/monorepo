/*
 * action types
 */

export const ADD_USER = 'ADD_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */

export function addUser(user) {
  return { type: ADD_USER, user }
}

export function removeUser(user) {
    return { type: REMOVE_USER, user }
  }
  

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}