import React from "react";
import ReactDOM from "react-dom";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Example from "./components/Example";
import Header from "./components/Header";
import User from "./components/User";
import { AuthProvider } from "./Context/AuthContext";
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
            <Routes>
                <Route path="/" element={<Example />} />
                <Route path="/user" element={<User />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RootApp;

// DOM element
if (document.getElementById("app")) {
    ReactDOM.render(<RootApp />, document.getElementById("app"));
}
