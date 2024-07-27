import { createSlice } from "@reduxjs/toolkit";
// action creator, easy writiable reducers, can mutate state(←immer)
// 새로운 state를 return하는게 아니라 modify만 하면 되어서 좋다
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    // arg가 하나 이상
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.balance += action.payload;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    // state mutate는 sync이므로, 코드 순서가 중요하다
    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

// async action creator는 함수명과 action이 정확히 똑같다면
// thunk를 따로 설치하지 않고 (RTK에 이미 있다) 바로 사용 가능하다
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

console.log(requestLoan(1000, "Buy a car"));
// 자동생성된 action creator들은 default적으로 args를 딱 하나만 받을 수 있다.
// 즉 1000만 들어가고 "Buy a car"은 들어가지 않는다
// 그렇다면 어떻게 해야 할까?
// data가 store내부 reducer에 도달하기 전에 prepare()를 해줘야 함

export default accountSlice.reducer;
