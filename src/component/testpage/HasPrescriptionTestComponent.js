import {useState, useEffect} from "react";
import {Button, Label, TextInput} from 'flowbite-react'
import useCookie from "../../hooks/useCookie";
import React from "react";

export default function HasPrescriptionTestComponent({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  // Form values
  const [medicineIdentifier, setMedicineIdentifier] = useState('');

  // Call values
  const [request, setRequest] = useState('none');
  const [response, setResponse] = useState('none');

  // Update request accordingly with the form values
  useEffect(() => {setRequest({
    "session_token" : userTokenCookie,
    "medicine_identifier" : medicineIdentifier
  })}, [userTokenCookie, medicineIdentifier])

  // Define the api call based on the state
  async function apiCall() {
    return fetch(apiEndpoint+"/api/has_prescription", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
    }).then(data => data.json())
  }
  
  // Define the action of the sumbit button
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await apiCall();
    setResponse(JSON.stringify(res))
  };
  
  // Define the HTML/React code
  return(<>
    <h1 className="text-3xl font-bold mb-6 text-center">Check prescription API test</h1>
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
      <div className="mb-2 block">
          <Label
          htmlFor="medicine_identifier"
          value="medicine_identifier"
          />
      </div>
      <TextInput
          id="medicine_identifier"
          type="text"
          required={true}
          onChange={(e) => setMedicineIdentifier(e.target.value)}
      />
      </div>
      <Button type="submit">
      Submit
      </Button>
    </form>
    <br/>
  
    <h1 className="text-3xl font-bold mb-6 text-center">Request</h1>
    {JSON.stringify(request)}
  
    <br/>
  
    <h1 className="text-3xl font-bold mb-6 text-center">Response received</h1>
    {response}
    
    <br/>  
    
    <h1 className="text-3xl font-bold mb-6 text-center">Cookies values</h1>
      <p>user_token = {userTokenCookie}</p>  
    <br/>
    </>)
  }