import { Outlet, Link } from "react-router-dom"

export default function layout() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to={"*"}>Nopage</Link>
                    </li>
                    <li>
                        <Link to={"/kontakt"}>kontakt</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
