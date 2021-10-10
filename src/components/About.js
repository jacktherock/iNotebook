import React from 'react'
// import React, { useEffect } from 'react'
// import noteContext from '../context/notes/noteContext'

const About = () => {

    return (
        <div className="container mt-3">
            <h1 className="text-center mb-3"> ABOUT US </h1>
            <div className="card"  >
                <div className="card-body" >
                    <h5 className="card-title" >Abhijeet Sonawane</h5>
                    <p className="card-text" > <li>Computer Science Student</li></p>
                    <p className="card-text" ><li>Text Utilzation app using React JavaScript.</li></p>
                    <a href="https://github.com/jacktherock" className="btn btn-dark" >GitHub</a>
                </div>
            </div>
        </div>
    )
}

export default About
