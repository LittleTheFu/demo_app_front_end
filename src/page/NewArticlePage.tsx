import { Button, Divider, TextField } from "@material-ui/core";
import { createRef, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { createArticle, CreateArticleResponseData } from "../common/service";
import { getArticleUrl } from "../common/UrlHelper";
import { RichEditor } from "../component/RichEditor";

export const NewArticlePage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // const richEditorRef = useRef(null);
    const [textObjects, setTextObjects] = useState('');

    const history = useHistory();

    function handleSubmit(): void {
        // event.preventDefault();
        // console.log(content);

        createArticle(title, textObjects, (data: CreateArticleResponseData) => {
            console.log(data);
            history.push(getArticleUrl(data.data.id));
        });
        console.log(textObjects);
    }

    return (
        <div>
            {/* <form onSubmit={handleSubmit} noValidate autoComplete="off"> */}
                <TextField
                    multiline={true}
                    variant="outlined"
                    onChange={(e): void => setTitle(e.target.value)}
                />
                <Divider />
                <TextField
                    multiline={true}
                    variant="outlined"
                    onChange={(e): void => setContent(e.target.value)}
                />
                <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                onClick={handleSubmit}>
                    post
                </Button>
                <Divider />
                <RichEditor initValue={[]} onContentChange={(text)=> {setTextObjects(text)}} />
            {/* </form> */}
        </div>
    );
}