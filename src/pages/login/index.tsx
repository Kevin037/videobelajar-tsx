import Formlogin from "@/components/Fragments/FormLogin";
import Authlayout from "@/components/Layouts/AuthLayout";

const LoginPage = () => {
    return (
        <Authlayout title="Login" navType="auth" userPhoto={false}>
            <Formlogin></Formlogin>
        </Authlayout>
    );
}

export default LoginPage