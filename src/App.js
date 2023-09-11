import ContextProvider from "./contextStore/ContextProvider";
import Sum from "./components/Sum";

function App() {
  return (
    <ContextProvider>
      <Sum />
    </ContextProvider>
  );
}

export default App;
