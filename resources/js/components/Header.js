import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Header() {
    const [navigation, setNavigation] = useState([]);
    let token = Cookies.get("token");

    useEffect(() => {
        if (!token) {
            setNavigation([
                { title: "Register", path: "/register" },
                { title: "Login", path: "/login" },
            ]);
        } else {
            setNavigation([
                { title: "Beranda", path: "/home" },
                { title: "Post Baru", path: "/new-post" },
                { title: "Post Saya", path: "/my-post" },
                { title: "Kategori", path: "/category" },
            ]);
        }
    }, [token]);

    return (
        <nav className="navbar navbar-expand-lg bg-secondary fixed mb-4">
            <div className="container-fluid">
                <Link className="navbar-brand text-black" to="/">
                    Post | VIX
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarNav"
                >
                    <ul className="navbar-nav">
                        {navigation.map((item, idx) => {
                            return (
                                <li className="nav-item" key={idx}>
                                    <Link
                                        className="nav-link text-white"
                                        to={item.path}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
