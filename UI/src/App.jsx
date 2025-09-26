import Header from "./components/Header";
// import Header from './components/HeaderAmazon'
import { Routes, Route } from "react-router-dom";
import Registration from "./components/Registration";
import Home from "./pages/Home";
const App = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <Header className="sticky top-0 z-50 " />
      <main className="flex-1 flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
