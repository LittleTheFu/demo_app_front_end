import { Button, Divider, IconButton, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import {
  getCurrentUser,
  updateName,
  uploadIcon,
  UserDetail,
} from "../common/service";
import { ControlPoint } from "@material-ui/icons";
import { UserHead } from "../component/UserHead";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserDetailPageUrl } from "../common/UrlHelper";
import {
  getCurrentUserId,
  setUserIconIntoCookie,
  setUserNameIntoCookie,
} from "../common/common";
import { openHint, setCurrentIcon, setCurrentName } from "../reducer/system/functions";

export const ProfilePage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(new Blob());
  const [userDetail, setUserDetail] = useState<UserDetail>(new UserDetail());
  const [userName, setUserName] = useState("");
  const [size, setSize] = useState(0);

  const MAX_SIZE = 1000 * 1024;

  useEffect(() => {
    getCurrentUser((userData) => {
      setUserDetail(userData.data);
      setUserName(userData.data.name);
      console.log(userData);
    });
  }, []);

  useEffect(() => {
    setSize(selectedFile.size);
  }, [selectedFile]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const strIcon = URL.createObjectURL(e.target.files[0]);

    setUserDetail({ ...userDetail, ...{ icon: strIcon } });
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = (): void => {
    if (!selectedFile) return;

    if (size > MAX_SIZE) {
      console.log("size > MAX_SIZE : " + size);
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    // let i = 0;
    // for (var pair of formData.entries()) {
    //     console.log(i++);
    //     console.log(pair);
    // }

    uploadIcon(formData, (data) => {
      console.log("上传成功 pre:");
      console.log(data);

      setCurrentIcon(dispatch, data.data.url);
      openHint(dispatch, "上传成功");

      setUserIconIntoCookie(data.data.url);
      console.log("上传成功 post:");
      console.log(data);
    });
  };

  const previewClick = (): void => {
    const id = getCurrentUserId();
    history.push(getUserDetailPageUrl(id));
  };

  const applyClick = (): void => {
    updateName(userName, (data) => {
      setUserDetail({ ...userDetail, name: userName });
      setCurrentName(dispatch,userName);
      setUserNameIntoCookie(userName);

      console.log(data);
    });
    console.log("apply click");
  };

  return (
    <div>
      <UserHead userName={userDetail.name} avatar={userDetail.icon}></UserHead>

      <IconButton component="label">
        <input
          accept="image/*"
          type="file"
          onChange={onSelectFile}
          style={{ display: "none" }}
        />
        <ControlPoint></ControlPoint>
      </IconButton>

      <Button
        variant="contained"
        color="primary"
        component="span"
        onClick={uploadFile}
      >
        OK
      </Button>

      <Divider />

      <TextField
        id="name"
        label="user"
        onChange={(e): void => setUserName(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={applyClick}
      >
        apply
      </Button>

      <Divider />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={previewClick}
      >
        preview
      </Button>
    </div>
  );
};
