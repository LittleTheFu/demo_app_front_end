import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMails, Mail } from "./service";
import { UserHead } from "./userHead";

export const MailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [mails, setMails] = useState<Mail[]>([]);

    useEffect(() => {
        getMails((data => {
            setMails(data.data);
            console.log(data);
        }));
    }, [id]);

    return <div>
        {mails.map((m, index) => {
            return <h1 key={index}>
                <UserHead userName={m.authorName} avatar={m.authorIcon} />
                {m.content}
            </h1>
        })}
    </div>;
};