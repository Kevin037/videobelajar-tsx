import { useEffect } from "react";
import { ButtonPrimary, ButtonWhite } from "@/components/Elements/button";
import Modal from "@/components/Elements/Modal";
import useLesson from "@/hooks/useLesson";
import Image from "next/image";
import { ModalProps } from "@/services/types";

export default function ModalSubmitTest({ isOpen, onClose, totalAnswer, totalQuestions, testNo, orderId, type, setModalOpen }: ModalProps) {
  const {submitTest,submitStatus} = useLesson();

  const SubmitTest = () => {
    if (totalAnswer != totalQuestions) {
        alert("Jawaban belum lengkap");
        setModalOpen(false);
        return false;
    }
      submitTest(testNo);
  };
  useEffect(() => {
    if (submitStatus) {
        window.location.href = `/class/${orderId}/${type}/${testNo}/result`
    }
  }, [submitStatus,orderId,type,testNo]);
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <>
        <Image src="/assets/submitTest.svg" width={400} height={50} alt="" className="mx-auto" />
        <p className="text-center mb-4">
          Apakah kamu yakin untuk menyelesaikan pretest ini?
        </p>
        {/* BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <ButtonWhite onClick={onClose} varian="cursor-pointer">
            Batal
          </ButtonWhite>
          <ButtonPrimary varian="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer" onClick={() => SubmitTest()}>
            Selesai
          </ButtonPrimary>
        </div>
      </>
    </Modal>
  );
}
