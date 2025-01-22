import React, { useRef, useState } from 'react';
import { Form, Col } from 'react-bootstrap';
import { useField, useFormikContext } from 'formik';
import { BaseUrl, uploadapi } from '../services/BaseUrls';
import { FileUp } from 'lucide-react';
const FormikField = ({ label, name, type, placeholder, xs = 12, colWidth = 12, disabled = false, uploadUrl,imagetype = "string" }) => {
  const [field, meta] = useField(name); // Hooks into Formik's context
  const { setFieldValue ,values} = useFormikContext();
  const fileInputRef = useRef(null); // Reference to the hidden file input
  const [showPassword, setShowPassword] = useState(false);
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
        if(imagetype === "array"){
          const currentValues = Array.isArray(values[name]) ? values[name] : [];
          setFieldValue(name, [...currentValues, ...result.data]);
        }else{
          setFieldValue(name,result.data[0])
        }
        
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <Col xs={xs} md={colWidth}>
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
              accept=".pdf,image/*"
              onChange={handleImageChange}
            />
          </div>
        ) : (
          <>
           <div className="position-relative">
           <Form.Control
            type={type==="password"?showPassword?"text":"password":type}
            placeholder={placeholder}
            {...field} // Spread Formik's field props
            disabled={disabled}
          />
          {type==="password"?
          <div
            onClick={() => setShowPassword(!showPassword)}
            className={`${
              showPassword ? "uil-eye-slash" : "uil-eye"
            } text-lighten fs-15 field-icon toggle-password2 cursor-true`}
          ></div>   
          :""}                                       
          </div>
        </>
        )}

        {meta.touched && meta.error ? (
          <div className="text-danger small">{meta.error}</div>
        ) : null}
      </Form.Group>
    </Col>
  );
};

export default FormikField;
