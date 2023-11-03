import React, { useState } from "react";
import axios from "axios";


const AuthForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [resText, setResText] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = isLogin ? "http://192.168.0.11:5000/login" : "http://192.168.0.11:5000/register";

        axios
            .post(url, formData)
            .then((response) => {
                setResText(response.data);
            })
            .catch((error) => {
                setResText(isLogin ? "Wrong credentials" : "Registration failed");
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            {isLogin ? "Login" : "Register"}
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {!isLogin && (
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Username
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
                                    <p className="text-danger">{resText}</p>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    {isLogin ? "Login" : "Register"}
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <button
                            className="btn btn-link"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? "Don't have an account? Register here" : "Already have an account? Login here"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
