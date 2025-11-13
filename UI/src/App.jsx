import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" />
      </Routes>
    </>
  );
};

export default App;
