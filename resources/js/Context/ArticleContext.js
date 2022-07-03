import React, { createContext, useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Notification } from "../components/Notification";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";

export const ArticleContext = createContext();

export const ArticleProvider = (props) => {
    const base_url = "http://localhost:8000/api/v1";
    const navigate = useNavigate();
    const [dataArticle, setDataArticle] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [dataPage, setDataPage] = useState([]);
    const [fetchStatus, setFetchStatus] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [input, setInput] = useState({
        title: "",
        content: "",
        image: "",
        category: 1,
    });

    const { title, content, image, category } = input;

    let errors = [];

    let dataUser;
    let tokenUser;
    if (Cookies.get("token")) {
        dataUser = JSON.parse(Cookies.get("user"));
        tokenUser = Cookies.get("token");
    } else {
        <Navigate to="/login" replace />;
    }

    useEffect(() => {
        let fetchData = async () => {
            let { data } = await axios.get(`${base_url}/articles`, {
                headers: { Authorization: "Bearer " + tokenUser },
            });
            let result = data.data;
            setDataArticle([...result]);
        };

        let fetchCategory = async () => {
            let { data } = await axios.get(`${base_url}/category`, {
                headers: { Authorization: "Bearer " + tokenUser },
            });
            let result = data;
            setDataCategory([...result]);
        };

        if (fetchStatus) {
            fetchData();
            fetchCategory();
            setFetchStatus(false);
        }
    }, [fetchStatus, setFetchStatus]);

    const handleChange = (event) => {
        let { name, value } = event.target;
        setInput({ ...input, [name]: value });
    };

    const handleDelete = (event) => {
        let idJob = parseInt(event.target.value);
    };

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
            setIsDisabled(true);

            toast.clearWaitingQueue();
            if (title === "") {
                errors.push("Judul harus diisi");
            }

            if (content === "") {
                errors.push("Email harus diisi");
            }

            if (image === "") {
                errors.push("Link gambar harus diisi");
            }

            if (errors.length === 0) {
                axios
                    .post(
                        `${base_url}/articles`,
                        {
                            title: title,
                            content: content,
                            image: image,
                            user_id: parseInt(dataUser.id),
                            category_id: parseInt(category),
                        },
                        { headers: { Authorization: "Bearer " + tokenUser } }
                    )
                    .then((res) => {
                        setDataArticle([...dataArticle, res]);
                        Notification({
                            type: "success",
                            text: "Post berhasil dibuat",
                        });
                        setFetchStatus(true);
                        setInput({
                            title: "",
                            content: "",
                            image: "",
                            category: 1,
                        });
                        navigate("/home");
                    })
                    .catch((err) => {
                        console.log(err.response);
                        Notification({
                            type: "error",
                            text: "Gagal, coba lagi",
                        });
                    });
            }

            errors.map((error) => {
                return Notification({ type: "error", text: error });
            });

            errors = [];
            setTimeout(() => setIsDisabled(false), 3000);
        },
        [title, content, image, category]
    );

    const state = {
        dataArticle,
        setDataArticle,
        dataCategory,
        isDisabled,
        input,
        setInput,
    };
    const handleFunction = {
        handleChange,
        handleSubmit,
    };

    return (
        <ArticleContext.Provider
            value={{
                state,
                handleFunction,
            }}
        >
            {props.children}
            <ToastContainer limit={3} />
        </ArticleContext.Provider>
    );
};
