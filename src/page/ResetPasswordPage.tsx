import { useState } from "react";
import { useParams } from "react-router-dom";
import { resetPassword } from "../common/service";
import { AccountInputCard } from "../component/AccountInputCard";

export const ResetPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { code } = useParams<{ code: string }>();

    const applyClick = () => {
        resetPassword(email, password, code, (data) => {
            console.log(data);
        });
    }

    return (
        <AccountInputCard
            code={code}
            email={email}
            password={password}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            applyClick={applyClick} />
    )
};