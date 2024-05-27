import informationalImage from '../../../assets/images/test.jpg';
import educationalImage from '../../../assets/images/education.jpg';
import skilledImage from '../../../assets/images/skill.webp';
import DevInfoCard from '../../cards/devInfoCard/DevInfoCard';

export default function DevInfo() {
    return (
        <section className="bg-gray-100 pb-16">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-8">Dev Info</h2>
                <div className="flex flex-col flex-wrap md:flex-row ">
                    <DevInfoCard
                        image={informationalImage}
                        mainTitle='Basic Information'
                        titleOne='Name'
                        titleTwo='Home District'
                        titleThree='Current District'
                        titleFour='Marital Status'
                        titleFive='Blood Group'
                        valueOne='MD Sabid Hasan'
                        valueTwo='Gaibandha'
                        valueThree='Dhaka'
                        valueFour='Unmarried'
                        valueFive='B negative'
                    />

                    <DevInfoCard
                        image={educationalImage}
                        mainTitle='Educational Background'
                        titleOne='SSC'
                        titleTwo='HSC'
                        titleThree='Bachelor Degree'
                        titleFour='Web Development Course'
                        titleFive='Redux Course'
                        valueOne='GPA 4.63'
                        valueTwo='GPA 3.40'
                        valueThree='Drop out for financial crisis'
                        valueFour='Programming Hero'
                        valueFive='Learn with Sumit Platform'
                    />

                    <DevInfoCard
                        image={skilledImage}
                        mainTitle='Skills'
                        titleOne='Language'
                        titleTwo='Frontend'
                        titleThree='Backend'
                        titleFour='Tools'
                        titleFive='Other Skills'
                        valueOne='JavaScript, TypeScript'
                        valueTwo='HTML, CSS, React, Redux, Tailwind'
                        valueThree='Node.js, Express.js, MongoDB'
                        valueFour='Git, GitHub, VScode'
                        valueFive='Photoshop, Figma, Canva'
                    />
                </div>
            </div>
        </section>
    );
}
