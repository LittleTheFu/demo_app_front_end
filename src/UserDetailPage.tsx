import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { followUser, getUserById, unfollowUser, UserDetail } from "./service";

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

    const FollowClick = (id: number): void => {
        if(userDetail.followed) {
            unfollowUser(id, (data) => {
                setUserDetail({...userDetail, ...data.data});
                console.log("unfollow clicked : " + id);
                console.log(data);
            })
        }
        else{
            followUser(id, (data) => {
                setUserDetail({...userDetail, ...data.data});
                console.log("follow clicked : " + id);
                console.log(data);
            })

        }
        
    }


    return (
        <div>
            <h1>{userDetail.name}</h1>
            <h1>{userDetail.id}</h1>
            <Button type="submit" variant="contained" color="secondary"
                onClick={() => { FollowClick(userDetail.id) }}>
                {userDetail.followed ? 'unfollow' : 'follow'}
            </Button>
        </div>
    );
}