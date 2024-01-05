import { useContext } from "react";
import Favorite from "./Favorite";
import { updateFavorite } from "../pages/Favorites";
import { AuthContext, myFavoritesContext } from "../App";

interface CardPropsI {
    id: number;
    title: string;
    cover: string;
    description: string;
    release: string;
}

export default function Card({
    id,
    title,
    cover,
    description,
    release,
}: CardPropsI) {
    const [auth, _] = useContext(AuthContext)!;
    const [favorites, setFavorites] = useContext(myFavoritesContext)!;

    const handleToggleFavorite = () => {
        if (favorites.has(id)) {
            favorites.delete(id);
        } else {
            favorites.add(id);
        }
        updateFavorite(auth, id, favorites.has(id));
        setFavorites(new Set(favorites));
    };

    return (
        <article className="w-full flex flex-col items-center gap-4 sm:flex-row sm:items-stretch">
            <img
                className="w-40"
                src={
                    cover
                        ? "https://image.tmdb.org/t/p/w500" + cover
                        : "https://eapp.org/wp-content/uploads/2018/05/poster_placeholder.jpg"
                }
                alt={title}
            />
            <div className="flex flex-col gap-2">
                <p className="font-display font-semibold text-xl">{title}</p>
                <p className="text-sm">{description}</p>
                <p className="mt-auto text-sm color-gray-4">{release}</p>
            </div>
            <div
                className="ml-auto w-6 h-6 cursor-pointer flex-none select-none"
                onClick={handleToggleFavorite}
            >
                <Favorite checked={favorites.has(id)} />
            </div>
        </article>
    );
}
