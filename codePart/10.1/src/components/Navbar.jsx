import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <section>
            <nav>
                {/* you cannot use link tag outside the browser router  */}
                <ul style={{ display: 'flex', alignItems: 'center', gap: '100px', listStyle: 'none', width: '95vw', padding: '20px', justifyContent: 'flex-end' }}>
                    <li><Link style={{ textDecoration: 'none', color: 'black' }} to={"/"}>Home</Link></li>
                    <li><Link style={{ textDecoration: 'none', color: 'black' }} to={"/about"}>About</Link></li>
                    <li><Link style={{ textDecoration: 'none', color: 'black' }} to={"/contact"}>Contact</Link></li>
                    <li><Link style={{ textDecoration: 'none', color: 'black' }} to={"/userefhook"}>UseRefHook</Link></li>
                </ul>
            </nav>
        </section>
    )
}

export default Navbar
