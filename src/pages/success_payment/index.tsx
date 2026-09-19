import { useEffect } from "react";
import Authlayout from "@/components/Layouts/AuthLayout";
import { ButtonPrimaryMD } from "@/components/Elements/button";
import { Card } from "@/components/Elements/card";
import { H2 } from "@/components/Elements/heading";
import Image from "next/image";

const SuccessPaymentPage = () => {
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token === null) {
            window.location.href = "/login";
        }
    },[]);

 return (
    <Authlayout title="Home" navType="home" withFooter={false} customHead={<Image alt="" src="/assets/process_completed.svg" width={20} height={20} className="w-100" />}>
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <div className="p-2 mt-2 block md:hidden">
                <Image alt="" src="/assets/process_completed_mobile.svg" width={20} height={20} className="w-full" />
            </div>
            <Card varian="mb-4 p-10 text-center hover:opacity-100">
                <Image className="object-cover w-100 h-auto h-auto mx-auto" src="/assets/success_payment.svg" width={50} height={50} alt="" />
                <H2 varian="mt-4 text-center">Pembayaran Berhasil!</H2>         
                <div className="justify-center">
                    <p className="text-sm text-gray-400">Silakan cek email kamu untuk informasi lebih lanjut. Hubungi kami jika ada kendala.</p>
                    <ButtonPrimaryMD url="/orders" varian="mt-4">Lihat Detail Pesanan</ButtonPrimaryMD>
                </div>
            </Card>
        </div>
    </Authlayout>
 );
}

export default SuccessPaymentPage