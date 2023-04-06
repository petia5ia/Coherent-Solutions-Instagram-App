import DataService from '../services/DataService.js';
import { editUserTemplate } from '../templates/EditUserTemplate.js';
import { loginTemplate } from '../templates/LoginTemplate.js';
import { registerTemplate } from '../templates/RegisterTemplate.js';
import { userProfileTemplate } from '../templates/UserProfileTemplate.js';
import { userTemplate } from '../templates/UserTemplate.js';

class BaseView {
    constructor(DataService) {
        this.DataService = DataService;
    }

    async render() {
        return this.template();
    }

    async getAllUsersData() {
        return await this.DataService.getAllUsers();
    }

    getCurrLoggedInUserData() {
        return this.DataService.getCurrLoggedInUserFromLocalStorage();
    }
}

class EditUserView extends BaseView {
    constructor(DataService) {
        super(DataService);
        this.template = editUserTemplate;
    }

    async render() {
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

    async render(userId) {
        const userData = await this.DataService.getUserByUsername(userId);
        return this.template(userData.user[0]);
    }
}

class UsersListView extends BaseView {
    constructor(DataService) {
        super(DataService);
        this.template = userTemplate;
    }

    async render() {
        let allUsers = await this.getAllUsersData();
        const currLoggedInUser = this.getCurrLoggedInUserData();

        //Display logged in user at the top of the page
        let usersListLayout = `
            <div id="currentlyLoggedInUser">
                Logged in as:<br>
                ${currLoggedInUser.username}<br>
                <a href="#login" id="logOutLink">Sign out</a>
            </div>`;

        //Display list with all users
        for (let i = 0; i < allUsers.users.length; i++) {
            const user = allUsers.users[i];
            usersListLayout += this.template(user, currLoggedInUser, i);
        }

        return `${usersListLayout}`;
    }
}

export const editUserView = new EditUserView(DataService);
export const loginView = new LoginView(DataService);
export const registerView = new RegisterView(DataService);
export const userProfileView = new UserProfileView(DataService);
export const usersListView = new UsersListView(DataService);