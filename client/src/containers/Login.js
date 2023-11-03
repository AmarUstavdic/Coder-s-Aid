import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [resText, setResText] = useState("");
    const [loginMethod, setLoginMethod] = useState("local");

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        codeforcesUsername: "",
        codeforcesPassword: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        console.log("clicked button");
        console.log(formData);

        if (loginMethod === "local") {
            // Perform login with local credentials
            axios
                .post("http://192.168.0.11:5000/login", formData)
                .then((response) => {
                    setResText(response.data);
                    console.log(response);
                })
                .catch((error) => {
                    setResText("Wrong credentials");
                    console.error(error);
                });
        } else if (loginMethod === "codeforces") {
            // Perform login with Codeforces credentials
            // You would need to implement the Codeforces login logic here
            // Example: axios.post("http://codeforces-login-endpoint", formData)
        }
    };

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header">Login</div>
                            <div className="card-body">
                                <form onSubmit={handleLogin}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">
                                            {resText}
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            placeholder="Enter your username"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="loginMethod" className="form-label">
                                            Choose Login Method:
                                        </label>
                                        <select
                                            className="form-select"
                                            id="loginMethod"
                                            name="loginMethod"
                                            value={loginMethod}
                                            onChange={handleInputChange}
                                        >
                                            <option value="local">Local</option>
                                            <option value="codeforces">Codeforces</option>
                                        </select>
                                    </div>
                                    {loginMethod === "codeforces" && (
                                        <>
                                            <div className="mb-3">
                                                <label htmlFor="codeforcesUsername" className="form-label">
                                                    Codeforces Username
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="codeforcesUsername"
                                                    name="codeforcesUsername"
                                                    value={formData.codeforcesUsername}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your Codeforces username"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="codeforcesPassword" className="form-label">
                                                    Codeforces Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="codeforcesPassword"
                                                    name="codeforcesPassword"
                                                    value={formData.codeforcesPassword}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your Codeforces password"
                                                />
                                            </div>
                                        </>
                                    )}
                                    <button type="submit" className="btn btn-primary">
                                        Login
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
