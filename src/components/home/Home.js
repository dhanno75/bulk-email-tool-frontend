import React, { useState, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import JoditEditor from "jodit-react";
import "./home.css";
import * as XLSX from "xlsx";
import { API } from "../../globals";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const config = {
  buttons: [
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "eraser",
    "|",
    "ul",
    "ol",
    "|",
    "font",
    "fontsize",
    "paragraph",
    "classSpan",
    "|",
    "indent",
    "outdent",
    "left",
    "|",
    "file",
    "image",
    "video",
    "|",
    "link",
    "unlink",
    "source",
    "|",
    "undo",
    "redo",
  ],
};

const initialValues = {
  from: "",
  subject: "",
  message: "",
  to: "",
};

const Home = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  const [formValues, setFormValues] = useState(initialValues);
  const editor = useRef(null);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      data = XLSX.utils.sheet_to_json(worksheet).map((el) => el.email);
    } else {
      alert("Something went wrong. Please try again!");
    }

    await fetch(`${API}/emails/sendEmails`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        ...formValues,
        to: data,
        message: value.replace(/<[^>]+>/g, ""),
      }),
    })
      .then((data) => {
        if (data.status === 500) {
          throw new Error(data.statusText);
        } else if (data.status === 400) {
          throw new Error(data.statusText);
        }
        setFormValues(initialValues);
        toast.success("Emails sent successfully to the recipients!");
        navigate("/stats");
      })
      .catch(() => {
        toast.warn("Something went wrong. Please try again later");
      });
  };

  return (
    <div>
      <Container>
        <div className="home-wrapper">
          <h1 className="home-heading">Send your emails!</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>From</Form.Label>
              <Form.Control
                type="email"
                name="from"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Add recepients file</Form.Label>
              <Form.Control
                type="file"
                name="file"
                onChange={handleFile}
                required
              />
              <p className="mb-4 mt-2 sample">
                <a
                  href="https://drive.google.com/file/d/16OCarEK97dsCxttEhNnzo2SAwq0f6EbQ/view?usp=share_link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Sample Excel sheet
                </a>
                &nbsp;image for referrence
              </p>
              {excelFileError ? <div>{excelFileError}</div> : ""}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                name="subject"
                type="text"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Message</Form.Label>
              <JoditEditor
                ref={editor}
                onChange={(content) => setValue(content)}
                config={config}
                className="editor"
              />
            </Form.Group>
            <Button type="submit" variant="outline-primary">
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Home;
