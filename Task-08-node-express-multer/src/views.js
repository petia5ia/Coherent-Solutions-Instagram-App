import DataService from './services/DataService.js';
import { editUserTemplate } from './templates/EditUserTemplate.js';
import { loginTemplate } from './templates/LoginTemplate.js';
import { registerTemplate } from './templates/RegisterTemplate.js';
import { userProfileTemplate } from './templates/UserProfileTemplate.js';
import { userTemplate } from './templates/UserTemplate.js';

class BaseView {
    constructor(DataService) {
        this.DataService = DataService;
    }

    render() {
        return this.template();
    }

    getAllUsersData() {
        return this.DataService.getAllUsers();
    }

    getCurrLoggedInUserData() {
        return this.DataService.getCurrLoggedInUser();
    }
}

class EditUserView extends BaseView {
    constructor(DataService) {
        super(DataService);
        this.template = editUserTemplate;
    }

    render() {
        const data = this.getCurrLoggedInUserData();
        return this.template(data);
    }
}

class LoginView extends BaseView {
    constructor(DataService) {
        super(DataService);
        this.template = loginTemplate;
    }
}

class RegisterView extends BaseView {
    constructor(DataService) {
        super(DataService);
        this.template = registerTemplate;
    }
}

class UserProfileView extends BaseView {
    constructor(DataService) {
        super(DataService);
        this.template = userProfileTemplate;
    }

    render(userId) {
        const userData = this.DataService.getUserByUserId(userId);
        return this.template(userData);
    }
}

class UsersListView extends BaseView {
    constructor(DataService) {
        super(DataService);
        this.template = userTemplate;
    }

    render() {
        const allUsers = this.getAllUsersData();
        const currLoggedInUser = this.getCurrLoggedInUserData();

        //Display logged in user at the top of the page
        let usersListLayout = `
            <div id="currentlyLoggedInUser">
                Logged in as:<br>
                ${currLoggedInUser.username}<br>
                <a href="#login" id="logOutLink">Sign out</a>
            </div>`;

        //Display list with all users
        for (let i = 0; i < allUsers.length; i++) {
            const user = JSON.parse(JSON.stringify(allUsers[i]));
            usersListLayout += this.template(user, currLoggedInUser, i)
        }

        return `${usersListLayout}`;
    }
}

export const editUserView = new EditUserView(DataService);
export const loginView = new LoginView(DataService);
export const registerView = new RegisterView(DataService);
export const userProfileView = new UserProfileView(DataService);
export const usersListView = new UsersListView(DataService);