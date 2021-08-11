import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById, UserDetail } from "./service";

export const UserDetailPage: React.FC = () => {
    const [userDetail, setUserDetail] = useState<UserDetail>(new UserDetail());
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        getUserById(id, userData => {
            // console.log('article');
            // console.log(article);
            setUserDetail(userData.data);
        });
    }, []);


    return (
        <div>
            <h1>{userDetail.name}</h1>
            <h1>{userDetail.id}</h1>
        </div>
    );
}
