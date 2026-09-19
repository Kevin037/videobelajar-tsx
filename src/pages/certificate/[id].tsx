import { useEffect, useRef } from "react";
import Authlayout from "@/components/Layouts/AuthLayout";
import { Card } from "@/components/Elements/card";
import useOrder from "@/hooks/useOrder";
import html2canvas from "html2canvas";
import { useParams } from "react-router-dom";
import useUser from "@/hooks/useUser";
import { ButtonWhiteMD } from "@/components/Elements/button";
import Image from "next/image";
import { Order, User } from "@/services/types";

const CertificatePage = () => {
    const { currentUser }: { currentUser: User | null } = useUser();
    const certRef = useRef<HTMLDivElement>(null);
    const { id } = useParams<{ id?: string }>();
    const numericId = id ? Number(id) : null;
    const { currentOrder }: { currentOrder: Order | null } = useOrder(numericId);

    useEffect(() => {
        console.log(currentOrder);
        
    }, [currentOrder]);

const downloadCertificate = () => {
    if (certRef.current) {
        html2canvas(certRef.current).then((canvas) => {
            const link = document.createElement("a");
            link.download = "certificate.png";
            link.href = canvas.toDataURL();
            link.click();
      });
    }
    };
 return (
    <Authlayout title="Home" navType="home" withFooter={true}>
        {currentOrder && (
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <Card varian="mb-4 p-10 hover:opacity-100">
                    <div className="text-center my-5">
                        <div className="relative bg-[#f1fff4] px-0 py-6 sm:px-20 sm:py-10 rounded-xl flex justify-center">
                            <div ref={certRef}>
                                <Image
                                    src="/assets/certificate_template.svg"
                                    width={500}
                                    height={500}
                                    alt="certificate"
                                    className=""
                                />
                                <div className="absolute top-[205px] left-0 w-full text-center">
                                    <h1 className="text-lg text-black">{currentUser?.name}</h1>
                                </div>
                                <div className="absolute top-[243px] left-0 w-full text-center">
                                    <p className="text-[8px] text-black">For successfully completing <br />{currentOrder?.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-12 mt-5">
                        <div className="col-span-9">
                            <h4 className="text-ls sm:mt-2 font-bold">{currentOrder?.name}</h4>
                            <p className="text-sm mt-1 text-gray-400">{currentOrder?.description}</p>
                            <div className="flex gap-4 mt-3">
                                <Image src={`/assets/${currentOrder?.tutor_photo}`} width={50} height={50} alt="" />
                                <div>
                                    <p><b>{currentOrder?.tutor}</b></p>
                                    <p>{currentOrder?.user_position} di {currentOrder?.tutor_company}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div><Image alt="" src="/assets/rating.svg" width={100} height={100}/></div>
                                <div>{currentOrder?.rating} ({currentOrder?.total_selling})</div>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <ButtonWhiteMD varian="mt-4" onClick={() => downloadCertificate()}>
                            <div className="flex gap-2 justify-center">
                                <Image src="/assets/download.svg" width={20} height={20} alt="" />
                                <span>Download Sertifikat</span>
                            </div>
                            </ButtonWhiteMD>
                        </div>
                    </div>
                </Card>
            </div>
        )}
    </Authlayout>
 );
}

export default CertificatePage