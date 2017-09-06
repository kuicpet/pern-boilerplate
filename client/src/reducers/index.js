import { combineReducers } from 'redux';
import user from './setUserReducer';
import verifyAuthLoading from './verifyAuthLoading';
import isAuthenticated from './authReducer';
import verifyAuthFailed from './verifyAuthFailed';
import token from './setTokenReducer';
import setUserLoading from './setUserLoading';
import authFormErrorMessage from './authFormErrorMessage';
import authFormFailed from './authFormFailed';
import groupList from './groupListReducer';
import groupListLoading from './groupListLoading';
import createdGroup from './createdGroup';
import selectedGroup from './selectedGroupReducer';
import groupMessages from './groupMessagesReducer';
import groupMessagesLoading from './groupMessagesLoading';
import groupMessagesFailed from './groupMessagesFailed';
import groupUsers from './groupUsers';
import inGroupPage from './inGroupPageReducer';
import userSearchTerm from './searchTerm';
import userSearchResults from './searchResults';

export default combineReducers({
  user,
  verifyAuthLoading,
  isAuthenticated,
  verifyAuthFailed,
  token,
  setUserLoading,
  authFormFailed,
  authFormErrorMessage,
  groupList,
  groupListLoading,
  createdGroup,
  selectedGroup,
  groupMessages,
  groupMessagesLoading,
  groupMessagesFailed,
  groupUsers,
  inGroupPage,
  userSearchTerm,
  userSearchResults
})