import { useEffect, useState } from "react";
import Authlayout from "@/components/Layouts/AuthLayout";
import CardItems from "@/components/Fragments/CardItems";
import { BannerContent } from "@/components/Fragments/Content";
import { Input, InputButton } from "@/components/Elements/input";
import { ButtonYellow } from "@/components/Elements/button";
import useClass from "@/hooks/useClass";
import { Card } from "@/components/Elements/card";
import { InfoIcon } from "lucide-react";
import { classCategoriesType } from "@/services/types";
import { useRouter } from "next/router";
// import { toast } from "react-toastify";

const HomePage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<number | null>(null);
    const category_id = activeTab === null ? null : activeTab;
    const { classData, classCategoriesData } = useClass({limit:9,category_id:category_id});

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push('/login');
            } else {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, [router]);
    if (isLoading) {
        return (
            <Authlayout title="Home" navType="home">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </Authlayout>
        );
    }

    return (
        <Authlayout title="Home" navType="home" withFooter={true}>
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <section className="banner-hero banner-space text-center">
                    <div className="banner-content">
                        <BannerContent 
                            title="Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video Interaktif!"
                            desc="Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan pemahaman Anda."
                        />
                        <button className="bg-green-500 mt-4 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer">Temukan Video Course untuk Dipelajari!</button>
                    </div>
                </section>

                <h3 className="text-2xl font-weigh-200 mt-4">Koleksi Video Pembelajaran Unggulan</h3>
                <p className="mt-2">Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
                <div className="overflow-x-auto mx-4">
                    <div className="flex space-x-6 whitespace-nowrap border-gray-200 mt-4 mx-4">
                        <button
                            key={""}
                            onClick={() => setActiveTab(null)}
                            className={`pb-2 font-medium text-sm md:text-base transition-all item-option ${
                            activeTab === null
                                ? "text-red-500 cursor-pointer active"
                                : "text-gray-700 hover:text-red-500 cursor-pointer"
                            }`}>Semua Kelas</button>
                        {classCategoriesData.length > 0 && classCategoriesData.map((tab:classCategoriesType) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-2 font-medium text-sm md:text-base transition-all item-option ${
                            activeTab === tab.id
                                ? "text-red-500 cursor-pointer active"
                                : "text-gray-700 hover:text-red-500 cursor-pointer"
                            }`}
                        >
                            {tab.name}
                        </button>
                        ))}
                    </div>
                </div>
                <div className={`grid grid-cols-1 md:grid-cols-3 ...`}>
                    {classData.length > 0 && classData.map((item) => (
                        <CardItems 
                            key={item.id} 
                            data={item} 
                        />
                    ))}
                    {classData.length == 0 &&  (
                    <Card varian="mx-2 md:col-span-3 w-full text-center text-gray-500">
                        <InfoIcon className="mx-auto"/>
                    Tidak ada data
                    </Card>
                    )}
                </div>
                <section className="banner-middle banner-space mt-4">
                    <div className="banner-content">
                        <h6>NEWSLETTER</h6>
                        <BannerContent 
                            title="Mau Belajar Lebih Banyak?"
                            desc="Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program-program terbaik harisenin.com"
                        />
                        <InputButton
                        name="email"
                        type="email"
                        placeholder="Masukkan Emailmu"
                        varian="display-web"
                        buttonLabel="Subscribe"
                        />
                        <div className="display-mobile">
                            <Input
                                name="email"
                                varian="bg-white text-gray-900 shadow-sm mt-4 mb-3"
                                type="email"
                                placeholder="Masukkan Emailmu"
                            />
                            <div className="d-grid gap-2">
                                <ButtonYellow 
                                    varian="mt-2">Subscribe
                                </ButtonYellow>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Authlayout>
    );
}

export default HomePage