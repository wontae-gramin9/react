import React from "react";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";

export default function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(deleteItem(pizzaId))}>Delete</button>;
}
