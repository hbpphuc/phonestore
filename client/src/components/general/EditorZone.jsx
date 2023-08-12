import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'

const EditorZone = ({ label, id, name, value, changeValue, invalid, setInvalid }) => {
    const editorRef = useRef(null)
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent())
        }
    }

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label htmlFor={id} className="w-fit text-base font-medium text-primary cursor-pointer">
                    {label}
                </label>
            )}
            <Editor
                id={id}
                apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={value}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'code',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                        'code',
                        'help',
                        'wordcount',
                    ],
                    toolbar:
                        'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
                onChange={(e) => changeValue((prev) => ({ ...prev, [name]: e.target.getContent() }))}
                onFocus={() => setInvalid && setInvalid([])}
            />
            {invalid?.some((item) => item.name === name) && (
                <small className="text-red-500 text-sm">{invalid.find((el) => el.name === name)?.message}</small>
            )}
        </div>
    )
}

export default EditorZone
