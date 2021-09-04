// Import React dependencies.
import React, { useMemo, useState } from 'react'
// Import the Slate editor factory.
import { createEditor, Descendant } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'

// TypeScript users only add this code
import { BaseEditor } from 'slate'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

export const FriendPage: React.FC = () => {

  const editor = useMemo(() => withReact(createEditor()), [])
  // Add the initial value when setting up our state.
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ])

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => setValue(newValue)}
    >
      <Editable />
    </Slate>
  )
}



// export const FriendPage: React.FC = () => {
//     // Also you must annotate `useState<Descendant[]>` and the editor's initial value.
//     const initialValue: CustomElement = []
//     const [value, setValue] = useState<Descendant[]>(initialValue)
//     return (
//       <Slate value={value} onChange={setValue}>
//         ...
//       </Slate>
//     )
// };