import { Route, Routes } from "react-router-dom";
import PageLogin from "./pages/Login";
import PageMovies from "./pages/Movies";
import {
    Dispatch,
    SetStateAction,
    createContext,
    useEffect,
    useRef,
    useState,
} from "react";
import Nav from "./components/Nav";
import PageFavorites, { getMyFavorites } from "./pages/Favorites";

/** Détails API de l'utilisteur */
export interface ApiCrendentialsI {
    KEY: string;
    ACCOUNT: string;
}

export const API: ApiCrendentialsI = {
    KEY: "",
    ACCOUNT: "",
};

/** Status de connexion */
type AuthT =
    | [ApiCrendentialsI, Dispatch<SetStateAction<ApiCrendentialsI>>]
    | undefined;
export const AuthContext = createContext<AuthT>(undefined);

/**
 * Ce contexte sert à stocker les favoris de manière globale
 * afin de ne pas avoir a effectuer de nouveaux appels API à
 * chaque fois
 */
type myFavoritesT =
    | [Set<number>, Dispatch<SetStateAction<Set<number>>>]
    | undefined;
export const myFavoritesContext = createContext<myFavoritesT>(undefined);

function App() {
    const mounted = useRef<boolean>(false);

    // La raison pour laquelle il m'a semblé logique d'utiliser
    // un contexte AuthT décorellé d'une variable globale API
    // était de pouvoir utiliser la globale API dans des fonctions
    // pures en dehors des composants sans avoir à manipuler d'états
    // et de ne manipuler l'état que lorsque c'était necessaire,
    // à la connexion et la déconnexion de l'utilisateur
    const [auth, setAuth] = useState<ApiCrendentialsI>(API);
    const [favorites, setFavorites] = useState<Set<number>>(new Set());

    // si on a deja une clé API enregistrée dans le localStorage on l'utilise
    useEffect(() => {
        if (
            !mounted.current &&
            localStorage.getItem("APIKEY") &&
            localStorage.getItem("APIACCOUNT")
        ) {
            setAuth({
                KEY: localStorage.getItem("APIKEY") || "",
                ACCOUNT: localStorage.getItem("APIACCOUNT") || "",
            });
        }
        mounted.current = true;
    }, []);

    // mise a jour de la globale API lors de la mise a jour de auth
    // mise a jour du localStorage pour stocker ou supprimer la clé API
    useEffect(() => {
        localStorage.setItem("APIKEY", (API.KEY = auth.KEY));
        localStorage.setItem("APIACCOUNT", (API.ACCOUNT = auth.ACCOUNT));
        // mise a jour de la liste des favoris
        API.KEY &&
            getMyFavorites(auth).then((list) => setFavorites(new Set(list)));
    }, [auth]);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            <myFavoritesContext.Provider value={[favorites, setFavorites]}>
                <main className="h-100vh flex flex-col items-center justify-between gap-4 overflow-hidden">
                    <header className="font-display font-semibold text-sm mt-4 text-center">
                        by Enzo Aicardi.
                    </header>
                    <div className="w-full max-w-160 p-4 flex flex-col justify-center gap-4 min-h-0">
                        {auth.KEY ? (
                            <Routes>
                                <Route path="/" element={<PageMovies />} />
                                <Route path="/list" element={<PageMovies />} />
                                <Route
                                    path="/favorites"
                                    element={<PageFavorites />}
                                />
                            </Routes>
                        ) : (
                            <PageLogin />
                        )}
                    </div>
                    {auth.KEY ? <Nav /> : <div></div>}
                </main>
            </myFavoritesContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
