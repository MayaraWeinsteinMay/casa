import {createStore} from 'redux';
import { tokenReducer } from './tokens/tokenReducers';

const store = createStore(tokenReducer);

export default store;