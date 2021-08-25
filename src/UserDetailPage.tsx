import { Button, Divider } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FollowerCard } from "./followerCard";
import { followUser, getFollowers, getFollowings, getUserById, unfollowUser, UserDetail } from "./service";
import { UserHead } from "./userHead";

export const UserDetailPage: React.FC = () => {
    const [userDetail, setUserDetail] = useState<UserDetail>(new UserDetail());
    const [followings, setFollowings] = useState<UserDetail[]>([]);
    const [followers, setFollowers] = useState<UserDetail[]>([]);

    const history = useHistory();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        getUserById(id, userData => {
            // console.log('article');
            // console.log(article);
            setUserDetail(userData.data);
            console.log(userData);
        });

        getFollowings(id, (data) => {
            console.log(data);
            setFollowings(data.data);
        })

        getFollowers(id, (data) => {
            console.log(data);
            setFollowers(data.data);
        })
    }, [id]);

    const UpdateFollowFlag =
        (id: number,
            followFlag: boolean,
            src: UserDetail[],
            func: (value: React.SetStateAction<UserDetail[]>) => void): void => {

            const new_src = src.map((f) => {
                if (f.id == id) {
                    f.followed = followFlag;
                }

                return f;
            });
            func(new_src);
        }

    const CardFollowClick = (id: number): void => {
        followUser(id, (data) => {

            UpdateFollowFlag(id, true, followings, setFollowings);
            UpdateFollowFlag(id, true, followers, setFollowers);

            console.log(data);
        });
    }

    const CardUnfollowClick = (id: number): void => {
        unfollowUser(id, (data) => {

            UpdateFollowFlag(id, false, followings, setFollowings);
            UpdateFollowFlag(id, false, followers, setFollowers);

            console.log(data);
        });
    }

    const AvatarClick = (id: number): void => {
        history.push("/main/user/" + id);
        console.log("Avatar click " + id);
    }

    const FollowClick = (id: number): void => {
        if (userDetail.followed) {
            unfollowUser(id, (data) => {
                setUserDetail({ ...userDetail, ...data.data });
                console.log("unfollow clicked : " + id);
                console.log(data);
            })
        }
        else {
            followUser(id, (data) => {
                setUserDetail({ ...userDetail, ...data.data });
                console.log("follow clicked : " + id);
                console.log(data);
            })
        }
    }

    return (
        <div>
            <UserHead userName={userDetail.name} avatar={userDetail.icon}></UserHead>
            <h1>{userDetail.name}</h1>
            <h1>{userDetail.id}</h1>
            <Button type="submit" variant="contained" color="secondary"
                onClick={() => { FollowClick(userDetail.id) }}>
                {userDetail.followed ? 'unfollow' : 'follow'}
            </Button>
            <Divider />
            <h1>关注了:</h1>
            {followings.map((f, index) => {
                return <FollowerCard user={f} key={index}
                    followClick={() => CardFollowClick(f.id)}
                    unfollowClick={() => CardUnfollowClick(f.id)}
                    avatarClick={() => { AvatarClick(f.id) }} />
            })}
            <Divider />
            <h1>粉丝:</h1>
            {followers.map((f, index) => {
                return <FollowerCard user={f} key={index}
                    followClick={() => CardFollowClick(f.id)}
                    unfollowClick={() => CardUnfollowClick(f.id)}
                    avatarClick={() => { AvatarClick(f.id) }} />
            })}
        </div>
    );
}
