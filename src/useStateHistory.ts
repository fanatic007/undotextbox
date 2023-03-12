import { useState } from "react";
export default function useStateHistory(initialValue:string='', stackSize?:number) {
  const [stack, setStack] = useState([initialValue]);
  const [cursor, setCursor] = useState(0);
  const value = stack[cursor];
  
  const updateHistory = (newValue:string) => {
    if (!Object.is(value, newValue)) {
      const copy = [...stack.slice(0, cursor + 1), newValue].slice((stackSize? -(stackSize+1):undefined));
      setStack(copy);
      setCursor(copy.length - 1);  
    }
  };

  const undo = () => {
    setCursor(Math.max(0, cursor - 1));
  };
  
  const redo = () => {
    setCursor(Math.min(stack.length - 1, cursor+1));
  };

  const resetValue = (init:string) => {
    setCursor(0);
    setStack([init]);
  };

  return {
    value,
    cursor,
    historyStackSize: stack.length - 1,
    undo,
    redo,
    updateHistory,
    resetValue,
  };
}