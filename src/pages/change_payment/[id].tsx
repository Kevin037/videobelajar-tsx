import { useEffect, useState } from "react";
import Authlayout from "@/components/Layouts/AuthLayout";
import { ButtonPrimarySubmit } from "@/components/Elements/button";
import { Card } from "@/components/Elements/card";
import { H1 } from "@/components/Elements/heading";
import { ItemSpesification } from "@/components/Fragments/ItemSpesification";
import { getAllPaymentMethods, getPaymentMethodGroup } from "@/services/data";
import { TransactionNominal } from "@/components/Fragments/TransactionNominal";
import { CheckCircle, ChevronDown } from "lucide-react";
import useOrder from "../../hooks/useOrder";
import useClass from "../../hooks/useClass";
import Image from "next/image";
import { PaymentMethodsGroup } from "@/services/types";
import { useRouter } from "next/router";

const ChangePaymentPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [paytmentMethods,setPaytmentMethods] = useState<PaymentMethodsGroup>({});
    const [openGroup, setOpenGroup] = useState<string>("Transfer Bank");
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const { currentOrder } = useOrder(Number(id));
    const class_id = currentOrder?.class_id;
    const { classFacilities } = useClass({id:class_id});
    const { updateOrder, status } = useOrder();

useEffect(() => {
    const token = localStorage.getItem("token");
    if(token === null) {
        window.location.href = "/login";
    }
    const methods = getAllPaymentMethods();
    setPaytmentMethods(methods);
}, []);

useEffect(() => {
    if (currentOrder) {
        setPaymentMethod(currentOrder.payment_method);
        const group = getPaymentMethodGroup(currentOrder.payment_method);
        if (group) {
            setOpenGroup(group);      
        }
    }
}, [currentOrder]);

const UpdateTransaction = () => {
    if (paymentMethod === "") {
        alert("Pilih Metode Pembayaran");
        return;
    }
    if (id) {
        const order_id = Array.isArray(id) ? id[0] : id;
        updateOrder({ order_id, payment_method: paymentMethod });
    }
};

useEffect(() => {
    if (status) {
        window.location.href = "/payment/"+id;
    }
}, [status,id]);

 return (
    <Authlayout title="Home" navType="home" withFooter={false} style={{paddingTop: "0"}} customHead={<Image alt="" src="/assets/process_choose_payment.svg" width={100} height={100} className="w-100" />}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="p-2 mt-4 block md:hidden">
                <Image alt="" src="/assets/process_choose_payment_mobile.svg" width={100} height={100} className="w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 ...">
                <div className="col-span-2 order-2 md:order-1">
                        <Card varian="md:mr-4 mt-4 py-6">
                        <TransactionNominal />
                    </Card>
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
                                    onClick={() => setPaymentMethod(method.key)}
                                    >
                                    <div className="flex items-center gap-3">
                                        <Image
                                        src={method.icon}
                                        width={100}
                                        height={100}
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
                        <ButtonPrimarySubmit onClick={UpdateTransaction} varian="w-full mt-4">Bayar Sekarang</ButtonPrimarySubmit>
                    </Card>
                </div>
                <div className="col-span-1 ... mx-2 sm:mx-0 order-1 lg:order-2">
                    {currentOrder && (
                        <ItemSpesification isDetail={true} data={currentOrder} facilities={classFacilities}/>
                    )}
                </div>
            </div>
        </div>
    </Authlayout>
 );
}

export default ChangePaymentPage