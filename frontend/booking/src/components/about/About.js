import React from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Button from "@mui/material/Button";

const CountContext = React.createContext(null);

function useCount() {
  const context = React.useContext(CountContext);
  return context;
}

function CountProvider(props) {
  const [count, setCount] = React.useState(0);

  return <CountContext.Provider value={[count, setCount]} {...props} />;
}

function Counter() {
  const [count, setCount] = useCount();
  const increment = () => setCount((c) => c + 1);

  return <Button onClick={increment}>Increment {count}</Button>;
}

function CountDisplay() {
  const [count] = useCount();
  return <div>The current counter count is {count}</div>;
}

 const ContextExample = () => {
  const displayToast = () => {
    toast.success(<CountDisplay />)
  };

  return (
    <CountProvider>
      <div>
        <Counter />
        <Button onClick={displayToast}>Display toast</Button>
      </div>
      <ToastContainer autoClose={false} draggable={false} />
    </CountProvider>
  );
};

export default ContextExample