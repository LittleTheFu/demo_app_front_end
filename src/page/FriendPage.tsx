import React, { ReactElement, useCallback, useMemo, useState } from 'react'
import { createEditor, Descendant, Editor, Transforms } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import { BaseEditor } from 'slate'
import { IconButton } from '@material-ui/core'
import { FormatBold } from '@material-ui/icons'

type CustomElement = { type: 'paragraph' | 'code'; children: CustomText[] }
type CustomText = { text: string; bold: boolean }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

export const FriendPage: React.FC = () => {
  // const editor = createEditor();
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  // Add the initial value when setting up our state.
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.', bold: false }],
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
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const btnClick = (editor: Editor): void => {
    const marks = Editor.marks(editor);
    console.log('marks');
    console.log(marks);
    let mark = false;
    if(marks && marks.bold) {
      mark = marks.bold;
    }
    
    editor.addMark('bold', !mark);
    console.log('btn click');
  }

  type LeafProp = { attributes: any, children: ReactElement<any, any>, leaf: CustomText };
  const Leaf = (props: LeafProp) => {
    const { attributes, children, leaf } = props;
    let new_children = children;
    if (props.leaf.bold) {
      new_children = <strong>{children}</strong>
    }
  
    return <span {...attributes}>{new_children}</span>
  }

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => setValue(newValue)}
    >
      <IconButton onClick={()=>{btnClick(editor)}}>
        <FormatBold />
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