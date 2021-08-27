import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ContentCard } from "./ContentCard";
import { getMails, Mail } from "./service";

export const MailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [mails, setMails] = useState<Mail[]>([]);
    const history = useHistory();

    useEffect(() => {
        getMails((data => {
            setMails(data.data);
            console.log(data);
        }));
    }, [id]);

    const AuthorClick = (authorId: number): void => {
        history.push("/main/user/" + authorId);
        console.log("author clicked : " + authorId);
    }

    return <div>
        {mails.map((m, index) => {
            return (
                <ContentCard
                    key={index}
                    content={m.content}
                    username={m.authorName}
                    avatar={m.authorIcon}
                    authorClick={()=>{AuthorClick(m.id)}}
                    canBeDeleted={true}
                    deleteClick={() => { }} />);

        })}
    </div>;
};