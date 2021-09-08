import React, { ReactElement, useCallback, useMemo, useState } from 'react'
import { createEditor, Descendant, Editor, Transforms } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import { BaseEditor } from 'slate'
import { IconButton } from '@material-ui/core'
import { CropOriginal, FormatBold, FormatItalic, FormatUnderlined } from '@material-ui/icons'

type EmptyText = {
  text: string
}

// type CustomElement = { type: 'paragraph' | 'code'; children: CustomText[] }
type CustomBlockElement = { type: 'paragraph' | 'code'; children: CustomText[] }
type CustomImageElement = { type: 'image'; url: string; children: EmptyText[] }
type CustomElement = CustomBlockElement | CustomImageElement;
type CustomText = {
  text: string;
  bold: boolean;
  underline: boolean;
  italic: boolean
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

export const FriendPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState(new Blob());

  // const editor = createEditor();
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  // Add the initial value when setting up our state.
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{
        text: 'A line of text in a paragraph.',
        bold: false,
        underline: false,
        italic: false,
      }],
    },
    {
      type: 'image',
      url: 'https://material-ui.com/static/hiring-toc-light.png',
      children: [{
        text: '',
        // bold: false,
        // underline: false,
        // italic: false,
      }],
    },
  ])

  // Define a React component renderer for our code blocks.
  const CodeElement = (props: {
    attributes: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLPreElement> & React.HTMLAttributes<HTMLPreElement>;
    children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined
  }) => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    )
  }

  const ImageElement = (props: {
    attributes: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLParagraphElement> & React.HTMLAttributes<HTMLParagraphElement>;
    children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined,
    element: CustomImageElement
  }) => {
    return (
      <div {...props.attributes}>
        <div contentEditable={false}>
          <img
            src={props.element.url}
          />
        </div>
        {props.children}
      </div>
    )
  }

  const DefaultElement = (props: {
    attributes: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLParagraphElement> & React.HTMLAttributes<HTMLParagraphElement>;
    children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined
  }) => {
    return <p {...props.attributes}>{props.children}</p>
  }

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      case 'image':
        return <ImageElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const btnClick = (editor: Editor): void => {
    const marks = Editor.marks(editor);
    console.log('marks');
    console.log(marks);
    let mark = false;
    if (marks && marks.bold) {
      mark = marks.bold;
    }

    editor.addMark('bold', !mark);
    console.log('btn click');
  }

  const underLineBtnClick = (editor: Editor): void => {
    const marks = Editor.marks(editor);
    console.log('marks');
    console.log(marks);
    let mark = false;
    if (marks && marks.underline) {
      mark = marks.underline;
    }

    editor.addMark('underline', !mark);
    console.log('btn click');
  }

  const italicBtnClick = (editor: Editor): void => {
    const marks = Editor.marks(editor);
    console.log('marks');
    console.log(marks);
    let mark = false;
    if (marks && marks.italic) {
      mark = marks.italic;
    }

    editor.addMark('italic', !mark);
    console.log('btn click');
  }

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files || e.target.files.length === 0) {
      // setSelectedFile(undefined);
      return;
    }

    const strIcon = URL.createObjectURL(e.target.files[0]);
    console.log(strIcon);

    // setUserDetail({ ...userDetail, ...{ icon: strIcon } });
    setSelectedFile(e.target.files[0]);

    const text = { text: '' }
    const image: CustomImageElement = { type: 'image', url: strIcon, children: [text] }
    Transforms.insertNodes(editor, image)
  };

  type LeafProp = { attributes: any, children: ReactElement<any, any>, leaf: CustomText };
  const Leaf = (props: LeafProp) => {
    const { attributes, children, leaf } = props;

    // if (typeof (props.leaf) == "EmptyText")
    //   return <span></span>

    let new_children = children;

    if (leaf.bold) {
      new_children = <strong>{children}</strong>
    }

    if (leaf.underline) {
      new_children = <u>{new_children}</u>
    }

    if (leaf.italic) {
      new_children = <em>{new_children}</em>
    }

    return <span {...attributes}>{new_children}</span>
  }

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => setValue(newValue)}
    >
      <IconButton onClick={() => { btnClick(editor) }}>
        <FormatBold />
      </IconButton>

      <IconButton onClick={() => { underLineBtnClick(editor) }}>
        <FormatUnderlined />
      </IconButton>

      <IconButton onClick={() => { italicBtnClick(editor) }}>
        <FormatItalic />
      </IconButton>

      <IconButton component="label"
      // onClick={() => { italicBtnClick(editor) }}
      >
        <input
          accept="image/*"
          type="file"
          onChange={onSelectFile}
          style={{ display: 'none' }}
        />
        <CropOriginal />
      </IconButton>

      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={event => {
          if (event.key === '`' && event.ctrlKey) {
            // Prevent the "`" from being inserted by default.
            event.preventDefault()
            // Otherwise, set the currently selected blocks type to "code".
            Transforms.setNodes(
              editor,
              { type: 'code' },
              { match: n => Editor.isBlock(editor, n) }
            )
          }
        }}
      />
    </Slate>
  )
}