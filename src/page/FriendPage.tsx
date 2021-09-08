import React, { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createEditor, Descendant, Editor, Transforms } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import { BaseEditor } from 'slate'
import { IconButton, TextField } from '@material-ui/core'
import { Backup, CloudDownload, CropOriginal, FormatBold, FormatItalic, FormatUnderlined } from '@material-ui/icons'
import { uploadImage } from '../common/service'
import { RichEditor } from '../component/RichEditor'

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
  const myRef = useRef();
  return (<div>
    <TextField
    inputRef={myRef}
                    multiline={true}
                    variant="outlined"
                />
    <h1>
      friend page
    </h1>
    {/* <RichEditor onContentChange={(text) => {
      
    }} /> */}
  </div>)
}