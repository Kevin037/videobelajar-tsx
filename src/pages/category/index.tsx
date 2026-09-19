import { useEffect, useRef, useState } from "react";
import Authlayout from "@/components/Layouts/AuthLayout";
import { getDurationFilters, getOrderingFilters, getPriceFilters } from "@/services/data";
import { Card } from "@/components/Elements/card";
import { H1 } from "@/components/Elements/heading";
import { Pagination } from "@/components/Fragments/Pagination";
import useClass from "@/hooks/useClass";
import CardItems from "@/components/Fragments/CardItems";
import { FilterSection } from "@/components/Fragments/FilterSection";
import { InputIcon, Select } from "@/components/Elements/input";
import Image from "next/image";
import { classDateItem, FilterProps } from "@/services/types";

const CategoryPage = () => {

    // Filter
    const [category_id, setClassType] = useState<number | null>(null);
    const [priceFilter, setPriceFilter] = useState<number | null>(null);
    const [durationFilter, setDurationFilter] = useState<number | null>(null);
    const [search, setKeyword] = useState("");
    const [ordering, setOrdering] = useState<string | null>(null);
    const { classData, classCategoriesData } = useClass({id:null,limit:0,category_id, price: priceFilter, duration:durationFilter, search, order_by:ordering});
    // Filter

    const [durationFilters, setDurationFilters] = useState<FilterProps[]>([]);
    const [priceFilters, setPriceFilters ] = useState<FilterProps[]>([]);
    const [orderingFilters, setorderingFilters] = useState<FilterProps[]>([]);
    const keywordRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token === null) {
            window.location.href = "/login";
        }
        setDurationFilters(getDurationFilters());
        setPriceFilters(getPriceFilters());
        setorderingFilters(getOrderingFilters());
    }, []);

    const resetFilter = () => {
        window.location.reload();
    }
 return (
    <Authlayout title="Home" navType="home" withFooter={true}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <H1>Koleksi Video Pembelajaran Unggulan</H1>
            <div className="grid grid-cols-1 md:grid-cols-12 ...">
                <div className="col-span-4 ...">
                    <p className="text-sm text-gray-400">Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
                    <Card varian="md:mr-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-gray-800">Filter</h2>
                            <button className="text-sm text-red-500 cursor-pointer" onClick={resetFilter}>Reset</button>
                        </div>
                        <FilterSection
                            title={<span className="flex items-center gap-2">
                                    <Image src="/assets/bidang_filter.svg" width={20} height={20} alt="" /> Bidang Studi
                                    </span>}
                            name="ClassType"
                            options={classCategoriesData}
                            onChange={e => setClassType(Number(e.target.value))}
                        />
                        <FilterSection
                            title={<span className="flex items-center gap-2">
                                <Image src="/assets/price_filter.svg" width={20} height={20} alt="" /> Harga
                                </span>}
                            name="price"
                            options={priceFilters}
                            onChange={e => setPriceFilter(Number(e.target.value))}
                        />
                        <FilterSection
                            title={<span className="flex items-center gap-2">
                                <Image src="/assets/duration_filter.svg" width={20} height={20} alt="" /> Durasi
                                </span>}
                            name="duration"
                            options={durationFilters}
                            onChange={e => setDurationFilter(Number(e.target.value))}
                        />
                    </Card>
                </div>
                <div className="col-span-8 ... mx-2 sm:mx-0">
                    <div className="flex mb-4 justify-end">
                        <Select className="bg-white mr-2 border-gray-200 md:mt-0 mt-4" onChange={e => setOrdering(e.target.value)} responsive={true}>
                            <option value="" disabled selected>Urutkan</option>
                            {orderingFilters?.length > 0 && orderingFilters.map((ordering) => (
                                <option value={ordering.id} key={ordering.id}>{ordering.name}</option>
                            ))}
                        </Select>
                        <InputIcon 
                        name="search" 
                        type="text" 
                        placeholder="Cari Kelas" 
                        varian="bg-white mr-2 border-gray-200 md:mt-0 mt-4 " 
                        icon="search.svg" 
                        responsive={true}
                        onChange={(e) => setKeyword(e.target.value)}
                        value={search}
                        ref={keywordRef}>
                        </InputIcon>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 ...">
                        {classData.length > 0 && classData.map((item:classDateItem) => (
                            <CardItems 
                                key={item.id} 
                                data={item} 
                            />
                        ))}
                    </div>
                    {classData.length > 0 && (
                        <Pagination />
                    )}
                </div>
            </div>
        </div>
    </Authlayout>
 );
}

export default CategoryPage