import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth-token and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged in Successfully !", "success")
            history.push("/")
        }
        else {
            props.showAlert("Invalid details!", "danger")
        }
    }

    return (
        <div className="container mt-3">
            <h1 className="mb-3 text-center">LOGIN</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
            <div className="mt-3 ">Don't have an account?
                <Link className="mx-2" to="/signup">Create an Account</Link>
            </div>
        </div>
    )
}

export default Login
