function validateForm() {
    var x = document.forms["myForm"]["fname"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
  }
  function alt(){
    var input=document.querySelector(".form-control");
    if(input.value.length==0) alert("Empty input fields");
    else
    alert("Registration Successful");
  }//nothing