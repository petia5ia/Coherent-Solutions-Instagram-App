import DataService from '../services/DataService.js';
import { editUserTemplate } from '../templates/EditUserTemplate.js';
import { feedTemplate } from '../templates/FeedTemplate.js';
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

class FeedView extends BaseView {
    constructor(DataService) {
        super(DataService);
        this.template = feedTemplate;
    }

    async render() {
        const data = await this.DataService.getAllPosts();

        let feedLayout = "";

        //Display list with all posts
        for (let i = 0; i < data.posts.length; i++) {
            const post = data.posts[i];
            feedLayout += this.template(data.posts[i]);
        }

        return `${feedLayout}`;
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
        const userPosts = await this.DataService.getUserPosts(userId);

        let userProfileLayout = this.template(userData.user[0]);

        //Display list with all posts
        for (let i = 0; i < userPosts.posts.length; i++) {
            const post = userPosts.posts[i];
            userProfileLayout += `
                <div class="container">
                    <img src="${post.path}" alt="">
                    <p>${post.description}</p>
                </div>`;
        }

        return `${userProfileLayout}`;
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
export const feedView = new FeedView(DataService);
export const loginView = new LoginView(DataService);
export const registerView = new RegisterView(DataService);
export const userProfileView = new UserProfileView(DataService);
export const usersListView = new UsersListView(DataService);