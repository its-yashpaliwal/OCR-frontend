import React, { useState } from 'react';
import axios from 'axios';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { RingLoader } from 'react-spinners';

const Home = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const[identificationNumber,setIdentificationNumber]=useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [DOB, setDOB] = useState("");
    const [issueDate, setIssueDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `;
    const formatDate = (inputDate) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const formattedDate = new Date(inputDate).toLocaleDateString(undefined, options);
        return formattedDate;
      };
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
      };

    const handleUpload = async () => {
        try {
            setLoading(true);
          const formData = new FormData();
          formData.append('image', file);
    
          // Make a POST request to your server to handle the file upload and OCR
          const response = await axios.post('https://ocrbackend.onrender.com', formData);
    
          
          console.log(response.data);
    
          // Update state based on the OCR result
         
          setIdentificationNumber(response.data.identification_number);
          setFirstName(response.data.name);
          setLastName(response.data.last_name);
          setDOB(formatDate(response.data.date_of_birth));
          setIssueDate(formatDate(response.data.date_of_issue));
          setExpiryDate(formatDate(response.data.date_of_expiry));
          
        } catch (error) {
          console.error('Error uploading file:', error);  
        }
        setLoading(false);
      };

      const handleSave = async () => {
        try {
            setLoading(true);
          const saveResponse = await axios.post('http://localhost:5000/save', {
            identificationNumber,
            firstName,
            lastName,
            DOB,
            issueDate,
            expiryDate,
          });
    
          console.log(saveResponse.data);
    
          // Redirect to '/save' or another desired page
        //   history.push('/save');
        } catch (error) {
          console.error('Error saving data:', error);
        }
        setLoading(false);
      };
    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                
                
                <div className="inputGroup">
                    <input className="inputFile" 
                            type="file" 
                            onChange={handleFileChange}
                    />
                    <button className='btn joinBtn' onClick={handleUpload}>{loading ? "Fetching Data...." :" Upload"}
                    </button>

                    <label className='label' >Identification Number</label>

                    <input
                        type="text"
                        className="inputBox"
                        value={identificationNumber}
                        placeholder=""
                        onChange={(e) => setIdentificationNumber(e.target.value)}
                      
                    />
                    <label className='label' >First Name</label>
                    <input
                        type="text"
                        className="inputBox"
                        placeholder=""
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      
                    />
                    <label className='label' >Last Name</label>
                    <input
                        type="text"
                        className="inputBox"
                        placeholder=""
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      
                    />
                    <label className='label' >Date of Birth</label>
                    <input
                        type="text"
                        className="inputBox"
                        placeholder=""
                        value={DOB}
                        onChange={(e) => setDOB(e.target.value)}
                      
                    />
                    <label className='label' >Issue Date</label>
                    <input
                        type="text"
                        className="inputBox"
                        placeholder=""
                        value={issueDate}
                        onChange={(e) => setIssueDate(e.target.value)}
                      
                    />
                    <label className='label' >Expiry Date</label>
                    <input
                        type="text"
                        className="inputBox"
                        placeholder=""
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                      
                    />
                    
                    <button className="btn joinBtn" onClick={handleSave} >
                        Save
                    </button>
                 
                </div>
            </div>
            
        </div>
    );
};

export default Home;
