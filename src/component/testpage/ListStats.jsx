import {useState} from "react";
import useCookie from "../../hooks/useCookie";
import React from "react";
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import TestPageTabLayout from "./TestPageTabLayout";
import LabeledTextInputComponent from "../common/LabeledTextInput";

export default function ListStats({apiEndpoint}) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  // Form values
  const [tokenValue, setToken] = useState('')
  // Request
  const stringRequest = usePrepareBodyRequest({
    "session_token" : tokenValue,
  })
  const [sumbitAndFetch, stringResponse] = useSumbitAndFetch(
    stringRequest,
    apiEndpoint+"/api/stats"
  )
  
  // Define the HTML/React code
  return(
    <TestPageTabLayout 
      title="Stats API test" 
      onSubmit={sumbitAndFetch}
      stringRequest={stringRequest}
      stringResponse={stringResponse}
      cookiesToShow={{'user_token' : userTokenCookie}}
    >
      <LabeledTextInputComponent
        id="session_token"
        label_text="session_token"
        input_type="text"
        required={true}
        on_change={(e) => setToken(e.target.value)}
      />
    </TestPageTabLayout>
  )
}