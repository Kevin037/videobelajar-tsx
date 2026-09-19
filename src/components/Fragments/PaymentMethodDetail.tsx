import Image from "next/image"
import { Card } from "@/components/Elements/card"
import { H2 } from "@/components/Elements/heading"
import { PaymentMethod } from "@/services/types"

export const PaymentMethodDetail: React.FC<{paymentMethod: PaymentMethod}> = (props) => {
    const {paymentMethod} = props
    return (
        <Card varian="mb-4 p-10 text-center hover:opacity-100">
            <Image className="object-contain w-full h-auto max-h-24 md:w-50 mx-auto" width={50} height={50} src={paymentMethod.icon} alt="" />
            <H2 varian="mt-4 text-center">Bayar Melalui {paymentMethod.name}</H2>
            {paymentMethod.number != "" &&             
            <div className="flex gap-4 justify-center">
                <p>{paymentMethod.number}</p><span><a href="#" className="text-red-400">Salin</a></span>
            </div>}
        </Card>
    )
}