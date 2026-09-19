import { Card } from "@/components/Elements/card"
import { formatNumberToK } from "@/services/data"
import Image from "next/image"
import { CardItemsProps } from "@/services/types"
import Link from "next/link"

const CardItems: React.FC<CardItemsProps> = (props) => {
    const {data} = props
    return (
        <Link href={`/product/${data.id}`}>
        <Card key={data.id} varian="mx-2 max-w-sm">
        <div className="grid grid-cols-3 md:grid-cols-1 ...">
            <div className="col-span-1 ... relative">
                <Image 
                    width={400} 
                    height={225} 
                    className="img-item" 
                    src={data.photo.startsWith('http') ? data.photo : `/assets/${data.photo}`}
                    alt={data.name || "Course thumbnail"}
                />
            </div>
            <div className="col-span-2 ... mx-2 sm:mx-0">
                <h4 className="text-ls sm:mt-2 font-bold">{data.name}</h4>
                <p className="text-sm mt-2 hidden md:block">{data.description}</p>
                <div className="my-2 grid grid-cols-3 grid-cols-5 ...">
                    <div className="col-span-1 ...">
                        {data.tutor_photo ? (
                            <Image 
                                width={40} 
                                height={40} 
                                src={data.tutor_photo.startsWith('http') ? data.tutor_photo : `/assets/${data.tutor_photo}`}
                                alt={`${data.tutor}'s photo`}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <Image 
                                width={40} 
                                height={40} 
                                src="/assets/default-user.jpg"
                                alt="Default tutor photo"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        )}
                    </div>
                    <div className="text-sm col-span-4 ...">
                        <p><b>{data.tutor}</b></p>
                        <p>{data.tutor_position} di {data.tutor_company}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 grid-cols-4 ...">
            <div className="col-span-3 ...">
            <div className="grid grid-cols-1 grid-cols-2 ...">
                <div className="col-span-1">
                    <Image 
                        width={100} 
                        height={100} 
                        alt="Rating icon" 
                        src="/assets/rating.svg"
                    />
                </div>
                <div className="col-span-1">{data.rating_average} ({data.total_selling})</div>
            </div>
            </div>
            <div className="col-span-1 ...">
                <b><h5 className="price">Rp {formatNumberToK(data.new_price)}</h5></b>
            </div>
        </div>
    </Card>
    </Link>
    )
}

export default CardItems