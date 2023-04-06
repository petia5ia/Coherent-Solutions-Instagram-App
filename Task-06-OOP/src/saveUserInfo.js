import DataService from './services/DataService.js';
import { router } from './index.js';
import { validateEmailUsernamePass } from './validation.js';

function getGenderRadioValue() {
    let ele = document.getElementsByName('gender');
              
    for(let i = 0; i < ele.length; i++) {
        if(ele[i].checked) {
            return ele[i].value;
        }
    }
}

function saveUserInfo() {
    let arrUsers = DataService.getAllUsers();
    let index = (document.getElementById('saveBtn')).parentNode.parentNode.id;

    let editUserForm = document.getElementById(`${index}`);
    let emailNewValue = editUserForm.email.value;
    let usernameNewValue = editUserForm.username.value;
    let userpswNewValue = editUserForm.userpsw.value;

    let serveySelectEl = document.getElementById('survey');
    let serveyValue = serveySelectEl.options[serveySelectEl.selectedIndex].value;

    if ( validateEmailUsernamePass(emailNewValue, usernameNewValue, userpswNewValue ) ) {
        let newUserObj = arrUsers[index];
        newUserObj = {
            'birthday': document.getElementById('birthdate').value,
            'email': emailNewValue,
            'gender': getGenderRadioValue(),
            'howDiscovered': `${serveyValue}`,
            'password': userpswNewValue,
            'username': usernameNewValue,
        }

        arrUsers[index] = newUserObj;
        DataService.setUsers(JSON.stringify(arrUsers));

        let currLoggedInUser = DataService.getCurrLoggedInUser();
        currLoggedInUser.email = editUserForm.email.value;
        currLoggedInUser.username = editUserForm.username.value;
        currLoggedInUser.password = editUserForm.userpsw.value;
        DataService.setCurrLoggedInUser(JSON.stringify(currLoggedInUser));
    }

    window.history.pushState(null, null, "#");
    router();
}

export { saveUserInfo };