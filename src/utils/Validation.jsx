//for validation
const Validation = (values) => {
    let errors = {};
    const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    // for full name
    if (!values.fullName) {
      errors.fullName = "Name is required.";
    } else if (values.fullName.length < 5) {
      errors.fullName = "Name must be greater than 5 words";
    }
    //for contact
    if (!values.contact) {
      errors.contact = "Contact number must be written";
    } else if (values.contact.length < 10) {
      errors.contact = "Contact number must be of 10 word";
    } else if (values.contact.length > 10) {
      errors.contact = "Contact number mustnot be of greater than 10 word";
    }
    //for Adress
    if (!values.address) {
      errors.address = "Address must be written";
    } else if (values.address.length > 20) {
      errors.address = "Address mustnot be of greater than 20 word";
    }
    //for role
    if (!values.role) {
      errors.role = "Role is required.";
    }
    //for guardian name
    if (!values.Gname) {
      errors.Gname = "Name is required.";
    }
  
    //for email
    if (!values.email) {
      errors.email = "Email is required.";
    } else if (!regex.test(values.email)) {
      errors.email = "Email is invalid.";
    }
    //for Gaurdian contact
    if (!values.gcontact) {
      errors.gcontact = "Contact number must be written";
    } else if (values.gcontact.length < 10) {
      errors.gcontact = "Contact number must be of 10 word";
    } else if (values.gcontact.length > 10) {
      errors.gcontact = "Contact number mustnot be of greater than 10 word";
    }
    // for Gaurdian occuptation
    if (!values.goccupation) {
      errors.goccupation = "Ocuupation is required.";
    }
    // for batch
    if (!values.batch) {
      errors.batch = "Batch is required.";
    }
    // for registration
    if (!values.rnumber) {
      errors.rnumber = "Registration is required.";
    }
    //for password
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 5) {
      errors.password = "Password must be greater than 5 character";
    }
    if (!values.gaurdian) {
      errors.gaurdian = "Name is required.";
    }
  
    //for old Password
    if (!values.OPassword) {
      errors.OPassword = "Old password is required";
    } else if (values.OPassword.length < 5) {
      errors.OPassword = "Old password must be greater than 5 character";
    }
  
    //for new password
    if (!values.NPassword) {
      errors.NPassword = "New password is required";
    } else if (values.NPassword.length < 5) {
      errors.NPassword = "New password must be greater than 5 character";
    }
  
    //for change password
  
    if (!values.CPassword) {
      errors.CPassword = "Change password is required";
    }
    // for matching password
  
    if (values.CPassword !== values.NPassword) {
      errors.MPassword = " new and old password must be same";
    }
  
    return errors;
  };
  
  export default Validation;
  