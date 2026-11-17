console.log("Login.js Connected");


let managerEmail    = "eashfi15@gmail.com";
let managerPassword = "eashfi15";


function validateLoginForm()
{
    let email    = document.getElementById("Email").value.trim();
    let password = document.getElementById("Password").value;
    let result   = document.getElementById("ResultText");

    let validEmail    = true;
    let validPassword = true;


    document.getElementById("EmailError").innerHTML = "";
    document.getElementById("PasswordError").innerHTML = "";
    result.className = "";
    result.innerHTML = "";

    if (email === "")
    {
        document.getElementById("EmailError").innerHTML = "Please enter the email";
        validEmail = false;
    }
    if (password === "")
    {
        document.getElementById("PasswordError").innerHTML = "Please enter the password";
        validPassword = false;
    }

    if (validEmail && validPassword)
    {
        if (email === managerEmail && password === managerPassword)
        {
            
            window.location.href = "Page/ManagerHome.html";
        }
        else
        {
            result.className = "failed";
            result.innerHTML = "Wrong email or password.";
        }
    }

    return false;   
}
