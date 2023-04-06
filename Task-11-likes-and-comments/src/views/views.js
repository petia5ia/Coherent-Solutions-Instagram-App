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

    async getAllPostsData() {
        return await this.DataService.getAllPosts();
    }

    async render() {
        const data = await this.getAllPostsData();
        const currentlyLoggedInUser = this.getCurrLoggedInUserData().username;
        let feedLayout = document.createElement('div');

        //Display list with all posts
        //for (let i = data.posts.length-1; i >= 0; i--) {
        for (let i = 0; i < data.posts.length; i++) {
            const post = data.posts[i];
            //feedLayout += this.template(post, i, currentlyLoggedInUser);
            feedLayout.append(new Post(post).render());
        }

        return feedLayout;
    }
}

class Post {
    constructor(params) {
        this.params = params;
        this.template = feedTemplate;
        this.postWrapper = document.createElement('div');
    }

    comment() {
        const commentBoxValue = document.getElementById(`comment-box_${this.params.name}`).value;
        const commentObj = {
            'author': (DataService.getCurrLoggedInUserFromLocalStorage()).username,
            'authorAvatar': (DataService.getCurrLoggedInUserFromLocalStorage()).avatar,
            'isReply': false,
            'filename': this.params.name,
            'text': commentBoxValue,
        }
        DataService.addComment(commentObj);

        this.updateLayout();
    }

    //The method "like" is defined as arrow function
    //https://stackoverflow.com/questions/71094583/cannot-read-properties-of-undefined-javascript-class
    like = async (e) => {
        const currentlyLoggedInUser = await DataService.getCurrLoggedInUserFromLocalStorage().username;
        
        const data = {
            'postId': this.params._id,
            'username': currentlyLoggedInUser
        };

        if (this.params.likes.users.find(el => el === `${currentlyLoggedInUser}`) === undefined) {
            DataService.increasePostLikes(data);

            this.params.likes.count += 1;
            this.params.likes.users.push(currentlyLoggedInUser);
        } else {
            DataService.decreasePostLikes(data);

            this.params.likes.count -= 1;
            this.params.likes.users.splice(this.params.likes.users.findIndex(e => e === currentlyLoggedInUser),1);
        }

        this.updateLayout();
    }

    async replyToComment(id) {
        const arr = id.split('_');
        //const postName = arr[1];
        const commentIndex = arr[2];
        const replyBoxValue = document.getElementById(`reply-box_${this.params.name}_${commentIndex}`).value;

        const arrComments = await DataService.getAllComments(this.params.name);
        const parentCommentId = arrComments.comments[commentIndex]._id;

        const replyObj = {
            'author': (DataService.getCurrLoggedInUserFromLocalStorage()).username,
            'authorAvatar': (DataService.getCurrLoggedInUserFromLocalStorage()).avatar,
            'isReply': true,
            'parentCommentId': parentCommentId,
            'filename': this.params.name,
            'text': replyBoxValue,
        }
        DataService.addComment(replyObj);
        
        this.updateLayout();
    }

    async showComments(id) {
        const arr = id.split('_');
        const postName = arr[1];
        const i = arr[3];

        const commentsDivId = `comments_${postName}_post_${i}`;

        if (document.getElementById(commentsDivId).innerHTML === '') {
            const data = await DataService.getPostByName(postName);
            const post = data.post[0];
            const commentsData = await DataService.getAllComments(postName);
            let commentsLayout = `
                <div>`;
    
            for (let j = 0; j < commentsData.comments.length; j++) {
                const comment = commentsData.comments[j];
                const commentId = comment._id;
        
                const arrReplies = await DataService.getAllRepliesToAComment(commentId);
    
                commentsLayout +=  `
                    <img src="${comment.author.avatar}" alt="Avatar" class="rounded-img">
                    <b>${comment.author.username}</b>
                    <br>
                    ${comment.text}
    
                    <div class="container-with-padding">

                        ${( arrReplies.replies.length === 0 ) ? 
                            `` 
                            : 
                            `<div class="showRepliesBtn" id="showReplies_${post.name}_comment_${j}">View replies</div>`
                        }

                        <div id="replies_${post.name}_comment_${j}">
                        </div>
    
                        <input type="text" id="reply-box_${post.name}_${j}" placeholder="Enter reply">
                        <button type="submit" class="replyToCommentBtn" id="replyBtn_${post.name}_${j}">Reply</button>
                    </div>`;
            }
    
            commentsLayout += `
                    <input type="text" id="comment-box_${post.name}" placeholder="Enter comment">
                    <button type="submit" class="commentPostBtn" id="commentBtn_${post.name}">Comment</button>
                </div>`;
    
            document.getElementById(commentsDivId).innerHTML = commentsLayout;      
        } else { 
            document.getElementById(commentsDivId).innerHTML = '';
        }
    }

    async showReplies(id) {
        const arr = id.split('_');
        const postName = arr[1];
        const commentIndex = arr[3];
        
        const repliesDivId = `replies_${postName}_comment_${commentIndex}`;

        if (document.getElementById(id).innerHTML === 'View replies') {        
            let repliesLayout = '';
        
            const arrComments = await DataService.getAllComments(postName);
            const commentId = arrComments.comments[commentIndex]._id;
        
            const arrReplies = await DataService.getAllRepliesToAComment(commentId);
            
            for (let i = 0; i < arrReplies.replies.length; i++) {
                const reply = arrReplies.replies[i];
        
                repliesLayout +=  `
                    <div>
                        <img src="${reply.author.avatar}" alt="Avatar" class="rounded-img">
                        <b>${reply.author.username}</b>
                        <br>
                        ${reply.text}
                    </div>`;
            }
            document.getElementById(id).innerHTML = 'Hide replies';
            document.getElementById(repliesDivId).innerHTML = repliesLayout;        
        } else { //document.getElementById(id).innerHTML === 'Hide replies')
            document.getElementById(id).innerHTML = 'View replies';
            document.getElementById(repliesDivId).innerHTML = '';
        }
    }

    distrFunction = (e) => {
        if(e.target.classList.contains('commentPostBtn')) {
            this.comment();
        } else if(e.target.classList.contains('likePostBtn')) {
            this.like();
        } else if(e.target.classList.contains('replyToCommentBtn')) {
            const id =  e.target.id;
            this.replyToComment(id);
        } else if(e.target.classList.contains('showCommentsBtn')) {
            const id =  e.target.id;
            this.showComments(id);
        } else if(e.target.classList.contains('showRepliesBtn')) {
            const id =  e.target.id;
            this.showReplies(id);
        }
    }

    addEventHandlers(postWrapper) {
        postWrapper.addEventListener('click', this.distrFunction);
    }

    async updateLayout() {
        const currentlyLoggedInUser = await DataService.getCurrLoggedInUserFromLocalStorage().username;
        this.postWrapper.innerHTML = this.template(this.params, 0, currentlyLoggedInUser);
    }

    render() {
        this.updateLayout();
        this.addEventHandlers(this.postWrapper);
        return this.postWrapper;
    }
}

class LoginView extends BaseView {
    constructor(DataService) {
        super(DataService);
        this.template = loginTemplate;
    }

    async render() {
        document.getElementById("userProfile").style.display = "none";
        document.getElementById("usersLink").style.display = "none";
        document.getElementById("feedLink").style.display = "none";

        return this.template();
    }
}

class RegisterView extends BaseView {
    constructor(DataService) {
        super(DataService);
        this.template = registerTemplate;
    }

    async render() {
        document.getElementById("userProfile").style.display = "none";
        document.getElementById("usersLink").style.display = "none";
        document.getElementById("feedLink").style.display = "none";

        return this.template();
    }
}

class UserProfileView extends BaseView {
    constructor(DataService) {
        super(DataService);
        this.template = userProfileTemplate;
    }

    async getUserByUsernameData(userId) {
        return await this.DataService.getUserByUsername(userId);
    }

    async getUserPostsData(userId) {
        return await this.DataService.getUserPosts(userId);
    }

    async render(userId) {
        const userData = await this.getUserByUsernameData(userId);
        const userPosts = await this.getUserPostsData(userId);
        const currentlyLoggedInUser = this.getCurrLoggedInUserData().username;

        let userProfileLayout = document.createElement('div');

        //https://stackoverflow.com/questions/7327056/appending-html-string-to-the-doms
        userProfileLayout.insertAdjacentHTML('beforeend', this.template(userData.user[0]));

        //Display list with the posts of the user
        //for (let i = userPosts.posts.length-1; i >= 0; i--) {
        for (let i = 0; i < userPosts.posts.length; i++) {
            const post = userPosts.posts[i];
            userProfileLayout.append(new Post(post).render());
        }

        return userProfileLayout;
    }
}

class UsersListView extends BaseView {
    constructor(DataService) {
        super(DataService);
        this.template = userTemplate;
    }

    async getAllUsersData() {
        return await this.DataService.getAllUsers();
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

        return usersListLayout;
    }
}

export const editUserView = new EditUserView(DataService);
export const feedView = new FeedView(DataService);
export const loginView = new LoginView(DataService);
export const registerView = new RegisterView(DataService);
export const userProfileView = new UserProfileView(DataService);
export const usersListView = new UsersListView(DataService);