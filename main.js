//Array created dynamically
let empDetails = function(fName, id, dept,Loc,pImg ){
    this.fName = fName,
    this.id = id,
    this.dept = dept,
    this.Loc = Loc,
    this.pImg = pImg
}

//created object using instance
let obj1 = new empDetails('Industrial Temperature Sensors', 201, 'Software Development', 'Twinsburg', 'http://clevelandelectriclabs-tcg.com/img/bg-industrial-temperature-sensors.jpg');
let obj2 = new empDetails('High Temp thermocouples',202,'Ceramics','Hudson' , 'http://clevelandelectriclabs-tcg.com/img/High-Temp-thermocouples-edited.jpg');
let obj3 = new empDetails('Calibration & Certification Lab', 203, 'Production', 'Hudson', 'http://clevelandelectriclabs-tcg.com/img/cert-lab.jpg');
let obj4 = new empDetails('Value Added Services', 204, 'Shipping', 'Stow', 'http://clevelandelectriclabs-tcg.com/img/Value-added-services.jpg')


//push all the objects to an empty array
let empDetailsArray=[];
empDetailsArray.push(obj1);
empDetailsArray.push(obj2);
empDetailsArray.push(obj3);
empDetailsArray.push(obj4);

//----------------------------------------------------------------------//


//local storage
let isLocalData = function(){
    //get the empLocalCardData(default + newArray card) and assign it a variable
    let localData = localStorage.getItem('empLocalCardData');

    //localData is true
    if (localData){
    //assign localData to empDetailsArray(updating the array with default and newly created card details)
        empDetailsArray = JSON.parse(localData);
    }
    //retun only the default card details 
    return empDetailsArray
}

//----------------------------------------------------------------------//


//Card creation

//this method returns the given id attribute(main div where we need to append our user card)
let empCard = document.getElementById('card-section');
//looping through the array of elements
isLocalData().map(item => {
    userCard(item);
})

//creating the html user card and getting the details from the array of elements
function userCard(item){
    let cardSection = document.createElement('DIV');
        cardSection.setAttribute('class', 'col-4');
    let card = document.createElement('DIV');
        card.setAttribute('class', 'card');
    let cardFigure = document.createElement('FIGURE');
    let cardImg = document.createElement('IMG');
        cardImg.setAttribute('class', 'card-img-top');
        cardImg.setAttribute('src', item.pImg);
    let cardBody = document.createElement('DIV');
        cardBody.setAttribute('class', 'card-body');
    let cardTitle = document.createElement('H5');
        cardTitle.setAttribute('class', 'card-title');
        cardTitle.innerHTML = item.fName;
    let cardDept = document.createElement('SPAN');
        cardDept.setAttribute('class', 'card-title dept');
        cardDept.innerHTML = item.dept;
    let cardDeptIcon = document.createElement('I');
        cardDeptIcon.setAttribute('class', 'far fa-building');
    let cardLoc = document.createElement('SPAN');
        cardLoc.setAttribute('class', 'card-title loc');
        cardLoc.innerHTML = item.Loc;
    let cardLocIcon = document.createElement('I');
        cardLocIcon.setAttribute('class', 'fas fa-thumbtack');
    let cardDelete = document.createElement('BUTTON');
        cardDelete.setAttribute('class', 'delete');
        cardDelete.setAttribute('data-id', item.id);
    let cardDeleteButton = document.createElement('I');
        cardDeleteButton.setAttribute('class', 'fas fa-user-times');
    let cardUpdate = document.createElement('BUTTON');
        cardUpdate.setAttribute('data-id', item.id);
        cardUpdate.setAttribute('class', 'update-user update');
    let cardUpdateButton = document.createElement('I');
        cardUpdateButton.setAttribute('class', 'fas fa-user-edit');
    let cardUser = document.createElement('BUTTON');
        cardUser.setAttribute('data-id', item.id);
        cardUser.setAttribute('class', 'user-profile');
    let cardUserButton = document.createElement('I');
        cardUserButton.setAttribute('class', 'fas fa-user');

        
        cardBody.appendChild(cardTitle);
        cardDept.prepend(cardDeptIcon);
        cardBody.appendChild(cardDept);
        cardLoc.prepend(cardLocIcon);
        cardBody.appendChild(cardLoc);
        cardUpdate.appendChild(cardUpdateButton);
        cardFigure.appendChild(cardUpdate);
        cardFigure.appendChild(cardUser);
        cardUser.appendChild(cardUserButton);
        cardDelete.appendChild(cardDeleteButton);
        cardFigure.appendChild(cardDelete);
        cardFigure.appendChild(cardImg);
        card.appendChild(cardFigure);
        card.appendChild(cardBody);
        cardSection.appendChild(card);
        empCard.appendChild(cardSection);
}


//getting the input detials from modal(form)
function getUserDetails(){
    let uFName = document.getElementById('fname');
    let uEid = document.getElementById('eid');
    let uDept = document.getElementById('edept');
    let uELoc = document.getElementById('eloc');
    let EProfile = document.getElementById('eprofile');

    let empDetailsValidations = {
        vfname: uFName,
        vEid: uEid,
        vDept: uDept,
        vLoc: uELoc,
        vprofile: EProfile
    }

    //validateForm(empDetailsValidations);
    let vfname = uFName.value;
    let  vEid= uEid.value;
    let  vDept= uDept.value;
    let  vLoc= uELoc.value;
    let  vprofile= EProfile.value;

    //created the new user card using the instance of the object
    let newUserDetails = new empDetails(vfname, vEid, vDept, vLoc, vprofile);
    if(validateForm(empDetailsValidations)){
        //creating the new user card
        userCard(newUserDetails);
        //push new card details to the already exitsing default array
        empDetailsArray.push(newUserDetails);
        //set (empDetailsArray = default +newUserDetails) to local storage
        localStorage.setItem('empLocalCardData', JSON.stringify(empDetailsArray));
        //after click on save hide the modal box
        $('#createNewUser').modal('hide');
    }
}

function validateForm(emp){
    const fnameE = document.getElementById('fnameError');
    const eidE = document.getElementById('eidError');
    const edeptE = document.getElementById('edeptError');
    const elocE =document.getElementById('elocError');
    const eprofileE = document.getElementById('eprofileError');

    
    let vfname = fnameE.innerText = isRequiredEle(emp.vfname);
    let vEid = eidE.innerText = isRequiredEle(emp.vEid) + isIdEqual();
    let vDept = edeptE.innerText = isRequiredEle(emp.vDept);
    let vLoc = elocE.innerText = isRequiredEle(emp.vLoc);
    let vprofile = eprofileE.innerText = isRequiredEle(emp.vprofile);


    if (vfname === '' &&
        vEid === '' &&
        vDept === '' &&
        vLoc === '' &&
        vprofile === '' ) {
        return true;
    }
    else {
        return false;
    }
    
}


function isRequiredEle(input) {
    if (input.value === null || input.value === '') {
        input.classList.add('control-error');
        return 'This field should not be empty';
    }
     else {
        input.classList.remove('control-error');
        return '';
    }
}

function isIdEqual(){
    let mgsError;
    let inputId = document.getElementById('eid').value;
    empDetailsArray = isLocalData();
       empDetailsArray.map(item =>{
           if(parseInt(inputId) === parseInt(item.id)){
               
                mgsError = "id's should not be equal!!";
           }
       })
       return mgsError;
}


//----------------------------------------------------------------------------------------------//
//Update the User Details

let updatedUserEle;
//select all the update buttons
let updatedUser = document.querySelectorAll('.update-user');
    //loop through the buttons 
    updatedUser.forEach(item =>{
        //add an event listner to add an classlist to the respective button
        item.addEventListener('click', function(e){
            //show the modal box
            $('#createNewUser').modal('show');
            //added the classlist to the popup
            document.getElementById('createNewUser').classList.add('update-user-popup');
            //respective  clicked button id
            let updateUserId = e.target.dataset.id;
            //check for the localdata
            empDetailsArray = isLocalData();
            //loop through the empcard
            empDetailsArray.map(emp =>{
                //if the newupdated id and actual card id is equal then fill the fields with actual records
                if (parseInt(updateUserId) === parseInt(emp.id)){
                    document.getElementById('fname').value = emp.fName;
                    document.getElementById('eid').value = emp.id;
                    document.getElementById('edept').value = emp.dept;
                    document.getElementById('eloc').value = emp.Loc;
                    document.getElementById('eprofile').value = emp.pImg;
                    updatedUserEle = e.target;
                }
            });
        })
    })

function userUpdateDetails(){
    //get all the input updated data and assign it to varibles
    let updatedEmpName = document.getElementById('fname').value;
    let updatedEmpDepartment = document.getElementById('edept').value;
    let updatedEmpLocation= document.getElementById('eloc').value;
    let updatedEmpProfile= document.getElementById('eprofile').value;

    let currentCard = updatedUserEle.parentElement.parentElement.parentElement;
    empDetailsArray = isLocalData();
    empDetailsArray.map(index =>{
        if (parseInt(index.id) === parseInt(updatedUserEle.dataset.id)){
            currentCard.querySelector('.card-img-top').setAttribute('src', updatedEmpProfile);
            currentCard.querySelector('.card-title').innerHTML = updatedEmpName;
            currentCard.querySelector('.card-title.dept').innerHTML = '<i class="far fa-building"></i>' + updatedEmpDepartment;
            currentCard.querySelector('.card-title.loc').innerHTML = '<i class="fas fa-thumbtack"></i>' + updatedEmpLocation;
            $('#createNewUser').modal('hide');
            index.fName = updatedEmpName;
            index.dept = updatedEmpDepartment;
            index.Loc = updatedEmpLocation;
            index.pImg = updatedEmpProfile;
            localStorage.setItem('empLocalCardData', JSON.stringify(empDetailsArray));
        }
    })
}

function newUserPopUp(){
    document.getElementById('createNewUser').classList.remove('update-user-popup');
    document.getElementById('form-reset').reset();
}

//---------------------------------------------------------------------------------------//

//Delete the user

//get all the deted classes (buttons)
let deleteUser = document.querySelectorAll('.delete');
     //looping through the .delete class elements(buttons)
    deleteUser.forEach(index =>{
        //adding eventlistener to get the clicked card id
        index.addEventListener('click', function(e){
            //get the id(should assign the data-id to delete button) and ssign to a variable
                empDetailsArray = isLocalData();
                let clickedCardId = e.target.dataset.id;
                // if(clickedCardId = )
                let userConfirmDelete = confirm('Do you really want to delete the record!!');
                //If user is ok with deleting the record
                if(userConfirmDelete){
                    //e.target.data-id --parentElement --parenetElement should remove
                    e.target.parentElement.parentElement.parentElement.remove();
                    //till now updated array empDetailsArray.. loop through the items and we need to pop the respective item
                    empDetailsArray.map(item =>{
                        //only remove when the clickedcardid and item.id is equal
                        if (parseInt(item.id) === parseInt(clickedCardId)) {
                            //Once equal then remove from the empDetailsArray that respective id's item
                            empDetailsArray.pop(item);
                            //once removed set the empDetailsArray to localstorage
                            localStorage.setItem('empLocalCardData', JSON.stringify(empDetailsArray));
                        }
                    })
                }
        })
    })


//--------------------------------------------------------------------------------------------------//

//search Employee Record---- search functionality

//to get the search employee records
function getSearchEmployeeDetails(){
    //get the iput value in the search and assign it to a variable and covert to lowercase
    let searchInput = (document.getElementById('search').value).toLowerCase();
    //get all the id classes delete
    let deleteItemCardID = document.querySelectorAll('.delete');
    //loop through those id's 
        deleteItemCardID.forEach(index =>{
            //get the parent of the id's
           let cardEle = index.parentElement.parentElement.parentElement;
           //remove all the id's
               cardEle.remove();
        })
        //loop throught the array
        empDetailsArray.map(item =>{
            //get the name of the array and convert to lowercase
            let actualEmpCardRecord = (item.fName).toLowerCase();
            //check where the input string is in the actual name of the array element.
        if( actualEmpCardRecord.includes(searchInput)){
            //create the card for those includes
            userCard(item);
        }
        })
}


//--------------------------------------------------------------------------//

//Click on Card move to next page:
// let userCardEle;
let getCard = document.querySelectorAll('.user-profile');
    getCard.forEach(item =>{
        item.addEventListener('click', function(e){
            let getUserCardId = e.target.dataset.id;
            let url = window.location.href;
                url = url.replace('/index.html', '/profile.html') + '?empId=' + getUserCardId;
            window.location.href = url;
            console.log(url);

            
        });
    });