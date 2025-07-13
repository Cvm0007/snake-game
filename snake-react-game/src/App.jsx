import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GameBoard from "./components/GameBoard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import bgImage from './assets/bg.jpg';

function App() {
  return (
    <Router>
      <div
        className="flex flex-col min-h-screen text-white bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundAttachment: "fixed",
        }}
      >
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex flex-col md:flex-row justify-center items-start p-4 md:gap-10">
                  <GameBoard />
                </div>
              }
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
