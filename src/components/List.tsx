import { MoviesResponseResult } from "../pages/Movies";
import Card from "./Card";

interface ListPropsI {
    movies: MoviesResponseResult[];
}

export default function List({ movies }: ListPropsI) {
    return (
        <ul className="flex flex-col gap-6 overflow-auto no-scrollbar">
            {movies &&
                movies.map((movie) => (
                    <li key={movie.id}>
                        <Card
                            id={movie.id}
                            title={movie.title}
                            cover={movie.poster_path}
                            description={movie.overview}
                            release={movie.release_date}
                        />
                    </li>
                ))}
        </ul>
    );
}
