//signup page
let userDetails =function(sFName, sLName, sGender, sDOB, sEmail, sPassword, sCPassword){
    this.sFName = sFName,
    this.sLName = sLName,
    this.sGender = sGender,
    this.sDOB = sDOB,
    this.sEmail = sEmail,
    this.sPassword = sPassword,
    this.sCPassword = sCPassword
}

function getSignUpDetails(){
    let userDetailsList =[];
    let sFName = document.getElementById('ftname');
    let sLName = document.getElementById('lname');
    let sGender = document.getElementById('gender');
    let sDOB = document.getElementById('DOB');
    let sEmail = document.getElementById('email');
    let sPassword = document.getElementById('password');
    let sCPassword = document.getElementById('confirmPassword');

    let userDetailValidations ={
        sFNameV : sFName,
        sLNameV : sLName,
        sGenderV : sGender,
        sDOBV : sDOB,
        sEmailV : sEmail,
        sPasswordV : sPassword,
        sCPasswordV : sCPassword
    }

    let sFNameV = sFName.value;
    let sLNameV = sLName.value;
    let sGenderV = sGender.value;
    let sDOBV = sDOB.value;
    let sEmailV = sEmail.value;
    let sPasswordV = sPassword.value;
    let sCPasswordV = sCPassword.value;

    let user1 = new userDetails(sFNameV, sLNameV, sGenderV, sDOBV, sEmailV, sPasswordV, sCPasswordV);
    if (validateSignupForm(userDetailValidations)){
         userDetailsList.push(user1);
         localStorage.setItem('userList', JSON.stringify(userDetailsList));
    }
}


function validateSignupForm(emp){
    const sFNameE = document.getElementById('ftnameError');
    const sLNameE = document.getElementById('lnameError');
    const sGenderE = document.getElementById('genderError');
    const sDOBE= document.getElementById('DOBError');
    const sEmailE = document.getElementById('emailError');
    const sPasswordE = document.getElementById('passwordError');
    const sCPassword = document.getElementById('cnfpasswordError');

    let sFNameV = sFNameE.innerText = isRequiredEle(emp.sFNameV);
    let sLNameV = sLNameE.innerText = isRequiredEle(emp.sLNameV);
    let sGenderV = sGenderE.innerText = isRequiredEle(emp.sGenderV);
    let sDOBV = sDOBE.innerText = isRequiredEle(emp.sDOBV);
    let sEmailV = sEmailE.innerText = validEmail(emp.sEmailV);
    let sPasswordV = sPasswordE.innerText = isRequiredEle(emp.sPasswordV);
    let sCPasswordV = sCPassword.innerText = passwordValidations(emp.sCPasswordV);
       
    if (sFNameV === '' &&
        sLNameV === '' &&
        sGenderV === '' &&
        sDOBV === '' &&
        sEmailV === '' &&
        sPasswordV === '' &&
        sCPasswordV === '') {
            let url = window.location.href;
            url = url.replace('/signup.html', '/thanks-page.html');
            window.location.href = url;
            console.log(url);
        return true;
    }else{
        return false;
    }

    

}


function validEmail(ele){
    let emailInput = document.getElementById('email').value;
    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const sEmail = document.getElementById('emailError');

    console.log(sEmail);
    let mgsError;
    if(emailInput === null || emailInput === ''){
      
        return   mgsError = isRequiredEle(ele);
    }
    else if (emailInput.match(mailFormat)){
       
        return sEmail.innerText = '';
    }else {
        return sEmail.innerText ='Please check the email';
    }
    
}

function isRequiredEle(input){
    if (input.value === null || input.value === '') {
        input.classList.add('control-error');
        return 'This field should not be empty';
    } else {
        input.classList.remove('control-error');
        return '';
    }
}

function comparePasswords(el) {
    let CnfPwdemp = document.getElementById('confirmPassword').value;
    let pwdemp = document.getElementById('password').value;
    const sCPassword = document.getElementById('cnfpasswordError');

    if (CnfPwdemp === pwdemp) {
       sCPassword.innerText ='';
    } else {
        sCPassword.innerText ='please enter the same password entered above';
    }
}

function passwordValidations(el) {

    let cpwdemp = document.getElementById('confirmPassword').value;
    let pwdemp = document.getElementById('password').value;
    const sPassword = document.getElementById('passwordError');
    const sCPassword = document.getElementById('cnfpasswordError');
    let regEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

    let mgsError;
    
    if (pwdemp === null || pwdemp === "") {
         return mgsError = isRequiredEle(el);
    } else if (cpwdemp.match(regEx)) {
         return sCPassword.innerText = 'Please enter the strong Password';

    }
    else if(pwdemp === cpwdemp){
        return  mgsError = '';
    }else{
        return mgsError = 'please enter the same password entered above';
    }
}
    


//Thanks page navigate to login page

function naviageLogin(){
    let url = window.location.href;
    url = url.replace('thanks-page.html', 'login.html');
    window.location.href= url;
}



//login page



function getEmpDeatils(){
    debugger;
    let userEmailInput = document.getElementById('email').value;
    let userPasswordInput = document.getElementById('password').value;
    let userLocalData = JSON.parse(localStorage.getItem('userList'));


    let userList = userLocalData;
    userList.map(item => {
        if ((userEmailInput === (item.sEmail)) && (userPasswordInput === (item.sPassword))) {
            let empURL = window.location.href;
            empURL = empURL.replace('login.html', 'index.html');
            window.location.href = empURL;
        }else{
            return false;
        }
    })

}

