import hasExpectedFields from '../hasExpectedFields'

export function seedMirageAuth(server) {
  server.create("user", {
    user_full_name: "John Doe",
    user_given_name: "John",
    user_email: "jondoe@example.com",
    user_city: "Narnia",
    user_address: "Coolstown st. nº 3",
    user_password: "john",
    user_picture : "https://picsum.photos/200",
    user_role : 'manager'
  })
  server.create("user", {
    user_full_name: "John doe2",
    user_given_name: "John2",
    user_email: "jondoe2@example.com",
    user_city: "Narnia",
    user_address: "Coolstown st. nº 3",
    user_password: "john2",
    user_picture : "https://picsum.photos/200",
    user_role : 'doctor'
  })
  server.create("user", {
    user_full_name: "John doe3",
    user_given_name: "John3",
    user_email: "jondoe3@example.com",
    user_city: "Narnia",
    user_address: "Coolstown st. nº 3",
    user_password: "john3",
    user_picture : "https://picsum.photos/200",
    user_role : 'patient'
  })
}

export function defineMirageAuthRoutes(server) {
  // Username+password register endpoint
  server.post("/api/register", (schema, request) => {
    const requestPayload = JSON.parse(request.requestBody)

    // Check payload
    const expectedFields = [
      "user_full_name", 
      "user_given_name", 
      "user_email", 
      "user_phone",
      "user_city", 
      "user_address", 
      "user_password"
    ]
    const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)

    if (!expectedFieldsOk) {
      return ({
        result : "error",
        description: "Wrong fields"
      })
    }

    // Check validity
    if (schema.users.findBy({ user_email : requestPayload.user_email })) {
      return ({
        result : "error",
        description: "Email already exists"
      })
    }
    
    if (schema.users.findBy({ user_given_name : requestPayload.user_given_name })) {
      return ({
        result : "error",
        description: "Given name already exists"
      })
    }

    // Add user
    schema.db.users.insert({
      user_full_name: requestPayload.user_full_name,
      user_given_name: requestPayload.user_given_name,
      user_email: requestPayload.user_email,
      user_city: requestPayload.user_city,
      user_address: requestPayload.user_address,
      user_password: requestPayload.user_password,
      user_picture : '',
      user_role : 'patient'
    })

    // Return
    return { 
      result : 'ok',
      role : 'pacient',
      session_token : requestPayload.user_email
    }
  })

  // Username+password register endpoint by a manager
  server.post("/api/manager_create_account", (schema, request) => {
    const requestPayload = JSON.parse(request.requestBody)

    // Check payload
    const expectedFields = [
      "user_full_name", 
      "user_given_name", 
      "user_email", 
      "user_phone",
      "user_city", 
      "user_address", 
      "user_password",
      "user_role"
    ]
    const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)

    if (!expectedFieldsOk) {
      return ({
        result : "error",
        description: "Wrong fields"
      })
    }

    // Check validity
    if (schema.users.findBy({ user_email : requestPayload.user_email })) {
      return ({
        result : "error",
        description: "Email already exists"
      })
    }
    
    if (schema.users.findBy({ user_given_name : requestPayload.user_given_name })) {
      return ({
        result : "error",
        description: "Given name already exists"
      })
    }

    // Add user
    schema.db.users.insert({
      user_full_name: requestPayload.user_full_name,
      user_given_name: requestPayload.user_given_name,
      user_email: requestPayload.user_email,
      user_city: requestPayload.user_city,
      user_address: requestPayload.user_address,
      user_password: requestPayload.user_password,
      user_picture : '',
      user_role : requestPayload.user_role
    })

    // Return
    return {
      result : 'ok',
    }
  })

  // Username+password login endpoint
  server.post("/api/login", (schema, request) => {
    const requestPayload = JSON.parse(request.requestBody)

    // Check payload
    const expectedFields = [
      "user_email", 
      "user_password"
    ]
    const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)

    if (!expectedFieldsOk) {
      return ({
        result : "error",
        description: "Wrong fields"
      })
    }

    // Check validity
    const user_entry = schema.users.findBy({ user_email : requestPayload.user_email })
    if (!user_entry || user_entry.user_password != requestPayload.user_password) {
      return ({
        result : "error",
        description: "Incorrect login"
      })
    }

    // Return
    return { 
      result : 'ok',
      user_given_name : user_entry.user_given_name,
      user_role : user_entry.user_role,
      user_picture : user_entry.user_picture,
      user_token : user_entry.user_email
    }
  })

  // google signin endpoint
  server.post("/api/google", (schema, request) => {
    const requestPayload = JSON.parse(request.requestBody)

    // Check payload
    const expectedFields = [
      "user_google_token"
    ]
    console.log(requestPayload)
    const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)

    if (!expectedFieldsOk) {
      return ({
        result : "error",
        description: "Wrong fields"
      })
    }

    // TODO: use requestPayload.user_google_token to exchange code and update rest of the code

    // Check validity, create user if needed
    if (!schema.users.findBy({ user_email : requestPayload.user_email })) {
      return ({
        result : "error",
        description: "Incorrect login"
      })
    }

    const user_entry = schema.users.findBy({ user_email : requestPayload.user_email })
    // const newUserTester = true;
    // if (newUserTester){
    //   return { 
    //     result : 'newuser',
    //     role : 'none',
    //     email : request.requestBody.email,
    //     fullName : request.requestBody.name,
    //     picture: request.requestBody.picture,
    //     session_token : 'googleToken'
    //   }  
    // }
    // Return
    return { 
      result : 'ok',
      user_given_name : user_entry.user_given_name,
      user_role : user_entry.user_role,
      user_picture : user_entry.user_picture,
      user_token : user_entry.user_email
    }
  })

  // Check token api endpoint
  server.post("/api/checktoken", (schema, request) => {
    const requestPayload = JSON.parse(request.requestBody)

    // Check payload
    const expectedFields = [
      "session_token"
    ]
    const expectedFieldsOk = hasExpectedFields(requestPayload, expectedFields)

    if (!expectedFieldsOk) {
      return ({
        result : "error",
        description: "Wrong fields"
      })
    }

    if (requestPayload.session_token == 'internal') {
      return ({
        valid : "ok",
        type : 'internal'
      })
    }

    const user_entry = schema.users.findBy({ user_email : requestPayload.session_token })
    if (user_entry) {
      return ({
        valid : "ok",
        type: user_entry.user_role
      })
    } else {
      return ({
        valid : "no"
      })
    }
  })
}
