import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { createArticle } from "./service";

export const NewArticlePage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        console.log(content);

        createArticle(title, content, (data) => {
            console.log(data);
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                    multiline={true}
                    variant="outlined"
                    onChange={(e): void => setTitle(e.target.value)}
                />
                <div>----------</div>
                <TextField
                    multiline={true}
                    variant="outlined"
                    onChange={(e): void => setContent(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" >
                    post
                </Button>
            </form>
        </div>
    );
}