import React, { useState, useEffect } from "react";
import tasksStore from "stores/tasksStore";
import { view } from "react-easy-state";
import SimpleMDEReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styled from "styled-components";
import { format } from "date-fns";
import { deLocale } from "date-fns/locale/de";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
// import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
// import Heading from "@ckeditor/ckeditor5-heading/src/heading";
// import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
// import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
// import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
// import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
// import List from "@ckeditor/ckeditor5-list/src/list";
// import Link from "@ckeditor/ckeditor5-link/src/link";

import GFMDataProcessor from "@ckeditor/ckeditor5-markdown-gfm/src/gfmdataprocessor";

// Simple plugin which loads the data processor.
function Markdown(editor) {
  editor.data.processor = new GFMDataProcessor();
}

const Header = styled.div`
  flex: 0 0 80px;
  background: #fff;
  box-shadow: 0px 0px 1px 0px #e4e7eb;
  padding: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
`;

const DateDisplay = styled.span`
  font-size: 16px;
  margin-right: 12px;
`;

const DetailsTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  flex: 1;
`;

const EditorWrapper = styled.div`
  margin: 8px 2px 2px 2px;
  /* flex: 1;
  display: flex; */
`;

// const Footer = styled.div`
//   flex: 0 0 32px;
//   background: #fff;
//   /* box-shadow: 0px -1px 0px 0px #e4e7eb; */
//   border-top: 1px solid #e4e7eb;
//   padding: 4px;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   box-sizing: border-box;
// `;

const TaskDetails = props => {
  const [task, setTask] = useState(props.task);
  // const task = tasksStore.selectedTask;
  // console.log(task);

  useEffect(() => {
    setTask(props.task);
  }, [props.task]);

  const getInstance = instance => {
    // You can now store and manipulate the simplemde instance.
    instance.togglePreview();
  };

  return (
    <>
      <Header>
        <DetailsTitle>{task.title}</DetailsTitle>
        <DateDisplay>
          Due:
          {task.due
            ? format(task.due, " Do MMM[.] YYYY", { locale: deLocale })
            : " -- -- ----"}
        </DateDisplay>
      </Header>
      <EditorWrapper>
        {/* <SimpleMDEReact
          key={task.id}
          getMdeInstance={getInstance}
          value={task.notes}
          onChange={value => {
            setTask({ ...task, notes: value });
          }}
          onBlur={() => {
            tasksStore.updateTask(task);
          }}
          options={{
            autofocus: false,
            spellChecker: false,
            // toolbar: false,
            placeholder: "Add note...",
            status: false,
            lineWrapping: true
            // minHeight: "100%"
          }}
        /> */}
        <CKEditor
          editor={ClassicEditor}
          data={task.notes}
          config={{
            plugins: [Markdown]
          }}
          onInit={editor => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={editor => {
            console.log("Blur.", editor);
          }}
          onFocus={editor => {
            console.log("Focus.", editor);
          }}
        />
      </EditorWrapper>
      {/* <Footer /> */}
    </>
  );
};

export default view(TaskDetails);
