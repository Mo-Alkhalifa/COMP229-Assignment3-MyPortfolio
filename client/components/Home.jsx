import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="home">
            
            <h1>Welcome to My Portfolio</h1>
            <h2>Mohammad Alkhalifa</h2>
            <p>
                My goal is to build useful software and AI solutions while continuing to grow my skills as a software developer. 
            </p>

            <Link to="/about">About Me</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/education">Education</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact Me</Link>

        </div>
    )
        
}





