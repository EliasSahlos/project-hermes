import Image from "next/image";
import { useEffect, useState } from "react";

function SourcesBlock({ sources, onSelectedSources }: WebsitesSourcesProps) {
    const [selectedSources, setSelectedSources] = useState<string[]>([])

    useEffect(() => {
        onSelectedSources(selectedSources)
    }, [selectedSources, onSelectedSources])

    function sourceClickHandler(source: { value: string }) {
        if (!selectedSources.includes(source.value)) {
            //Add source to array
            setSelectedSources((prevSelectedSources) => [...prevSelectedSources, source.value])
        } else {
            //Remove source from array
            setSelectedSources((prevSelectedSources) =>
                prevSelectedSources.filter((item) => item !== source.value))
        }
    }

    function sourceElementStyle(source: { title: string }) {
        if (!selectedSources.includes(source.title)) {
            return 'w-[180px] h-[180px] rounded shadow-md border-[1px] border-black flex flex-col justify-center items-center relative p-2 hover:scale-110 ease-in duration-200 cursor-pointer'
        } else {
            return 'w-[180px] h-[180px] bg-[#d5b4e9] rounded shadow-md border-[1px] border-black flex flex-col justify-center items-center relative p-2 scale-110 cursor-pointer'
        }
    }
    
    return (
        <div className="flex justify-center items-center">
            <div className="mb-6">
                <div className="grid gap-6 grid-cols-2 xl:grid-cols-5">
                    {sources.map((source) => (
                        <div
                            key={source._id}
                            className={sourceElementStyle(source)}
                            onClick={() => sourceClickHandler(source)}
                        >
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <Image src={source.icon} alt='broken-src-image' width={80} height={80} />
                            </div>
                            <div className="absolute bottom-0 w-full text-center">
                                <h1>{source.title}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SourcesBlock;
