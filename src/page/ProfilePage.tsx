import { Button, IconButton } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getCurrentUser, uploadIcon, UserDetail } from "../service";
import { ControlPoint } from "@material-ui/icons";
import { UserHead } from "../component/UserHead";

export const ProfilePage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState(new Blob);
    const [userDetail, setUserDetail] = useState<UserDetail>(new UserDetail());
    const [size, setSize] = useState(0);

    const MAX_SIZE = 1000 * 1024;

    useEffect(() => {
        getCurrentUser(userData => {
            setUserDetail(userData.data);
            console.log(userData);
        });
    }, []);

    useEffect(() => {
        // if (!selectedFile) {
        // setPreview(undefined);
        // return;
        // }

        setSize(selectedFile.size);
        // const objectUrl = URL.createObjectURL(selectedFile);
        // setPreview(objectUrl);

        // return (): void => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (!e.target.files || e.target.files.length === 0) {
            // setSelectedFile(undefined);
            return;
        }

        const strIcon = URL.createObjectURL(e.target.files[0]);
        // console.log(strIcon); 

        setUserDetail({ ...userDetail, ...{ icon: strIcon } });
        setSelectedFile(e.target.files[0]);
    };

    const uploadFile = (): void => {
        if (!selectedFile) return;

        if (size > MAX_SIZE) {
            console.log('size > MAX_SIZE : ' + size);
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        // let i = 0;
        // for (var pair of formData.entries()) {
        //     console.log(i++);
        //     console.log(pair); 
        // }


        uploadIcon(formData, (data) => {
            console.log(data);
        })
    };

    return (
        <div>
            <UserHead userName={userDetail.name} avatar={userDetail.icon}></UserHead>

            <IconButton component="label">
                <input
                    accept="image/*"
                    type="file"
                    onChange={onSelectFile}
                    style={{ display: 'none' }}
                />
                <ControlPoint></ControlPoint>
            </IconButton>

            <Button variant="contained" color="primary" component="span" onClick={uploadFile}>
                OK
            </Button>

        </div>
    );
}