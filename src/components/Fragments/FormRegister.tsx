import { ButtonPrimarySubmit, ButtonSecondary, ButtonSpan } from "@/components/Elements/button";
import InputForm from "@/components/Elements";
import PhoneInputForm from "@/components/Elements/phone_input";
import { Card } from "@/components/Elements/card";
import { HeadAuth } from "@/components/Fragments/Content";
import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const FormRegister = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [no_hp, setNoHp] = useState('');
    
    const { currentUser, loading, error, register } = useUser();
  
    const validateForm = () => {
        if (!name || !email || !password || !confirmPassword || !no_hp) {
            toast.warning('Semua field harus diisi');
            return false;
        }
        
        if (password.length < 6) {
            toast.warning('Password minimal 6 karakter');
            return false;
        }

        if (password !== confirmPassword) {
            toast.warning('Password dan konfirmasi password tidak sama');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.warning('Format email tidak valid');
            return false;
        }

        const phoneRegex = /^[0-9]{10,13}$/;
        if (!phoneRegex.test(no_hp)) {
            toast.warning('Format nomor telepon tidak valid (10-13 digit)');
            return false;
        }

        return true;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            register({ name, email, password, no_hp });
        }
    };

    useEffect(() => {
        if (currentUser) {
            toast.success('Registrasi berhasil, harap verifikasi email anda', {
                autoClose: 5000, // Menampilkan toast lebih lama (5 detik)
                onClose: () => {
                    router.push("/login");
                }
            });
        }
    }, [currentUser, router]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    return (
    <div className="space p-10 overflow-sm-hidden">
            <Card varian={`max-w-xl mx-auto sm:px-6 lg:px-8`}>
            <HeadAuth 
                title="Pendaftaran Akun" 
                desc="Yuk, daftarkan akunmu sekarang juga!"
            />
            <form onSubmit={handleSubmit}>
                <InputForm 
                    label="Nama Lengkap *" 
                    type="text" 
                    placeholder="Masukkan nama lengkap" 
                    name="name" 
                    onChange={e => setName(e.target.value)} 
                />
                <InputForm 
                    label="Email *" 
                    type="email" 
                    placeholder="email@gmail.com" 
                    name="email" 
                    onChange={e => setEmail(e.target.value)} 
                />
                <PhoneInputForm 
                    label="No. Hp *" 
                    type="number" 
                    name="phone" 
                    onChange={e => setNoHp(e.target.value)} 
                />
                <InputForm 
                    label="Kata Sandi *" 
                    type="password" 
                    placeholder="Minimal 6 karakter" 
                    name="password" 
                    onChange={e => setPassword(e.target.value)} 
                />
                <InputForm 
                    label="Konfirmasi Kata Sandi *" 
                    type="password" 
                    placeholder="Masukkan ulang kata sandi" 
                    name="confirm_password" 
                    onChange={e => setConfirmPassword(e.target.value)} 
                />
                <ButtonPrimarySubmit type="submit">
                    {loading ? "Mendaftar..." : "Daftar"}
                </ButtonPrimarySubmit>
                <ButtonSecondary url="/login" varian="mt-2">Masuk</ButtonSecondary>
                <div className="separator mt-4 mb-4">atau</div>
                <ButtonSpan varian="hover:bg-gray-50">
                    <Image src="/assets/logos_google.svg" width={20} height={20} className="w-5 h-5" alt="Google" />
                    Daftar dengan Google
                </ButtonSpan>
            </form>
            </Card>
    </div>
    );
}

export default FormRegister;