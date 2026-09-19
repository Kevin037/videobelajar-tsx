import InputForm from "@/components/Elements";
import { ButtonPrimarySubmit, ButtonSecondary, ButtonSpan } from "@/components/Elements/button";
import { Card } from "@/components/Elements/card";
import { HeadAuth } from "@/components/Fragments/Content";
import { FormEvent, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Formlogin = () => {
    const router = useRouter();
    const [email, setEmail] = useState('ksatria708@gmail.com');
    const [password, setPassword] = useState('11111111');
    
    const { user, loading, error, login } = useAuth();
  
    const HandleLogin = async (e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!email || !password) {
            toast.warning('Mohon isi email dan password');
            return;
        }
        await login({ email, password });
    };

    useEffect(() => {
        // If user is logged in, redirect to home
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    useEffect(() => {
        // Check if already logged in
        const token = localStorage.getItem("token");
        if (token) {
            router.push('/');
        }
    }, [router]);

    // Show error toast when error occurs
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    return (
        <div className="space p-10 overflow-sm-hidden">
            <Card varian={`max-w-sm mx-auto sm:px-6 lg:px-8`}>
                <HeadAuth 
                    title="Masuk ke Akun" 
                    desc="Yuk, lanjutin belajarmu di videobelajar."
                />
                <form onSubmit={HandleLogin}>
                    <InputForm label="Email" type="text" value={email} placeholder="email@gmail.com" name="email" onChange={e => setEmail(e.target.value)} />
                    <InputForm label="Password" type="password" value={password} placeholder="***" name="password" onChange={e => setPassword(e.target.value)} />
                    <div className="mb-4 text-right">
                        <a className="text-sm">Lupa Password ?</a>
                    </div>
                    <ButtonPrimarySubmit type="submit">{loading ? "Memuat..." : "Masuk"}</ButtonPrimarySubmit>
                    <ButtonSecondary url="/register" varian="mt-2">Daftar</ButtonSecondary>
                    <div className="separator mt-4 mb-4">atau</div>
                    <ButtonSpan type="submit" varian="hover:bg-gray-50">
                        <Image src="/assets/logos_google.svg" width={20} height={20} className="w-5 h-5" alt="Google" />
                        Daftar dengan Google
                    </ButtonSpan>
                </form>
            </Card>
        </div>
    )
}

export default Formlogin