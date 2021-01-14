let url = window.location.href;
let isLocalData = JSON.parse(localStorage.getItem('empLocalCardData'));
if (url.indexOf('?')) {
    url = url.split('=');
    url= url[1];


    empDetailsArray = isLocalData;
    empDetailsArray.map(item =>{
        if(parseInt(url) === parseInt(item.id)){
               document.getElementById('empName').innerText = item.fName;
               document.getElementById('avatar-img').setAttribute('src', item.pImg);
               document.getElementById('empDept').innerText = item.dept;
        }

    })
    

}

