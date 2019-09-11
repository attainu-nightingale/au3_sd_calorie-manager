function validateForm() {
    var x = document.forms["myForm"]["fname"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
  }
  function alt(){
    var input=document.querySelector(".form-control");
    var pass = document.querySelector('#pass').value;
    var cPass = document.querySelector("#cPass").value;
    if(input.value.length==0) alert("Empty input fields");
    else if(pass != cPass){
      alert("Passwords do not match.");
      return false;
    }
    else{
       alert("Registration Successful");
       return true;
    }
  }//nothing