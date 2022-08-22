import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//IMPORT COMPONENTS
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Articles from "./components/Articles";
import UserList from "./components/UserList";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/articles/coding" element={<Articles />} />
          <Route path="/articles/cooking" element={<Articles />} />
          <Route path="/articles/football" element={<Articles />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
