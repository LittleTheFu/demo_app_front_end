import { Link } from "@material-ui/core";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { resetPassword } from "../common/service";
import { AccountInputCard } from "../component/AccountInputCard";

export const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);

  const { code } = useParams<{ code: string }>();

  const applyClick = () => {
    resetPassword(email, password, code, (data) => {
      setDone(true);
      console.log(data);
    });
  };

  return done ? (
    <div>
      <Link href="http://localhost:3000/login">
        <h3>done! go to login page</h3>
      </Link>
    </div>
  ) : (
    <AccountInputCard
      code={code}
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      applyClick={applyClick}
    />
  );
};
