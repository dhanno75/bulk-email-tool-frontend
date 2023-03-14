import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "./home.css";
import * as XLSX from "xlsx";
import { API } from "../../globals";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialValues = {
  from: "",
  subject: "",
  message: "",
  to: "",
};

const Home = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  // const [excelData, setExcelData] = useState(null);
  const [formValues, setFormValues] = useState(initialValues);
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
      console.log(selectedFile.type);
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
      body: JSON.stringify({ ...formValues, to: data }),
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
              <Form.Control
                as="textarea"
                name="message"
                rows={6}
                onChange={handleChange}
                required
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
