import "./index.css";

function App() {
  const message = import.meta.env.VITE_TEST;
  console.log(message);
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}

export default App;
