import { useRef } from 'react';
import useStateHistory from './useStateHistory';

const CHAR_LIMIT: number=10;

const App = () => {
  const {
    value,
    updateHistory,
    resetValue,
    cursor,
    historyStackSize,
    undo,
    redo, 
  } = useStateHistory('',CHAR_LIMIT);

  const inputRef = useRef(null as any);
  inputRef.current?.focus();

  return (
    <form onSubmit={(e)=>e.preventDefault()}>
      <div>
      <input
        autoFocus={true}
        ref={inputRef}
        onChange={(event) => updateHistory(event.target.value)}
        value={value}
      />
      </div>
      <div>
        <button
          onClick={() => undo()}
          disabled={cursor <= 0}
        >
          Undo
        </button>
        <button
          onClick={() => redo()}
          disabled={cursor >= historyStackSize}
        >
          Redo
        </button>
        <button onClick={() => resetValue('')}>Reset</button>
      </div>
    </form>
  );
}
export default App;
