import { Chip } from "@material-ui/core";

interface TagGroupProps {
    tags: string[];
    TagClick: (tag: string) => void;
    TagDeleteClick?: (tag: string) => void;
}

export const TagGroup: React.FC<TagGroupProps> = (props: TagGroupProps) => {
    const { tags, TagClick, TagDeleteClick } = props;

    return (
        <div>
            {
                tags.map((tag, index) => {
                    return <Chip
                        key={index}
                        label={tag}
                        clickable color="primary"
                        variant="outlined"
                        onClick={() => {
                            TagClick(tag)
                        }}
                        onDelete={
                            TagDeleteClick ?
                                () => { TagDeleteClick(tag) } :
                                undefined
                        }
                    />
                })
            }
        </div>
    )

};