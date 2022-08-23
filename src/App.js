import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//IMPORT COMPONENTS
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Articles from "./components/Articles";
import UserList from "./components/UserList";
import SingleArticle from "./components/SingleArticle";
import { useState } from "react";
import { UserContext } from "./contexts/User";

function App() {
  const [user, setUser] = useState("jessjelly");
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Header />
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/articles/topic/:topic_slug" element={<Articles />} />
            <Route path="/article/:article_id" element={<SingleArticle />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
export default App;
