import Authlayout from "@/components/Layouts/AuthLayout";
import FormRegister from "@/components/Fragments/FormRegister";

const RegisterPage = () => {
    return (
        <Authlayout title="Register" navType="auth">
            <FormRegister></FormRegister>
        </Authlayout>
    );
}

export default RegisterPage