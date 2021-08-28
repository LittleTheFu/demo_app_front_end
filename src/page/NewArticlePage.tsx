import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createArticle, CreateArticleResponseData } from "../service";

export const NewArticlePage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const history = useHistory();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        console.log(content);

        createArticle(title, content, (data: CreateArticleResponseData) => {
            console.log(data);
            history.push("/main/article/" + data.data.id);
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