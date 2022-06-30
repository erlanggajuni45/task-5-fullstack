import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

function Login() {
    const { state, handleFunction } = useContext(AuthContext);
    const { input, isDisabled } = state;
    const { handleChange, handleLogin } = handleFunction;
    const { email, password } = input;
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-8">
                    <div className="card border-secondary">
                        <h5 className="card-header bg-secondary text-white text-center">
                            Login Akun
                        </h5>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label className="my-2" for="email">
                                        Alamat Email
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={handleChange}
                                        id="email"
                                        name="email"
                                        value={email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="my-2" for="password">
                                        Kata Sandi
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        onChange={handleChange}
                                        id="password"
                                        name="password"
                                        value={password}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary mt-3"
                                    disabled={isDisabled}
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
