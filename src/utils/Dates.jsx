const formatAPIDate=(dateString,includeTime=true)=>{
    const date=new Date(dateString);
    let options = {
      day: "numeric",
      month: "long",
      year: "numeric"
  };
  if (includeTime) {
    options.hour = "numeric";
    options.minute = "numeric";
    options.hour12 = true; // Enable AM/PM
  }
  const formattedDate = date.toLocaleDateString("en-US", options)
  return formattedDate;
}

export {formatAPIDate};


