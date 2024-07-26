// redux toolkit이 아닌 old version의 redux라 deprecated 표시
import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// pure function. X async, X side effect
// useReducer와 다르게 reducer에 기본값으로 initialState을 준다
function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateCustomer":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  // 두 reducer가 담당하는 state가 value값으로 들어가는 새로운 state를 만듦
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

store.dispatch({ type: "account/deposit", payload: 500 });
console.log(store.getState());
store.dispatch({ type: "account/withdraw", payload: 200 });
console.log(store.getState());

store.dispatch({
  type: "account/requestLoan",
  payload: {
    amount: 1000,
    purpose: "Buy a car",
  },
});

console.log(store.getState());
store.dispatch({
  type: "account/payLoan",
});

// ACTION CREATOR(CONVENTIONAL)
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}
function payLoan() {
  return { type: "account/payLoan" };
}

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    // new Date는 pure한 인풋이 아니기 때문에 reducer에 들어가지 않고, action에 들어갑니다.
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateCustomer(fullName) {
  return {
    type: "customer/updateCustomer",
    payload: fullName,
  };
}

store.dispatch(createCustomer("Wontae Choi", "24242424"));
store.dispatch(updateCustomer("Wontae Park"));
