import { useEffect, useState } from "react";
import Authlayout from "@/components/Layouts/AuthLayout";
import { getAllPaymentMethods } from "@/services/data";
import { ButtonPrimarySubmit } from "@/components/Elements/button";
import { Card } from "@/components/Elements/card";
import { H1 } from "@/components/Elements/heading";
import { ItemSpesification } from "@/components/Fragments/ItemSpesification";
import { CheckCircle, ChevronDown } from "lucide-react";
import { TransactionNominal } from "@/components/Fragments/TransactionNominal";
import useClass from "@/hooks/useClass";
import useOrder from "@/hooks/useOrder";
import Image from "next/image";
import { PaymentMethodsGroup } from "@/services/types";
import { useRouter } from "next/router";

const CheckoutPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [paytmentMethods,setPaytmentMethods] = useState<PaymentMethodsGroup>({});
    const [openGroup, setOpenGroup] = useState("Transfer Bank");
    const [paymentMethod, setpaymentMethod] = useState<string>("");
    const numericId = id ? (Array.isArray(id) ? parseInt(id[0]) : parseInt(id)) : null;
    const { selectedClass, classFacilities } = useClass({id:numericId});
    const [class_id, setClassId] = useState<number | null>(null);

    const { currentOrder, createOrder } = useOrder();

useEffect(() => {
    const token = localStorage.getItem("token");
    if(token === null) {
        window.location.href = "/login";
    }
    setPaytmentMethods(getAllPaymentMethods());
}, []);

useEffect(() => {
    if (id) {
        setClassId(Array.isArray(id) ? Number(id[0]) : Number(id));
    }
}, [id]);

const HandleCheckout = () => {
    if (paymentMethod === "") {
        alert("Pilih Metode Pembayaran");
        return;
    }
    if (selectedClass && class_id) {
        const price = selectedClass.new_price;
        createOrder({ price, class_id, paymentMethod });
    }
};

useEffect(() => {
    if (currentOrder) {
        window.location.href = "/payment/"+currentOrder;
    }
}, [currentOrder]);

 return (
    <Authlayout title="Home" navType="home" withFooter={false} style={{paddingTop: "0"}} customHead={<Image alt="" src="/assets/process_choose_payment.svg" width={30} height={30} className="w-100" />}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="p-2 mt-4 block md:hidden">
                <Image alt="" src="/assets/process_choose_payment_mobile.svg" width={30} height={30} className="w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 ...">
                <div className="col-span-2 order-2 md:order-1">
                    <Card varian="md:mr-4">
                        <H1>Metode Pembayaran</H1><br />
                        {Object.entries(paytmentMethods).map(([groupName, methods]) => (
                            <div key={groupName} className="bg-white rounded-xl shadow-sm">
                            <button
                                className="w-full flex justify-between items-center px-4 py-3 font-medium mb-3"
                                onClick={() =>
                                setOpenGroup(openGroup === groupName ? "" : groupName)
                                }
                            >
                                {groupName}
                                <ChevronDown
                                className={`w-4 h-4 transition-transform ${
                                    openGroup === groupName ? "rotate-180" : ""
                                }`}
                                />
                            </button>

                            {openGroup === groupName && (
                                <div className="">
                                {methods.map((method) => (
                                    <button
                                    key={method.key}
                                    className={`flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 ${
                                        paymentMethod === method.key
                                        ? "bg-orange-50"
                                        : "bg-white"
                                    }`}
                                    onClick={() => setpaymentMethod(method.key)}
                                    >
                                    <div className="flex items-center gap-3">
                                        <Image
                                        src={method.icon}
                                        width={30}
                                        height={30}
                                        alt={method.name}
                                        className="h-6"
                                        />
                                        <span>{method.name}</span>
                                    </div>
                                    {paymentMethod === method.key && (
                                        <CheckCircle className="text-orange-500 w-5 h-5" />
                                    )}
                                    </button>
                                ))}
                                </div>
                            )}
                            </div>
                        ))}
                    </Card>
                    <Card varian="md:mr-4 mt-4 py-6">
                        <TransactionNominal />
                        <ButtonPrimarySubmit onClick={HandleCheckout} varian="w-full mt-4">Beli Sekarang</ButtonPrimarySubmit>
                    </Card>
                </div>
                <div className="col-span-1 ... mx-2 sm:mx-0 order-1 lg:order-2">
                {selectedClass && (
                    <ItemSpesification isDetail={true} data={selectedClass} facilities={classFacilities} />
                )}
                </div>
            </div>
        </div>
    </Authlayout>
 );
}

export default CheckoutPage