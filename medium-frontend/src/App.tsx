import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blogs from "./pages/Blogs";
import Blog from "./components/Blog";
import Login from "./components/Login";
import { useState } from "react";
import LoginContext from "./components/LoginContext";
import PublishBlog from "./components/PublishBlog";

function App() {
  const [text, setText] = useState<string>("signup");
  return (
    <>
      <LoginContext.Provider value={{text,setText}}>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/blog" element={<Blogs />} />
            <Route path="/blog/:id" element={<Blog/>} />
            {/* <Route path="/*"    element={<Error/>} /> */}
            <Route path="/login" element={<Login type={text} />} />
            <Route path="/publish" element={<PublishBlog />} />
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    </>
  );
}

export default App;
