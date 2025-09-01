import React from "react";
import Registration from "./components/Registration";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <Header />
      <Registration />
    </div>
  );
};

export default App;
