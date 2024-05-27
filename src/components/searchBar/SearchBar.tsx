import { ImSearch } from "react-icons/im";
import { SearchBarProps } from "./types";

export default function SearchBar({
    searchText,
    handleSubmit,
    handleTitleChange,
}: SearchBarProps) {

    return (
        <form
            onSubmit={handleSubmit}
            className="
                flex 
                justify-center
                items-center
            "
        >
            <input
                type="search"
                value={searchText}
                onChange={handleTitleChange}
                placeholder="Search recipe by recipe name..."
                className="
                        w-[50%]
                        inline-block
                        mr-2
                        px-5
                        py-2
                        border
                        rounded-full
                        focus:outline-none
                        focus:border-[#F3483E]
                    "
            />
            <button
                type="submit"
                className="
                        bg-[#F3483E]
                        hover:bg-[#c53932]
                        duration-300
                        py-2
                        px-8
                        rounded-full
                        cursor-pointer
                    "
            >
                <ImSearch
                    size={24}
                    color={"#fff"}
                />
            </button>
        </form>
    );
};