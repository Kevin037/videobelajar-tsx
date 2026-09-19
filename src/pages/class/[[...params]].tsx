import { FormEvent, useEffect, useState } from "react";
import Authlayout from "@/components/Layouts/AuthLayout";
import { ChevronDown, ChevronUp } from "lucide-react";
// import { useParams } from "react-router-dom";
import ProgressPopover from "@/components/Fragments/Progress";
import useLesson from "@/hooks/useLesson";
import useOrder from "@/hooks/useOrder";
import { ucfirst } from "@/services/data";
import { ContentLessson } from "@/components/Fragments/LessonSegment";
import ModalReview from "@/components/Fragments/ModalReview";
import Image from "next/image";
import { useRouter } from "next/router";

const MyClassPage = () => {
    const router = useRouter();
    const params = router.query.params as string[] | undefined;
    const [idRaw, lessonId, noRaw, rules] = params || [];
    const id = Number(idRaw);
    const no = (noRaw) ? Number(noRaw) : null;

    const { currentOrder, orderLessons } = useOrder(id);
    const lesson_id = 
      (lessonId === "pre-test")
    ? orderLessons?.[0]?.lessons?.[0]?.id
    : lessonId === "quiz"
    ? no
    : lessonId ?? orderLessons?.[0]?.lessons?.[0]?.id;
    const { selectedLesson,beforeLesson,afterLesson } = useLesson(lesson_id);
    const { test, tests, resultData } = useLesson(null, null, null, no);
    const [isModalOpen, setModalOpen] = useState(false);
    const {completeModule,status} = useLesson()

useEffect(() => {
    const token = localStorage.getItem("token");
    if(token === null) {
        window.location.href = "/login";
    }
}, []);

const [openIndex, setOpenIndex] = useState<number | string | null>(null);
const [activeLesson, setActiveLesson] = useState<number | string | null>(null);
const [nextPage, setNextPage] = useState<number | null>(null);

useEffect(() => {
    if (selectedLesson) {
        const openIndexActive = (lessonId === "pre-test") ? lessonId : selectedLesson?.group_name;
        setOpenIndex(openIndexActive);
        let active = lesson_id;
        if (lessonId === "quiz") active = no;
        if (lessonId === "pre-test") active = lessonId;
        setActiveLesson(active);
    }
}, [orderLessons, selectedLesson, lessonId, no, lesson_id]);

const toggle = (index: string) => {
    setOpenIndex(openIndex === index ? "" : index);
};

const strLimit = (str: string, limit:number) => {
    if (!str) return "";
    return str.length > limit ? str.substring(0, limit) + "..." : str;
  };

const CompleteModule = (e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,key:number) => {
    if (selectedLesson?.status === "completed") {
        window.location.href = `/class/${id}/${key}`
        return false;
    }
    console.log(lessonId);
    
    setNextPage(key);
    e.preventDefault();
    if (confirm("Apakah anda yakin ingin menyelesaikan modul ini?")) {
        completeModule(lessonId);   
    }
};

useEffect(() => {
    if (status) {
        window.location.href = `/class/${id}/${nextPage}`
    }
  }, [status, nextPage, id]);

 return (
    <Authlayout 
        title="Home" 
        navType="home" 
        withFooter={false} 
        mainLayout={true} 
        customLogo={beforeLesson && (
            <a href={`/class/${id}/${beforeLesson?.id}`}><span className="text-xl">←</span> {strLimit(beforeLesson?.name, 30)}</a>
        )}
        customHead={<ProgressPopover id={currentOrder?.id} progress={currentOrder?.progress} completeModule={currentOrder?.totalCompletedModule} totalModule={currentOrder?.totalModule} />}
        userPhoto={true}
    >
        <div className="border-t border-gray-200 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-12 ...">
                <div className="col-span-1 md:col-span-8 ... sm:pb-0 md:pb-20">
                    <ContentLessson orderData={currentOrder} type={lessonId} classId={id} testNo={no} test={test} tests={tests} rules={rules} resultData={resultData} selectedLesson={selectedLesson}/>   
                </div>
                <div className="cols-span-1 flex flex-col block md:hidden my-8">
                    <div className={`left-0 w-full bg-green-600 text-white flex ${afterLesson && !beforeLesson ? "justify-end" : "justify-between"} items-center px-4 py-3 z-50`}>
                        {beforeLesson && (
                            <button className="flex items-center gap-2 hover:opacity-70 cursor-pointer" onClick={(e) => CompleteModule(e,beforeLesson?.id)}>
                                <span className="text-xl">←</span> Sebelumnya
                            </button>
                        )}
                        {afterLesson && (
                            <button className="flex items-right gap-2 hover:opacity-70 cursor-pointer" onClick={(e) => {CompleteModule(e,afterLesson?.id)}}>
                                Selanjutnya <span className="text-xl">→</span>
                            </button>
                        )}
                    </div>
                </div>
                <div className="col-span-1 md:col-span-4 ... border-l border-gray-300">
                    <div className="md:overflow-y-scroll md:h-130 pb-4 mb-15">
                    <a href={`/class/${id}/pre-test/${currentOrder?.pretestId}/rules`} className="flex items-center mb-4 mt-3">
                        <div
                        className={`justify-between w-full ${activeLesson === "pre-test" ? "bg-green-100" : "bg-white"} p-3 rounded-lg border border-gray-300 cursor-pointer hover:bg-green-50 mx-4`}
                        >
                            <div>
                                <div className="flex items-center gap-1">
                                    <Image src="/assets/lesson_test.svg" width={24} height={24} alt="Pre-test icon" className="w-6 h-6" />
                                    <span className="text-sm text-gray-800">pre-test: </span>
                                    Introduction to {currentOrder?.title}
                                </div>
                                <span className="text-sm text-gray-500 ml-6">10 Pertanyaan</span>
                            </div>
                        </div>
                    </a>
                    {orderLessons.length > 0 && activeLesson && orderLessons.map((section, index) => (
                        <div key={index} className="mb-4">
                        <button
                            onClick={() => toggle(section.title)}
                            className="w-full flex justify-between items-center font-semibold text-base focus:outline-none px-4 py-1"
                        >
                            <span className="hidden md:block">{section.title}</span>
                            <span className="block md:hidden">{strLimit(section.title, 35)}</span>
                            {openIndex === section.title ? (
                            <ChevronUp size={20} />
                            ) : (
                            <ChevronDown size={20} />
                            )}
                        </button>

                        {openIndex === section.title && section.lessons.length > 0 && (
                            <div className="mt-3 space-y-2">
                            {section.lessons.map((lesson, i) => (
                                <a key={i} href={(lesson.type === "quiz") ? `/class/${id}/quiz/${lesson.id}/rules` : `/class/${id}/${lesson.id}`} 
                                className="flex items-center">
                                <div
                                key={i}
                                className={`justify-between w-full ${Number(activeLesson) === lesson.id ? "bg-green-100" : "bg-white"} p-3 rounded-lg border border-gray-300 cursor-pointer hover:bg-green-50 mx-4`}
                                >
                                    <div>
                                        <div className="flex items-center gap-1">
                                            {lesson.type === "quiz" && <Image src="/assets/test.svg" width={24} height={24} alt="Quiz icon" className="w-6 h-6" />}
                                            {lesson.type === "video" ? (lesson.status === "completed") ? 
                                                (<Image src="/assets/completeModule.svg" width={24} height={24} alt="Complete icon" className="w-6 h-6" />) : 
                                                (<Image src="/assets/play.svg" width={24} height={24} alt="Play icon" className="w-6 h-6" />) : ""}
                                            {lesson.type === "rangkuman" && <Image src="/assets/rangkuman.svg" width={24} height={24} alt="Summary icon" className="w-6 h-6" />}
                                            <span className="text-sm text-gray-800">{ucfirst(lesson.type)}: </span>
                                            {(lesson.type === "video") ?lesson.name : lesson.group_name}
                                        </div>
                                        {lesson.duration && (
                                            <span className="text-sm text-gray-500 ml-6">{lesson.duration} menit</span>
                                        )}
                                    </div>
                                </div>
                                </a>
                            ))}
                            </div>
                        )}
                        </div>
                    ))}
                    </div>
                    <div className="fixed bottom-0 md:bottom-13 w-full bg-orange-400 p-4 mt-4 hover:opacity-80">
                        <button onClick={() => setModalOpen(true)} className="text-white flex gap-2">
                            <Image src="/assets/star.svg" width={24} height={24} alt="Rating icon" className="w-6 h-6" /> 
                            Beri Review & Rating
                        </button>
                    </div>
                </div>
                <ModalReview isOpen={isModalOpen} user_rating={currentOrder?.user_rating} onClose={() => setModalOpen(false)} id={currentOrder?.id} />
            </div>
            <div className="flex flex-col hidden md:block">
                <div className={`fixed bottom-0 left-0 w-full bg-green-600 text-white flex ${afterLesson && !beforeLesson ? "justify-end" : "justify-between"} items-center px-4 py-3 z-50`}>
                    {beforeLesson && (
                        <button className="flex items-center gap-2 hover:opacity-70 cursor-pointer" onClick={(e) => CompleteModule(e,beforeLesson?.id)}>
                            <span className="text-xl">←</span> {strLimit(beforeLesson?.name, 60)}
                        </button>
                    )}
                    {afterLesson && (
                        <button className="flex items-right gap-2 hover:opacity-70 cursor-pointer" onClick={(e) => {CompleteModule(e,afterLesson?.id)}}>
                            {strLimit(afterLesson?.name, 60)} <span className="text-xl">→</span>
                        </button>
                    )}
                    {!beforeLesson && !afterLesson && (<div className="flex items-center gap-2 text-xl text-green-600">..</div>)}
                </div>
            </div>
        </div>
    </Authlayout>
 );
}

export default MyClassPage