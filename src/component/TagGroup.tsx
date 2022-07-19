import { Box, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface TagGroupProps {
  tags: string[];
  TagClick: (tag: string) => void;
  TagDeleteClick?: (tag: string) => void;
}

const useStyles = makeStyles({
    chip: {
      padding: 4,
      display: 'inline-flex',
    },
  });

export const TagGroup: React.FC<TagGroupProps> = (props: TagGroupProps) => {
  const { tags, TagClick, TagDeleteClick } = props;
  const classes = useStyles();

  return (
      <Box sx={{ flexDirection: 'row-reverse' }}>
      {tags.map((tag, index) => {
        return (
          <Box className={classes.chip} key={index}>
            <Chip
              label={tag}
              clickable
              color="primary"
              variant="outlined"
              onClick={() => {
                TagClick(tag);
              }}
              onDelete={
                TagDeleteClick
                  ? () => {
                      TagDeleteClick(tag);
                    }
                  : undefined
              }
            />
            </Box>
        );
      })}
      </Box>
  );
};
