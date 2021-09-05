import React, { useCallback, useMemo, useState } from 'react'
import { createEditor, Descendant, Editor, Transforms } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import { BaseEditor } from 'slate'

type CustomElement = { type: 'paragraph'|'code'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

export const FriendPage: React.FC = () => {
  // const editor = createEditor();
  const editor = useMemo(() => withReact(createEditor()), [])
  // Add the initial value when setting up our state.
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
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

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => setValue(newValue)}
    >
      <Editable
        renderElement={renderElement}
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