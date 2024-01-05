import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../App";

export default function Nav() {
    // récupération du status d'authentification via son contexte
    const [_, setAuth] = useContext(AuthContext)!;

    // on vide le status d'authentification ce qui aura pour effet
    // d'afficher la page de login et d'empécher les appels API
    const handleLogout = () => {
        setAuth({
            KEY: "",
            ACCOUNT: "",
        });
    };

    return (
        <nav className="pb-2 flex gap-8">
            <div className="cursor-pointer" onClick={handleLogout}>
                <svg
                    className="h-8 w-8 mx-auto"
                    id="icon-logout"
                    viewBox="0 0 24 24"
                >
                    <path d="M3.984 5.016v13.969h8.016v2.016h-8.016q-0.797 0-1.383-0.609t-0.586-1.406v-13.969q0-0.797 0.586-1.406t1.383-0.609h8.016v2.016h-8.016zM17.016 6.984l4.969 5.016-4.969 5.016-1.406-1.453 2.578-2.578h-10.172v-1.969h10.172l-2.578-2.625z"></path>
                </svg>
                <p className="text-center text-xs color-gray-4">Deconnexion</p>
            </div>
            <NavLink to="/list">
                <svg
                    className="h-8 w-8 mx-auto"
                    id="icon-movie"
                    viewBox="0 0 24 24"
                >
                    <path d="M18 3.984h3.984v14.016q0 0.797-0.586 1.406t-1.383 0.609h-16.031q-0.797 0-1.383-0.609t-0.586-1.406v-12q0-0.797 0.586-1.406t1.383-0.609h1.031l1.969 4.031h3l-1.969-4.031h1.969l2.016 4.031h3l-2.016-4.031h2.016l2.016 4.031h3z"></path>
                </svg>
                <p className="text-center text-xs color-gray-4">Les Films</p>
            </NavLink>
            <NavLink to="/favorites">
                <svg
                    className="h-8 w-8 mx-auto"
                    id="icon-stars"
                    viewBox="0 0 24 24"
                >
                    <path d="M16.219 18l-1.125-4.828 3.75-3.234-4.922-0.422-1.922-4.5-1.922 4.547-4.922 0.375 3.75 3.234-1.125 4.828 4.219-2.531zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93z"></path>
                </svg>
                <p className="text-center text-xs color-gray-4">Mes Favoris</p>
            </NavLink>
        </nav>
    );
}
