const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

// pure function. X async, X side effect
// useReducer와 다르게 reducer에 기본값으로 initialState을 준다
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
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
    case "account/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

// ACTION CREATOR(CONVENTIONAL)
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  // Thunk async function
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;
    // dispatch state to store
    // else문에 들어오는것은 dispatch( async function())이니까
    // 내부에도 dispatch가 있는것이 맞다
    dispatch({ type: "account/deposit", payload: converted });
    // 여기에서 isLoading을 false로 바꾸는 action을 dispatch해야한다고 생각할 수 있겠지만
    // 다른 액션에서 isLoading을 false로 바꿔주면 된다 (새로운 액션 만들필요 없다)

    // 컴포넌트는 미들웨어에서 async 작용이 있었는지를 전혀 알지 못한다.
    // data fetching을 컴포넌트에서 따로 빼서 다른 곳에 모아놓을 수 있다.
  };
}
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}
export function payLoan() {
  return { type: "account/payLoan" };
}
