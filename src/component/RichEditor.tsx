import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  createEditor,
  Descendant,
  Editor,
  Transforms,
} from "slate";

import { Slate, Editable, withReact, ReactEditor, RenderElementProps } from "slate-react";
import { BaseEditor } from "slate";
import {
  Box,
  IconButton,
  makeStyles,
  createStyles,
  Divider,
} from "@material-ui/core";
import {
  CropOriginal,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
} from "@material-ui/icons";
import { uploadImage } from "../common/service";
// import isUrl from "is-url";
// import imageExtensions from "image-extensions";

type EmptyText = {
  text: string;
};

// type CustomElement = { type: 'paragraph' | 'code'; children: CustomText[] }
type ParagraphElement = {
  type: "paragraph";
  children: CustomText[];
};

type CodeElement = {
  type: "code";
  children: EmptyText[];
};

type CustomImageElement = { type: "image"; url: string; children: EmptyText[] };
type CustomElement = ParagraphElement | CodeElement | CustomImageElement;
type CustomText = {
  text: string;
  bold: boolean;
  underline: boolean;
  italic: boolean;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement | CustomElement[];
    Text: CustomText;
  }
}

interface EditCardProps {
  onContentChange: (content: Descendant[]) => void;
  content: Descendant[];
  readonly: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    tool: {
      // border: '1px solid #000',
    },
    editor: {
      // height: 300,
      width: "80%",
      // height: 800,
      margin: "auto",
      border: "1px solid #000",
      // overflow: "hidden",
    },
    content: {
      margin: "30px",
      overflow: "hidden",
    }
  })
);

// const isImageUrl = (url: string) => {
//   if (!url) return false;
//   if (!isUrl(url)) return false;
//   const ext = new URL(url).pathname.split(".").pop();
//   if (!ext) return false;
//   return imageExtensions.includes(ext);
// };

const withImages = (editor: BaseEditor & ReactEditor) => {
  // const { insertData, isVoid } = editor;
  const { isVoid } = editor;

  editor.isVoid = (element) => {
    if (Array.isArray(element)) {
      return false;
    }
    return element.type === "image" ? true : isVoid(element);
  };

  // editor.insertData = (data) => {
  //   const text = data.getData("text/plain");
  //   const { files } = data;

  //   if (files && files.length > 0) {
  //     for (let i = 0; i < files.length; i++) {
  //       const reader = new FileReader();
  //       const [mime] = files[i].type.split("/");

  //       if (mime === "image") {
  //         reader.addEventListener("load", () => {
  //           const url = reader.result as string;
  //           insertImage(editor, url);
  //         });

  //         reader.readAsDataURL(files[i]);
  //       }
  //     }
  //   } else if (isImageUrl(text)) {
  //     insertImage(editor, text);
  //   } else {
  //     insertData(data);
  //   }
  // };

  return editor;
};

const insertImage = (editor: BaseEditor & ReactEditor, url: string) => {
  const text = { text: "" };
  // const blank = {text: "---"};
  const image: CustomImageElement = { type: "image", url, children: [text] };

  Transforms.insertNodes(editor, image);
};

const insertParagraph = (editor: BaseEditor & ReactEditor, text: string) => {
  const paragraph: ParagraphElement = {
    type: "paragraph",
    children: [{
      text: text,
      bold: false,
      underline: false,
      italic: false,
    },
    ],
  };
  Transforms.insertNodes(editor, paragraph);
};

export const RichEditor: React.FC<EditCardProps> = (props: EditCardProps) => {
  const [returnUrl, setReturnUrl] = useState("");

  const classes = useStyles({});

  const editor = useMemo(() => withImages(withReact(createEditor())), []);
  // const editor = useMemo(() => withReact(createEditor()), []);

  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  useEffect(() => {
    if (returnUrl === "") {
      return;
    }

    insertImage(editor, returnUrl);
    insertParagraph(editor, "");
  }, [returnUrl]);

  // Define a React component renderer for our code blocks.
  const CodeElement = (props: {
    attributes: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLPreElement> &
    React.HTMLAttributes<HTMLPreElement>;
    children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  }) => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    );
  };

  const ImageElement = (props: {
    attributes: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLParagraphElement> &
    React.HTMLAttributes<HTMLParagraphElement>;
    children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
    element: CustomImageElement;
  }) => {
    return (
      <div>
        <div {...props.attributes}>
          <div contentEditable={false}>
            <img draggable={false} alt="pic" src={props.element.url} />
          </div>
          {props.children}
        </div>
      </div>
    );
  };

  const DefaultElement = (props: RenderElementProps) => {
    return <p {...props.attributes}>{props.children}</p>
  }

  // const DefaultElement = (props: {
  //   attributes: JSX.IntrinsicAttributes &
  //   React.ClassAttributes<HTMLParagraphElement> &
  //   React.HTMLAttributes<HTMLParagraphElement>;
  //   children:
  //   | boolean
  //   | React.ReactChild
  //   | React.ReactFragment
  //   | React.ReactPortal
  //   | null
  //   | undefined;
  // }) => {
  //   return <p {...props.attributes}>{props.children}</p>;
  // };

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      case "image":
        return <ImageElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const btnClick = (editor: Editor): void => {
    const marks = Editor.marks(editor);
    console.log("marks");
    console.log(marks);
    let mark = false;
    if (marks && marks.bold) {
      mark = marks.bold;
    }

    editor.addMark("bold", !mark);
    console.log("btn click");
  };

  const underLineBtnClick = (editor: Editor): void => {
    const marks = Editor.marks(editor);
    console.log("marks");
    console.log(marks);
    let mark = false;
    if (marks && marks.underline) {
      mark = marks.underline;
    }

    editor.addMark("underline", !mark);
    console.log("btn click");
  };

  const italicBtnClick = (editor: Editor): void => {
    const marks = Editor.marks(editor);
    console.log("marks");
    console.log(marks);
    let mark = false;
    if (marks && marks.italic) {
      mark = marks.italic;
    }

    console.log(editor.selection);
    editor.addMark("italic", !mark);
    console.log("btn click");
    console.log(editor.selection);
  };

  const getToolDisplayFlag = (): string => {
    return props.readonly ? "none" : "block";
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files || e.target.files.length === 0) {
      // setSelectedFile(undefined);
      return;
    }

    const strIcon = URL.createObjectURL(e.target.files[0]);
    console.log(strIcon);

    // setUserDetail({ ...userDetail, ...{ icon: strIcon } });
    // setSelectedFile(e.target.files[0]);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    uploadImage(formData, (data) => {
      console.log("上传成功");
      console.log(data);

      if (data && data.data && data.data.url && data.data.url !== "") {
        setReturnUrl(data.data.url);
      }
    });
  };

  type LeafProp = {
    attributes: any;
    children: ReactElement<any, any>;
    leaf: CustomText;
  };
  const Leaf = (props: LeafProp) => {
    const { attributes, children, leaf } = props;

    let new_children = children;

    if (leaf.bold) {
      new_children = <strong>{new_children}</strong>;
    }

    if (leaf.underline) {
      new_children = <u>{new_children}</u>;
    }

    if (leaf.italic) {
      new_children = <em>{new_children}</em>;
    }

    return <span {...attributes}>{new_children}</span>;
  };

  return (
    <Box component="div" className={classes.editor}>
      <Slate
        editor={editor}
        value={props.content}
        // onChange={newValue => setValue(newValue)}
        onChange={(newValue) => props.onContentChange(newValue)}
      >
        <Box
          component="div"
          display={getToolDisplayFlag()}
          className={classes.tool}
        >
          <IconButton
            onClick={() => {
              btnClick(editor);
            }}
          >
            <FormatBold />
          </IconButton>

          <IconButton
            onClick={() => {
              underLineBtnClick(editor);
            }}
          >
            <FormatUnderlined />
          </IconButton>

          <IconButton
            onClick={() => {
              italicBtnClick(editor);
            }}
          >
            <FormatItalic />
          </IconButton>

          <IconButton
            component="label"
          // onClick={() => { italicBtnClick(editor) }}
          >
            <input
              accept="image/*"
              type="file"
              onClick={(event) => {
                event.currentTarget.value = "";
              }}
              onChange={onSelectFile}
              style={{ display: "none" }}
            />
            <CropOriginal />
          </IconButton>
          <Divider />
        </Box>
        <Box className={classes.content}>
          <Editable
            readOnly={props.readonly}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
          />
        </Box>
      </Slate>
    </Box>
  );
};
