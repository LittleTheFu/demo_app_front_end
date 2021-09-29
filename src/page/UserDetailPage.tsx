import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Tab,
  Tabs,
} from "@material-ui/core";
import { Mail } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getUserDetailPageUrl, getWriteNewMailUrl } from "../common/UrlHelper";
import { FollowerCard } from "../component/FollowerCard";
import {
  ArticleTitle,
  followUser,
  getFollowers,
  getFollowings,
  getUserById,
  getUserTitles,
  unfollowUser,
  UserDetail,
} from "../common/service";
import { UserHead } from "../component/UserHead";
import { Titles } from "../component/Titles";

export const UserDetailPage: React.FC = () => {
  const [userDetail, setUserDetail] = useState<UserDetail>(new UserDetail());
  const [followings, setFollowings] = useState<UserDetail[]>([]);
  const [followers, setFollowers] = useState<UserDetail[]>([]);
  const [titles, setTitles] = useState<ArticleTitle[]>([]);
  const [freshTitleFlag, setFreshTitleFlag] = useState(true);

  const [SelectTabValue, setSelectTabValue] = useState(0);
  const [FollowingDisplay, setFollowingDisplay] = useState("block");
  const [FollowersDisplay, setFollowersDisplay] = useState("none");
  const [TitlesDisplay, setTitlesDisplay] = useState("none");

  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getUserById(id, (userData) => {
      setUserDetail(userData.data);
      console.log(userData);
    });

    getFollowings(id, (data) => {
      console.log(data);
      setFollowings(data.data);
    });

    getFollowers(id, (data) => {
      console.log(data);
      setFollowers(data.data);
    });

    setFreshTitleFlag(!freshTitleFlag);
  }, [id]);

  useEffect(() => {
    if (SelectTabValue === 0) {
      setFollowingDisplay("block");
      setFollowersDisplay("none");
      setTitlesDisplay("none");
    } else if (SelectTabValue === 1) {
      setFollowingDisplay("none");
      setFollowersDisplay("block");
      setTitlesDisplay("none");
    } else {
      setFollowingDisplay("none");
      setFollowersDisplay("none");
      setTitlesDisplay("block");
    }
  }, [SelectTabValue]);

  const UpdateFollowFlag = (
    id: number,
    followFlag: boolean,
    src: UserDetail[],
    func: (value: React.SetStateAction<UserDetail[]>) => void
  ): void => {
    const new_src = src.map((f) => {
      if (f.id === id) {
        f.followed = followFlag;
      }

      return f;
    });
    func(new_src);
  };

  const CardFollowClick = (id: number): void => {
    followUser(id, (data) => {
      UpdateFollowFlag(id, true, followings, setFollowings);
      UpdateFollowFlag(id, true, followers, setFollowers);

      console.log(data);
    });
  };

  const CardUnfollowClick = (id: number): void => {
    unfollowUser(id, (data) => {
      UpdateFollowFlag(id, false, followings, setFollowings);
      UpdateFollowFlag(id, false, followers, setFollowers);

      console.log(data);
    });
  };

  const AvatarClick = (id: number): void => {
    history.push(getUserDetailPageUrl(id));
    console.log("Avatar click " + id);
  };

  const FollowClick = (id: number): void => {
    if (userDetail.followed) {
      unfollowUser(id, (data) => {
        setUserDetail({ ...userDetail, ...data.data });
        console.log("unfollow clicked : " + id);
        console.log(data);
      });
    } else {
      followUser(id, (data) => {
        setUserDetail({ ...userDetail, ...data.data });
        console.log("follow clicked : " + id);
        console.log(data);
      });
    }
  };

  const MailClick = (id: number, icon: string, name: string): void => {
    history.push({
      pathname: getWriteNewMailUrl(),
      state: { id: id, icon: icon, name: name },
    });
    console.log("Mail Click : ");
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectTabValue(newValue);
  };

  // const fetchTitleFunc = (
  //     page: number,
  //     resolve: (data: IPagedArticleTitle) => void,
  //     reject?: (data: Error) => void,
  // ): Promise<IPagedArticleTitle> => {
  //     return getUserTitles(id, page, resolve, reject);
  // }

  return (
    <div>
      <UserHead userName={userDetail.name} avatar={userDetail.icon}></UserHead>
      <h1>{userDetail.name}</h1>
      <h1>{userDetail.id}</h1>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        onClick={() => {
          FollowClick(userDetail.id);
        }}
      >
        {userDetail.followed ? "unfollow" : "follow"}
      </Button>
      <IconButton
        onClick={() => {
          MailClick(userDetail.id, userDetail.icon, userDetail.name);
        }}
      >
        <Mail />
      </IconButton>
      <Paper square>
        <Tabs
          value={SelectTabValue}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="关注了" />
          <Tab label="粉丝" />
          <Tab label="文章" />
        </Tabs>
      </Paper>
      <Box component="div" display={FollowingDisplay}>
        <h1>关注了:</h1>
        {followings.map((f, index) => {
          return (
            <FollowerCard
              user={f}
              key={index}
              followClick={() => CardFollowClick(f.id)}
              unfollowClick={() => CardUnfollowClick(f.id)}
              avatarClick={() => {
                AvatarClick(f.id);
              }}
            />
          );
        })}
      </Box>
      <Divider />
      <Box component="div" display={FollowersDisplay}>
        <h1>粉丝:</h1>
        {followers.map((f, index) => {
          return (
            <FollowerCard
              user={f}
              key={index}
              followClick={() => CardFollowClick(f.id)}
              unfollowClick={() => CardUnfollowClick(f.id)}
              avatarClick={() => {
                AvatarClick(f.id);
              }}
            />
          );
        })}
      </Box>
      <Divider />
      <Box component="div" display={TitlesDisplay}>
        <h1>文章:</h1>
        <Titles
          titles={titles}
          fetch={getUserTitles(id)}
          onFetched={setTitles}
          freshFlag={freshTitleFlag}
        />
      </Box>
    </div>
  );
};
