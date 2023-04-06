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

async function saveUserInfo() {
    let arrUsers = await DataService.getAllUsers();
    let index = (document.getElementById('saveBtn')).parentNode.parentNode.parentNode.id;

    let editUserForm = document.getElementById('editUserForm');
    let emailNewValue = editUserForm.email.value;
    let usernameNewValue = editUserForm.username.value;
    let userpswNewValue = editUserForm.userpsw.value;

    let serveySelectEl = document.getElementById('survey');
    let serveyValue = serveySelectEl.options[serveySelectEl.selectedIndex].value;

    if ( validateEmailUsernamePass(emailNewValue, usernameNewValue, userpswNewValue ) ) {
        let userObj = arrUsers.users[index];

        //Property "usernameOldValue" is added so it can be used as filter in findOneAndUpdate()
        userObj.usernameOldValue = userObj.username;

        userObj.birthday = document.getElementById('birthdate').value;
        userObj.email = emailNewValue;
        userObj.gender = getGenderRadioValue();
        userObj.howDiscovered = `${serveyValue}`;
        userObj.password = userpswNewValue;
        userObj.username = usernameNewValue;

        DataService.updateUser(userObj);

        let currLoggedInUser = DataService.getCurrLoggedInUserFromLocalStorage();
        currLoggedInUser.email = editUserForm.email.value;
        currLoggedInUser.username = editUserForm.username.value;
        currLoggedInUser.password = editUserForm.userpsw.value;
        DataService.setCurrLoggedInUserInLocalStorage(JSON.stringify(currLoggedInUser));
    }

    window.history.pushState(null, null, "#users");
    router();
}

export { saveUserInfo };