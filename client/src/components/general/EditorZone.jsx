import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'

const EditorZone = ({ label, id, name, value, changeValue, invalid, setInvalid }) => {
    const editorRef = useRef(null)

    // console.log(editorRef?.current?.getContent())

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
                    menubar: true,
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
                        'fontfamily | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat',
                    font_family_formats:
                        ' Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Oswald=oswald; Roboto Condensed=roboto condensed,sans-serif; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats ',
                    content_style:
                        '@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap"); body { font-family: "Roboto Condensed", sans-serif; font-size: 14px}',
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
