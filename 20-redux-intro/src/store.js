// redux toolkit이 아닌 old version의 redux라 deprecated 표시
import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const rootReducer = combineReducers({
  // 두 reducer가 담당하는 state가 value값으로 들어가는 새로운 state를 만듦
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);
export default store;
