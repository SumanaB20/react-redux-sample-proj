export function addUser(item) {
  return { type: 'ADD_USER_SUCCESS', payload: item };
}

export function addUserProgress() {
  return { type: 'ADD_USER_PROGRESS' };
}

export function editUser(id) {
  return { type: 'EDIT_USER_SUCCESS', payload: id };
}

export function editUserProgress() {
  return { type: 'EDIT_USER_PROGRESS' };
}

export function filterUser(id) {
  return { type: 'FILTER_USER_SUCCESS', payload: id };
}

export function filterUserProgress() {
  return { type: 'FILTER_USER_PROGRESS' };
}

export function deleteUser(id) {
  return { type: 'DELETE_USER_SUCCESS', payload: id };
}

export function deleteUserProgress() {
  return { type: 'DELETE_USER_PROGRESS' };
}
