import { createStore,combineReducers } from 'redux';
import {loginReducer,drawerMenuReducer, profileMenuReducer, TabMenuReducer,gymClassesReducer,userIdReducer,postsReducer} from'./reducers/allReducers';


const reducers = combineReducers({
    login: loginReducer,
    drawerMenu: drawerMenuReducer,
    profileMenu: profileMenuReducer,
    tabMenu: TabMenuReducer,
    gymClasses: gymClassesReducer,
    userId: userIdReducer,
    posts: postsReducer
})

const store = createStore(reducers)
export default store;
