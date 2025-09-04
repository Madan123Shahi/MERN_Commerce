import Registration from "./components/Registration";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <Header className="sticky top-0 z-50 " />
      <main className="flex-1 flex justify-center items-center p-4">
        <Routes>
          <Route path="/" element={<Registration />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
