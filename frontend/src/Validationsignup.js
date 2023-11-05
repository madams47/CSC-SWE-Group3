function Validation(values) {
    let error = {}
    //const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    //const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.User_Name === "") {
        error.User_Name = "Name should not be empty"
    } 

    if(values.password === "") {
        error.password = "Password should not be empty"

    }

    return error;
}

export default Validation