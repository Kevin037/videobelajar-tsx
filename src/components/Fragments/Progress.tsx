import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { ButtonDisabled } from "@/components/Elements/button";
import Image from "next/image";
import { ProgressProps } from "@/services/types";

const ProgressPopover: React.FC<ProgressProps> = (props) => {
  const { id, progress, completeModule, totalModule } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative inline-block">
      {/* Trigger */}
      <div
        className="cursor-pointer flex items-center space-x-2 text-green-600 hover:opacity-80 mr-7 sm:mr-0"
        onClick={() => setIsOpen(!isOpen)}
      >
        {progress == 100 ? (
          <div className="flex items-center space-x-2 border border-green-300 rounded-lg p-2">
            <Image src="/assets/champion.svg" width={20} height={20} alt="" />
            <p className="hidden sm:block">Ambil Serttifikat</p>
          </div>
        ) : (
          <>
            <div className="w-32 h-2 bg-gray-200 rounded-full hidden sm:block">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-medium">{progress}%</span>
          </>
        )}
        <ChevronDown size={20} />
      </div>

      {/* Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl p-4 z-50">
          <h3 className="font-semibold text-sm mb-1">{progress != 100 ? progress+"%" : ""} Modul {progress != 100 ? "telah" : "sudah"} selesai</h3>
          <p className="text-sm text-gray-500 mb-3">
            {progress != 100 ? "Selesaikan Semua Modul Untuk Mendapatkan Sertifikat" : `${completeModule} dari ${totalModule} modul telah selesai, silahkan download sertifikat`}
          </p>
          <ButtonDisabled 
          varian={`${progress != 100 ? "bg-gray-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`} 
          url={`${progress != 100 ? "#" : `/certificate/${id}`}`}>Ambil Sertifikat</ButtonDisabled>
        </div>
      )}
    </div>
  );
};

export default ProgressPopover;
