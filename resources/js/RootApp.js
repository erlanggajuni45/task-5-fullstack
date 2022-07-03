import React from "react";
import ReactDOM from "react-dom";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Example from "./components/Example";
import Header from "./components/Header";
import { ArticleProvider } from "./Context/ArticleContext";
import { AuthProvider } from "./Context/AuthContext";
import FormArticle from "./Page/FormArticle";
import Home from "./Page/Home";
import Login from "./Page/Login";
import Register from "./Page/Register";

function RootApp() {
    return (
        <BrowserRouter>
            <Header />
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </AuthProvider>

            <ArticleProvider>
                <Routes>
                    <Route path="/" element={<Example />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/new-post" element={<FormArticle />} />
                </Routes>
            </ArticleProvider>
        </BrowserRouter>
    );
}

export default RootApp;

// DOM element
if (document.getElementById("app")) {
    ReactDOM.render(<RootApp />, document.getElementById("app"));
}
