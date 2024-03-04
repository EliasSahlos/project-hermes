import Image from "next/image"

function CategoriesFiltersBlock() {

    return (
        <div className="grid grid-cols-2 gap-x-7 gap-y-4 lg:gap-x-4 lg:gap-y-2">
            <div className="p-4 border-2 rounded shadow-md relative overflow-hidden w-32 h-32">
                <div className="absolute inset-0 bg-white opacity-70 z-10"></div>
                <Image
                    className="absolute inset-0 object-cover transform scale-110"
                    src='https://whyathens.com/wp-content/uploads/2016/09/Greek-Parliament-Hellenic-Vouli-Chamber-.jpg'
                    alt='broken-img'
                    layout="fill"
                />
                <h1 className="absolute inset-0 flex justify-center items-center font-bold z-20">Politics</h1>
            </div>

            <div className="p-4 border-2 rounded shadow-md relative overflow-hidden w-32 h-32">
                <div className="absolute inset-0 bg-white opacity-70 z-10"></div>
                <Image
                    className="absolute inset-0 object-cover transform scale-110"
                    src='https://img1.wsimg.com/isteam/ip/69cba915-80dd-4ce2-a7e4-1d6b667d710d/winery1912.jpg'
                    alt='broken-img'
                    layout="fill"
                />
                <h1 className="absolute inset-0 flex justify-center items-center font-bold z-20">Lifestyle</h1>
            </div>


            <div className="p-4 border-2 rounded shadow-md relative overflow-hidden w-32 h-32">
                <div className="absolute inset-0 bg-white opacity-70 z-10"></div>
                <Image
                    className="absolute inset-0 object-cover transform scale-110"
                    src='https://www.newsit.gr/wp-content/uploads/2024/03/iStock-801479766.jpg'
                    alt='broken-img'
                    layout="fill"
                />
                <h1 className="absolute inset-0 flex justify-center items-center font-bold z-20">Economics</h1>
            </div>

            <div className="p-4 border-2 rounded shadow-md relative overflow-hidden w-32 h-32">
                <div className="absolute inset-0 bg-white opacity-70 z-10"></div>
                <Image
                    className="absolute inset-0 object-cover transform scale-110"
                    src='https://www.newsit.gr/wp-content/uploads/2024/03/olympiakos-scaled.jpg'
                    alt='broken-img'
                    layout="fill"
                />
                <h1 className="absolute inset-0 flex justify-center items-center font-bold z-20">Sports</h1>
            </div>

            <div className="p-4 border-2 rounded shadow-md relative overflow-hidden w-32 h-32">
                <div className="absolute inset-0 bg-white opacity-70 z-10"></div>
                <Image
                    className="absolute inset-0 object-cover transform scale-110"
                    src='https://www.newsit.gr/wp-content/uploads/2024/02/iStock-1206796363.jpg'
                    alt='broken-img'
                    layout="fill"
                />
                <h1 className="absolute inset-0 flex justify-center items-center font-bold z-20">Technology</h1>
            </div>

            <div className="p-4 border-2 rounded shadow-md relative overflow-hidden w-32 h-32">
                <div className="absolute inset-0 bg-white opacity-70 z-10"></div>
                <Image
                    className="absolute inset-0 object-cover transform scale-110"
                    src='https://i.pinimg.com/736x/bb/87/b7/bb87b743b9ed1dc1516a08955fe51842.jpg'
                    alt='broken-img'
                    layout="fill"
                />
                <h1 className="absolute inset-0 flex justify-center items-center font-bold z-20">Health</h1>
            </div>
        </div>
    )
}

export default CategoriesFiltersBlock