import {  forwardRef,
  useEffect,
  useState,
  ForwardedRef,
  ChangeEvent} from "react";
import Label from "./label";
import { Input } from "./input";
import Image from "next/image";

type InputFormProps = {
  name: string;
  type: string;
  placeholder?: string;
  label?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

const InputForm = forwardRef<HTMLInputElement, InputFormProps>((props, ref: ForwardedRef<HTMLInputElement>) => {
    const [showPassword, setShowPassword] = useState(false);
    const {name,type,placeholder,label, onChange, value} = props
    const [typeValue,setTypeValue] = useState(type);
    useEffect(() => {
        if (name == "password") {
            if(showPassword){
                setTypeValue("text")
            }
            else{
                setTypeValue("password")
            }   
        }
    },[showPassword,name])
    return (
        <div className="mb-6 relative">
        <Label htmlfor="">{label}</Label>
        <Input name={name} type={typeValue} placeholder={placeholder} ref={ref} onChange={onChange} value={value}></Input>
        {type == "password" && <span className="absolute right-3 top-9 cursor-pointer text-gray-500" 
            onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? 
                <Image
                    alt="Your Company"
                    src='/assets/hide.png'
                    width={20}
                    height={20}
                    className="h-5 w-auto"
                /> : 
                <Image
                    alt="Your Company"
                    src='/assets/show.png'
                    width={20}
                    height={20}
                    className="h-5 w-auto"
                />}
            </span>}
        </div>
    )   
});

InputForm.displayName = "InputForm";

export default InputForm