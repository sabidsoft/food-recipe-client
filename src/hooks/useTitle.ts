import { useEffect } from "react";

const useTitle = (title: string): void => {
    useEffect(() => {
        if (title === "Home") {
            document.title = `Food Recipe`;
        } else {
            document.title = `${title} | Food Recipe`;
        }
    }, [title]);
};

export default useTitle;