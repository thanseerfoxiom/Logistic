import React, { useRef } from 'react';
import { Form, Col } from 'react-bootstrap';
import { useField, useFormikContext } from 'formik';
import { BaseUrl, uploadapi } from '../services/BaseUrls';
import { FileUp } from 'lucide-react';
const FormikField = ({ label, name, type, placeholder, colWidth = 12, disabled = false, uploadUrl }) => {
  const [field, meta] = useField(name); // Hooks into Formik's context
  const { setFieldValue ,values} = useFormikContext();
  const fileInputRef = useRef(null); // Reference to the hidden file input

  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger the hidden file input
  };

  const handleImageChange = async (e) => {
    const file = e.target.files; // Get the uploaded file
    if (file) {
      const filesArray = Array.isArray(file) ? file : [file];
      // setFieldValue(name, file[0]); // Update Formik's field value
      // console.log("filefilefilefile",file[0])
      const formData = new FormData();
      formData.append('files', file[0]);

      try {
        const response = await fetch(BaseUrl+uploadapi, {
          method: 'POST',
          body: formData,
        });
        // console.log("..................",response)
        const result = await response.json();
        console.log('Upload successful:', result);
        // setFieldValue(name,result.data) 
        const currentValues = Array.isArray(values[name]) ? values[name] : [];
        setFieldValue(name, [...currentValues, ...result.data]);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <Col md={colWidth}>
      <Form.Group className="mb-3" controlId={`form${name}`}>
        <Form.Label>{label}</Form.Label>
        {type === 'file' ? (
         
          <div>
            {/* <img
              className="mt-1"
              src="/public/img/pdfimg.png"
              alt="PDF Icon"
              style={{
                width: '110px',
                height: '110px',
                cursor: 'pointer',
              }}
              onClick={handleImageClick}
            /> */}
            
                  <FileUp strokeWidth={0.5}   style={{
                width: '90px',
                height: '90px',
                cursor: 'pointer',
              }}
              // onClick={handleImageChange}
              onClick={() => fileInputRef.current.click()}
              />
               <p style={{ marginLeft: '8px', fontSize: '14px', color: '#555', cursor: 'pointer' }} onClick={() => fileInputRef.current.click()}>
    Upload Files
  </p>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept=".pdf"
              onChange={handleImageChange}
            />
          </div>
        ) : (
          <Form.Control
            type={type}
            placeholder={placeholder}
            {...field} // Spread Formik's field props
            disabled={disabled}
          />
        )}

        {meta.touched && meta.error ? (
          <div className="text-danger small">{meta.error}</div>
        ) : null}
      </Form.Group>
    </Col>
  );
};

export default FormikField;
