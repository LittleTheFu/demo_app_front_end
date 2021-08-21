import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { followUser, getCurrentUser, getUserById, unfollowUser, UserDetail } from "./service";
import { UserHead } from "./userHead";

export const ProfilePage: React.FC = () => {
    const [userDetail, setUserDetail] = useState<UserDetail>(new UserDetail());

    useEffect(() => {
        getCurrentUser(userData => {
            setUserDetail(userData.data);
            console.log(userData);
        });
    }, []);

    return (
        <div>
            <UserHead userName={userDetail.name} avatar={userDetail.icon}></UserHead>
        </div>
    );
}