import React, { createContext, useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Notification } from "../components/Notification";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const base_url = "http://localhost:8000/api/v1";
    let navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(false);
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });

    const { name, email, password, passwordConfirmation } = input;

    // validasi email
    const pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    let errors = [];

    const handleChange = (event) => {
        let { name, value } = event.target;
        setInput({ ...input, [name]: value });
    };

    const handleRegister = useCallback(
        (event) => {
            event.preventDefault();
            setIsDisabled(true);

            toast.clearWaitingQueue();
            if (name === "") {
                errors.push("Nama harus diisi");
            }

            if (email === "") {
                errors.push("Email harus diisi");
            } else if (email !== "" && !pattern.test(email)) {
                errors.push("Masukkan email dengan benar");
            }

            if (password === "") {
                errors.push("Kata sandi harus diisi");
            } else if (password !== "") {
                if (password.length < 6) {
                    errors.push(
                        "Kata sandi tidak boleh kurang dari 6 karakter"
                    );
                } else if (passwordConfirmation === "") {
                    errors.push("Konfirmasi kata sandi harus diisi");
                } else if (password !== passwordConfirmation) {
                    errors.push("Kata sandi tidak sama");
                }
            }

            if (errors.length === 0) {
                axios
                    .post(`${base_url}/register`, {
                        name: name,
                        email: email,
                        password: password,
                        password_confirmation: passwordConfirmation,
                    })
                    .then((res) => {
                        let data = res.data;
                        Notification({
                            type: "success",
                            text: "Berhasil Registrasi",
                        });
                        Cookies.set("token", data.token);
                        Cookies.set("user", JSON.stringify(data.user));

                        setInput({
                            name: "",
                            email: "",
                            password: "",
                            passwordConfirmation: "",
                        });
                        navigate("/user");
                    })
                    .catch((err) => {
                        if (err.response.data.errors.email) {
                            Notification({
                                type: "error",
                                text: "Email sudah digunakan, coba email yang lain",
                            });
                        } else {
                            Notification({
                                type: "error",
                                text: "Ada kesalahan, silahkan coba lagi",
                            });
                        }
                    });
            }

            errors.map((error) => {
                return Notification({ type: "error", text: error });
            });

            errors = [];
            setTimeout(() => setIsDisabled(false), 3000);
        },
        [name, email, password, passwordConfirmation]
    );

    const handleLogin = useCallback((event) => {
        event.preventDefault();
        setIsDisabled(true);

        toast.clearWaitingQueue();

        if (email === "") {
            errors.push("Email harus diisi");
        } else if (email !== "" && !pattern.test(email)) {
            errors.push("Masukkan email dengan benar");
        }

        if (password === "") {
            errors.push("Kata sandi harus diisi");
        } else if (password !== "") {
            if (password.length < 6) {
                errors.push("Kata sandi tidak boleh kurang dari 6 karakter");
            }
        }

        if (errors.length === 0) {
            axios
                .post(`${base_url}/login`, {
                    email: email,
                    password: password,
                })
                .then((res) => {
                    let data = res.data;
                    Notification({
                        type: "success",
                        text: "Berhasil Login",
                    });
                    Cookies.set("token", data.token);
                    Cookies.set("user", JSON.stringify(data.user));

                    setInput({
                        email: "",
                        password: "",
                    });
                    navigate("/user");
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                    // Notification({
                    //     type: "error",
                    //     text: "Email sudah digunakan, coba email yang lain",
                    // });
                });
        }

        errors.map((error) => {
            return Notification({ type: "error", text: error });
        });

        errors = [];
        setTimeout(() => setIsDisabled(false), 3000);
    });

    const state = {
        isDisabled,
        input,
    };
    const handleFunction = {
        handleChange,
        handleRegister,
        handleLogin,
    };

    return (
        <AuthContext.Provider
            value={{
                state,
                handleFunction,
            }}
        >
            {props.children}
            <ToastContainer limit={3} />
        </AuthContext.Provider>
    );
};
