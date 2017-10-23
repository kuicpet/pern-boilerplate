export const BASE_URL = `${window.location.origin}/api`;

export * from './auth/signinAction';
export * from './auth/signupAction';
export * from './auth/clearFormError';
export * from './auth/verifyAuth';
export * from './auth/logoutAction';
export * from './auth/requestReset';
export * from './group/createNewGroup';
export * from './group/editGroupInfo';
export * from './group/deleteGroup';
export * from './group/leaveGroup';
export * from './group/getGroupsList';
export * from './group/getGroupUsers';
export * from './group/searchUsers';
export * from './group/inGroupPage';
export * from './message/getGroupMessages';
export * from './message/sendMessage';
export * from './message/markAsRead';
