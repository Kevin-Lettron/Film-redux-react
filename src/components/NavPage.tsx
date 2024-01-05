import { Dispatch, SetStateAction } from "react";

interface NavPagePropsI {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    pageTotal: number;
}

export default function NavPage({ page, setPage, pageTotal }: NavPagePropsI) {
    return (
        <nav className="grid grid-cols-3 text-center">
            <button
                className="hover:color-gray-4"
                onClick={() => page > 1 && setPage((p) => p - 1)}
            >
                {page > 1 && "Précédent"}
            </button>
            <p>
                page {page} sur {pageTotal}
            </p>
            <button
                className="hover:color-gray-4"
                onClick={() => page < pageTotal && setPage((p) => p + 1)}
            >
                {page < pageTotal && "Suivant"}
            </button>
        </nav>
    );
}
