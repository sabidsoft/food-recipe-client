import Banner from "../../components/sections/banner/Banner";
import DevInfo from "../../components/sections/devInfo/DevInfo";
import SuccessStories from "../../components/sections/successStories/SuccessStories";
import useTitle from "../../hooks/useTitle";

export default function Home() {
    useTitle('Home');

    return (
        <div>
            <Banner />
            <SuccessStories />
            <DevInfo />
        </div>
    );
}
