import { Button, Divider, TextField } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Descendant } from "slate";
import { createArticle, ICreateArticleResponseData } from "../common/service";
import { getArticleUrl } from "../common/UrlHelper";
import { RichEditor } from "../component/RichEditor";

export const NewArticlePage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [richContent, setRichContent] = useState<Descendant[]>([
        {
            type: 'paragraph',
            children: [{
                text: 'A line of text in a paragraph.',
                bold: false,
                underline: false,
                italic: false,
            }],
        },
    ]);

    const [textObjects] = useState('');

    const history = useHistory();

    function handleSubmit(): void {
        const strContent = JSON.stringify(richContent);
        createArticle(title, strContent, (data: ICreateArticleResponseData) => {
            console.log(data);
            history.push(getArticleUrl(data.data.id));
        });
        console.log(textObjects);
    }

    return (
        <div>
            <TextField
                multiline={true}
                variant="outlined"
                onChange={(e): void => setTitle(e.target.value)}
            />
            <Divider />
          
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}>
                post
            </Button>

            <Divider />

            <RichEditor
                readonly={false}
                content={richContent}
                onContentChange={(content) => { setRichContent(content) }} />
        </div>
    );
}