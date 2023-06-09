import { useState, useEffect } from "react";

// Hook that returns a function to use in a sumbit form that automatically
// sends a post request to the provided API endpoint with "request" as the body
// Optionally, a function to evaluate the response can be provided. The given 
// response is a string
//
// Usage example:
//   const [userToken, ] = useState('user_token')
//   const request = usePrepareBodyRequest({
//     "session_token" : userToken
//   })
//   [sumbitAndFetch, stringResponse] = useSumbitAndFetch(request, '/api/check', (res) => console.log(res))

export default function useSumbitAndFetch(request, url, evaluateResponse) {
    const [stringResponse, setStringResponse] = useState('none');
    
    async function fetchAndExtractBody(url, body) {
        return fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: body
        }).then(data => data.json())
    }

    const sumbitAndFetch = async (e) => {
        if(e) e.preventDefault();
        const res = await fetchAndExtractBody(url, request);
        setStringResponse(JSON.stringify(res, null, 2))

        if(evaluateResponse)
            evaluateResponse(res)
    };

    return [sumbitAndFetch, stringResponse];
};