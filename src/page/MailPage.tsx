import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getUserDetailPageUrl, getWriteNewMailUrl } from "../common/UrlHelper";
import { ContentCard } from "../ContentCard";
import { deleteMail, getMails, Mail } from "../service";

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
        history.push(getUserDetailPageUrl(authorId));
        console.log("author clicked : " + authorId);
    }

    const MailClick = (authorId: number,
        authorName: string,
        authorIcon: string): void => {
        history.push({
            pathname: getWriteNewMailUrl(),
            state: { id: authorId, icon: authorIcon, name: authorName },
        });
    }

    const DeleteClick = (id: number) => {
        deleteMail(id, data=> {
            const newMails = mails.filter((m) => {
                return m.id != id;
            });
            setMails(newMails);
            console.log(data);
        });
        console.log('mail delete : ' + id);
    }

    return <div>
        {mails.map((m, index) => {
            return (
                <ContentCard
                    key={index}
                    content={m.content}
                    username={m.authorName}
                    avatar={m.authorIcon}
                    authorClick={() => { AuthorClick(m.id) }}
                    canBeDeleted={true}
                    mailClick={() => { MailClick(m.mailFromId, m.authorName, m.authorIcon) }}
                    deleteClick={() => { DeleteClick(m.id) }} />);

        })}
    </div>;
};