import { FormEvent, useContext, useEffect, useState } from "react";
import { ApiCrendentialsI, AuthContext } from "../App";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/Input";
import List from "../components/List";
import NavPage from "../components/NavPage";

export interface MoviesResponse {
    page: number;
    results: MoviesResponseResult[];
    total_pages: number;
    total_results: number;
}

export interface MoviesResponseResult {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

async function getMovies(
    auth: ApiCrendentialsI,
    page: string,
    terms: string
): Promise<MoviesResponse> {
    console.log("[app] fetching movies...", "page:", page, "search:", terms);
    if (!terms) {
        const res = await fetch(
            "https://api.themoviedb.org/3/movie/popular?language=en-US&" +
                new URLSearchParams([
                    ["page", page],
                    ["api_key", auth.KEY],
                ])
        );
        return await res.json();
    } else {
        const res = await fetch(
            "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&" +
                new URLSearchParams([
                    ["page", page],
                    ["query", terms],
                    ["api_key", auth.KEY],
                ])
        );
        return await res.json();
    }
}

export default function PageMovies() {
    const [auth, _] = useContext(AuthContext)!;

    const [page, setPage] = useState<number>(1);
    const [pageTotal, setPageTotal] = useState<number>(1);

    const [terms, setTerms] = useState<string>("");
    const [movies, setMovies] = useState<MoviesResponseResult[]>([]);

    useEffect(() => {
        if (auth.KEY) {
            getMovies(auth, page.toString(), terms).then((res) => {
                setMovies(res.results);
                setPageTotal(res.total_pages);
            });
        }
    }, [page, terms, auth]);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        const datas = new FormData(e.currentTarget as HTMLFormElement);
        const terms = datas.get("terms") as string;

        setPage(1);
        setTerms(terms || "");
    };

    return (
        <>
            <Heading title="Les films" subtitle="Catalogue" />
            <form className="flex gap-4" onSubmit={handleSearch}>
                <Input name="terms" placeholder="Rechercher un film" />
                <Button type="submit" text="Rechercher" />
            </form>
            <List movies={movies} />
            <NavPage page={page} setPage={setPage} pageTotal={pageTotal} />
        </>
    );
}
