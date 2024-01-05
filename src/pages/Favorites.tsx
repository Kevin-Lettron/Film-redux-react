import { useContext, useEffect, useState } from "react";
import Heading from "../components/Heading";
import List from "../components/List";
import { MoviesResponseResult } from "./Movies";
import NavPage from "../components/NavPage";
import { ApiCrendentialsI, AuthContext } from "../App";
import { MoviesResponse } from "../pages/Movies";

export async function getFavorites(
    auth: ApiCrendentialsI,
    page: string
): Promise<MoviesResponse> {
    console.log("[app] fetching favorites movies...", "page:", page);
    const res = await fetch(
        `https://api.themoviedb.org/3/account/${auth.ACCOUNT}/favorite/movies?language=en-US&` +
            new URLSearchParams([
                ["page", page],
                ["api_key", auth.KEY],
            ]),
        {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTRkNDQzYzE1NjViMmRjODhhY2Y4MjdkNmU0ZDAxYyIsInN1YiI6IjY1OTZjZTY3MGU2NGFmNTI1NDhjMTkyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HizfxAUOrvuaMsYKkIrlvX9J91rcTT8ZYg4qEECIfII",
            },
        }
    );
    return await res.json();
}

export async function updateFavorite(
    auth: ApiCrendentialsI,
    id: number,
    status: boolean
): Promise<MoviesResponse> {
    const res = await fetch(
        `https://api.themoviedb.org/3/account/${auth.ACCOUNT}/favorite?` +
            new URLSearchParams([["api_key", auth.KEY]]),
        {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTRkNDQzYzE1NjViMmRjODhhY2Y4MjdkNmU0ZDAxYyIsInN1YiI6IjY1OTZjZTY3MGU2NGFmNTI1NDhjMTkyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HizfxAUOrvuaMsYKkIrlvX9J91rcTT8ZYg4qEECIfII",
            },
            body: JSON.stringify({
                media_type: "movie",
                media_id: id,
                favorite: status,
            }),
        }
    );

    return await res.json();
}

export async function getMyFavorites(auth: ApiCrendentialsI) {
    let list = [];

    let page = 1;
    let pageTotal = 2;

    while (page < pageTotal) {
        // appel TMDB
        const favorites = await getFavorites(auth, page.toString());
        // ajout des identifiants de film
        favorites.results &&
            list.push(...favorites.results.map((movie) => movie.id));
        // mise a jour des données de pagination
        page = favorites.page + 1;
        pageTotal = favorites.total_pages;
    }

    return list;
}

export default function PageFavorites() {
    const [auth, _] = useContext(AuthContext)!;

    const [page, setPage] = useState<number>(1);
    const [pageTotal, setPageTotal] = useState<number>(1);

    const [movies, setMovies] = useState<MoviesResponseResult[]>([]);

    useEffect(() => {
        if (auth.KEY) {
            getFavorites(auth, page.toString()).then((res) => {
                setMovies(res.results);
                setPageTotal(res.total_pages);
            });
        }
    }, [page, auth]);

    return (
        <>
            <Heading title="Mes favoris" subtitle="Catalogue" />
            <List movies={movies} />
            <NavPage page={page} setPage={setPage} pageTotal={pageTotal} />
        </>
    );
}
