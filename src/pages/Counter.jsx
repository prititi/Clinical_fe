// src/components/Counter.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../features/auth/counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Counter: {count}</h1>
      <div>
        <button onClick={() => dispatch(increment())} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
          Increment
        </button>
        <button onClick={() => dispatch(decrement())} className="px-4 py-2 bg-red-500 text-white rounded">
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;
