import { DevInfoCardProps } from "./types";

export default function DevInfoCard({
    image,
    mainTitle,
    titleOne,
    titleTwo,
    titleThree,
    titleFour,
    titleFive,
    valueOne,
    valueTwo,
    valueThree,
    valueFour,
    valueFive,
}: DevInfoCardProps) {
    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-4 flex">
            <div className="bg-white rounded-lg shadow-lg flex-grow">
                <img src={image} alt="Basic Information" className='rounded-t-lg w-full h-60 object-cover' />
                <div className='p-8'>
                    <h2 className="text-lg font-semibold mb-4">{mainTitle}</h2>
                    <p><b>{titleOne}: </b>{valueOne}</p>
                    <p><b>{titleTwo}: </b>{valueTwo}</p>
                    <p><b>{titleThree}: </b>{valueThree}</p>
                    <p><b>{titleFour}: </b>{valueFour}</p>
                    <p><b>{titleFive}: </b>{valueFive}</p>
                </div>
            </div>
        </div>
    );
}
