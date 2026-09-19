import { ChangeEvent, useEffect, useState } from "react";
import useLesson from "@/hooks/useLesson";
import { json_to_array } from "@/services/data";
import { ArrowLeft, ArrowRight, Check} from "lucide-react";
import { H1 } from "@/components/Elements/heading";
import { ButtonPrimary, ButtonSecondary } from "@/components/Elements/button";
import ModalSubmitTest from "@/components/Fragments/ModalSubmitTest";
import { QuestionLessonProps } from "@/services/types";
import Link from "next/link";

export interface AnswerOption {
  key: string;
  value: string;
}

const QuestionLesson: React.FC<QuestionLessonProps> = (props) => {
    const {orderData,type,classId,testNo,test,tests} = props
    const [answerOptions, setAnswerOptions] = useState<AnswerOption[]>([]);
    const {updateAnswer} = useLesson();
    const [selectedOption, setSelectedOption] = useState(test?.user_answer);
    const [totalAnswer, setTotalAnswer] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        if (test?.options) {
            try {
                const parsed = JSON.parse(test.options);
                setAnswerOptions(json_to_array(parsed));
            } catch (e) {
                console.error("Failed to parse options JSON", e);
            }
        }
        setSelectedOption(test?.user_answer);
    },[test])

    useEffect(() => {
        if (tests.length > 0) {
            setTotalAnswer(tests.filter(item => item.user_answer != null).length);
        }
    },[tests])

    const SendAnswer = async (e: ChangeEvent<HTMLInputElement>, key: string) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedOption(key);
        await updateAnswer({id:testNo,answer:key});
        // Update total answered questions
        setTotalAnswer(prev => prev + (test?.user_answer ? 0 : 1));
    };
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-12 ...">
                <div className="col-span-1 md:col-span-4 ... sm:pb-0 md:pb-20 border-r p-4">
                <h1 className="font-bold mb-2">List Soal</h1>
                    <div className="grid grid-cols-10 ...">
                        {tests && tests.map((pretest) => (
                        <div className="col-span-2 ... p-2" key={pretest.id}>
                            <Link href={`/class/${classId}/${type}/${pretest.id}`} 
                            className={`border-1 p-2 w-8 h-8 flex items-center justify-center border-gray-300 border-radius
                            ${pretest.user_answer != "" ? "bg-green-50 text-green-900 font-bold" : ""} ${pretest.id == testNo ? "bg-green-200 text-green-800" : ""}`}>{pretest.no}</Link>
                        </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-1 md:col-span-8 ... sm:pb-0 md:pb-20 p-4 border-t-1 border-gray-300 md:border-t-0">
                    <H1>Pertanyaan {test?.no}</H1>
                    <p className="my-2">{test?.question}</p>
                    <div>
                          {answerOptions.map((option) => (
                            <label
                            key={option.key}
                            className={`flex items-center p-4 border rounded cursor-pointer transition duration-300 my-2 ${
                                selectedOption === option.key
                                ? "border-green-500 bg-green-50 text-green-600"
                                : "border-gray-300"
                            }`}
                            >
                            <input
                                type="radio"
                                name="custom-radio"
                                value={option.value}
                                checked={selectedOption === option.key}
                                onChange={(e) =>  SendAnswer(e,option.key)}
                                className="accent-green-500 mr-3"
                            />
                            <span className="text-sm">{option.value}</span>
                            </label>
                        ))}
                    </div>
                    {tests.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mt-8">
                            <div className="col-span-1">
                                {test?.no && test?.no > 1 && (
                                <ButtonSecondary varian="w-full flex justify-center gap-2" url={`/class/${classId}/${type}/${tests[Number(Number(test.no)-2)].id}`}>                        
                                    <ArrowLeft/>
                                    <span className="text-sm font-medium">Sebelumnya</span>
                                </ButtonSecondary>   
                                )}
                            </div>
                            <div className="col-span-1">
                                {test?.no && test?.no < tests.length ? (
                                <ButtonPrimary varian=" flex justify-center gap-2" url={`/class/${classId}/${type}/${tests[Number(Number(test.no))].id}`}>
                                    <span className="text-sm font-medium">Selanjutnya</span>
                                    <ArrowRight />
                                </ButtonPrimary>
                                ) : (
                                    <>
                                    {orderData && (
                                        <>
                                        <ButtonPrimary varian=" flex justify-center gap-2" onClick={() => setModalOpen(true)}>
                                            <span className="text-sm font-medium">Submit</span>
                                            <Check />
                                        </ButtonPrimary>
                                        <ModalSubmitTest 
                                            isOpen={isModalOpen} 
                                            onClose={() => setModalOpen(false)} 
                                            testNo={testNo} 
                                            totalQuestions={answerOptions.length} 
                                            totalAnswer={totalAnswer}
                                            orderId={orderData.id}
                                            type={type}
                                            setModalOpen={setModalOpen}
                                            />
                                        </>
                                    )}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default QuestionLesson