import VideoPlayer from "@/components/Fragments/Video";
import { H1 } from "@/components/Elements/heading";
import { ButtonPrimaryMD, ButtonWhiteMD } from "@/components/Elements/button";
import QuestionLesson from "@/components/Fragments/QuestionSegment";
import { ucfirst } from "@/services/data";
import TestResult from "@/components/Fragments/ResultTestSegment";
import Image from "next/image";
import { ContentLessonProps, TestLessonProps, VideoLesssonProps } from "@/services/types";

export const ContentLessson: React.FC<ContentLessonProps> = (props) => {
    const {orderData,type,classId,testNo,test,tests,rules,resultData,selectedLesson} = props
    return (
        <>
        {testNo != null ? (
            testNo === "result" ? (
                <TestResult type={type} classId={classId} testNo={testNo} test={test} tests={tests} resultData={resultData} />
            ) : (rules === "rules" || rules === "result") ? (rules === "rules") ? (
                <TestLesson type={type} classId={classId} testNo={testNo} />
            ) : (
                <TestResult type={type} classId={classId} testNo={testNo} test={test} tests={tests} resultData={resultData} />
            ) : (
                <QuestionLesson orderData={orderData} type={type} classId={classId} testNo={testNo} test={test} tests={tests} />
            )
        ) : ['pre-test'].includes(type) ? (
                    <TestLesson type={type} classId={classId} />
                ) : (
            <VideoLessson orderData={orderData} selectedLesson={selectedLesson} />
        )}
        </>
    )
}

export const VideoLessson: React.FC<VideoLesssonProps> = (props) => {
    const {orderData,selectedLesson} = props
    return (
        <>
            <VideoPlayer />
            {selectedLesson?.type === "rangkuman" && (
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-4">
                <H1>Download Rangkuman Modul</H1>
                <p className="text-gray-500">Silakan download rangkuman modul dari materi yang telah kamu pelajari</p>
                <ButtonWhiteMD url="" varian="mt-4">
                <div className="flex gap-2 justify-center">
                    <Image 
                        src="/assets/download.svg" 
                        width={20} 
                        height={20} 
                        alt="Download icon"
                        className="w-5 h-5"
                    />
                    <span>Download Rangkuman</span>
                </div>
                </ButtonWhiteMD>
            </div>
            )}
            {selectedLesson?.type === "video" && (
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-4">
                <H1>Praktikkan Skill dengan Technical Book</H1>
                <p>Pelajari dan praktikkan skill teknis dalam berbagai industri dengan Technical Book Riselearn</p>
                <div className="my-2 grid grid-cols-3 grid-cols-12 ...">
                    <div className="col-span-1 ...">
                        {orderData?.tutor_photo ? (
                            <Image 
                                src={orderData.tutor_photo.startsWith('http') ? orderData.tutor_photo : `/assets/${orderData.tutor_photo}`}
                                width={50} 
                                height={50} 
                                alt="Tutor photo"
                                className="w-[50px] h-[50px] rounded-full object-cover"
                            />
                        ) : (
                            <Image 
                                src="/assets/default-user.jpg"
                                width={50} 
                                height={50} 
                                alt="Default tutor photo"
                                className="w-[50px] h-[50px] rounded-full object-cover"
                            />
                        )}
                    </div>
                    <div className="text-sm col-span-11 ...">
                        <p><b>{orderData?.user}</b></p>
                        <p>{orderData?.user_position} di {orderData?.tutor_company}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Image 
                        src="/assets/rating.svg" 
                        width={100} 
                        height={100} 
                        alt="Rating icon"
                    />
                    <p>{orderData?.rating} ({orderData?.total_selling})</p>
                </div>
            </div>
            )}
        </>
    )
}

export const TestLesson: React.FC<TestLessonProps> = (props) => {
    const {type,classId,testNo} = props
    return (
        <>
            <div className="relative w-full h-64 flex items-center justify-center">
                <Image 
                    src="/assets/rules.svg" 
                    width={400}
                    height={256}
                    alt="Test rules illustration" 
                    className="w-auto h-full object-contain"
                    priority
                />
            </div>
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-4">
                <H1>Aturan</H1>
                <p className="my-2">Kerjakan {type} dengan sebaik mungkin untuk mengukur pemahaman awalmu terkait materi yang akan kamu pelajari</p>
                <p className="my-2">Syarat Nilai Kelulusan: - <br />Durasi Ujian: 5 Menit</p>
                <p className="my-2">Jangan khawatir, total skor tidak akan memengaruhi kelulusan dan penilaian akhirmu dalam rangkaian kelas ini</p>
                <ButtonPrimaryMD url={`/class/${classId}/${type}/${testNo}`} varian="mt-4 text-center">Mulai {ucfirst(type)}</ButtonPrimaryMD>
            </div>
        </>
    )
}