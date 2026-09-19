import { useEffect, useState } from "react";
import { getSidebarMenus } from "@/services/data";
import { Card } from "@/components/Elements/card";
import Image from "next/image";
import { SidebarMenuItem, SidebarMenuProps } from "@/services/types";
import Link from "next/link";

export const SidebarMenu: React.FC<SidebarMenuProps> = (props) => {
    const {activeMenu} = props
    const [sidebarMenus, setSidebarMenus] = useState<SidebarMenuItem[]>([]);
    
    useEffect(() => {
        setSidebarMenus(getSidebarMenus());
    }, []);

    return (
        <Card varian="md:mr-4">
            {sidebarMenus.length > 0 && sidebarMenus.map((menu) => (
                <Link href={menu.url} key={menu.url}>
                    <div 
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                            activeMenu === menu.url
                                ? "bg-orange-50 text-orange-600"
                                : "hover:bg-gray-50"
                        }`}
                    >
                        <Image 
                            src={activeMenu === menu.url ? menu.activeIcon : menu.icon}
                            width={24}
                            height={24}
                            alt={menu.name}
                            className="w-6 h-6"
                        />
                        <span className="text-sm font-medium">{menu.name}</span>
                    </div>
                </Link>
            ))}
        </Card>
    )
}