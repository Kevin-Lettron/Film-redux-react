import { FormEvent, useContext, useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/Input";
import Error from "../components/Error";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

interface LoginStatusResponse {
    success: boolean;
    status_code: number;
    status_message: string;
}

export async function checkLogin(APIKEY: string): Promise<LoginStatusResponse> {
    const res = await fetch(
        "https://api.themoviedb.org/3/authentication?" +
            new URLSearchParams([["api_key", APIKEY]])
    );
    return await res.json();
}

export default function PageLogin() {
    const navigate = useNavigate();
    // récupération du status d'authentification via son contexte
    const [_, setAuth] = useContext(AuthContext)!;

    // message d'erreur personnalisé
    const [error, setError] = useState<string>("");

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        // récupération des données du formulaire
        const datas = new FormData(e.currentTarget as HTMLFormElement);
        const APIKEY = datas.get("api") as string;
        const APIACCOUNT = datas.get("account") as string;

        // vérification de la correspondance des données
        if (APIKEY && APIACCOUNT) {
            // test de connexion
            checkLogin(APIKEY).then((res) => {
                // mise a jour du status d'authentification
                if (res.success) {
                    setAuth({
                        KEY: APIKEY,
                        ACCOUNT: APIACCOUNT,
                    });
                    // redirection
                    navigate("/list");
                } else {
                    setError(
                        "Vos identifiants ne sont pas bons, veuillez réessayer"
                    );
                }
            });
        } else {
            setError(
                "Vous devez renseigner tous les champs du formulaire de connexion"
            );
        }
    };

    return (
        <>
            <Heading title="Espace privé" subtitle="Profitez des avantages" />
            <Error message={error} setMessage={setError} />
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <Input name="api" placeholder="Renseignez votre clé API..." />
                <Input
                    name="account"
                    placeholder="Identifiant de compte utilisateur..."
                />
                <Button type="submit" text="Me connecter à l'API" />
            </form>
        </>
    );
}
