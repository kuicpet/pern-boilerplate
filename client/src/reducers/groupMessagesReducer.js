import { GET_GROUP_MESSAGES_LOADING, GET_GROUP_MESSAGES_SUCCESS, GET_GROUP_MESSAGES_FAILURE, LOGOUT_USER } from '../actions'

export default function(state = [], action) {
  switch (action.type) {
    case GET_GROUP_MESSAGES_SUCCESS:
      return action.response.data.messages
    case GET_GROUP_MESSAGES_FAILURE:
      return []
    case LOGOUT_USER:
      return []
  }
  return state;
}
