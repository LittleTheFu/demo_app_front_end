import { Button, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { createMail } from "../service";
import { UserHead } from "../userHead";

interface stateType {
    id: number,
    icon: string,
    name: string,
}

export const NewMailPage: React.FC = () => {
    const [content, setContent] = useState('');
    const location = useLocation<stateType>();
    const { state } = location;

    useEffect(() => {
        console.log(location.pathname); // result: '/secondpage'
        console.log(state.id); // result: 'some_value'
        console.log(state.icon); // result: 'some_value'
    }, [location]);

    const SendClick = (): void => {
        createMail(state.id, content, (data) => {
            console.log(data);
        })
    }

    return (
        <div>
            <UserHead userName={state.name} avatar={state.icon} />
            <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                variant="outlined"
                onChange={(e): void => {
                    setContent(e.target.value);
                }}
            />
            <Button onClick={SendClick}
                type="submit"
                variant="contained"
                color="primary">
                reply
            </Button>
        </div>);
};