function feedTemplate(post, i, currentlyLoggedInUser) {
    return `
        <div class="container" id="${post._id}">
            <div class="container-with-padding floated-left">
                <img src="${post.author.avatar}" alt="Avatar" class="rounded-img floated-left">
                <p class="floated-left">
                    <b>${post.author.username}</b><br>
                    ${post.createdAt.substring(0, 10)}
                </p>
            </div>

            <div class="container-with-padding">
                ${( post.description !== "" ) ? `${post.description}<br>` : ``}
            </div>

            <img src="${post.path}" alt="Post">

            <div class="container-with-padding">
                <i class="fa-regular fa-heart likePostBtn" id="likeBtn_${post.name}_post_${i}"></i>
                <!--<i class="fa-solid fa-heart"></i>-->
                <i class="fa-regular fa-comment showCommentsBtn" id="showComments_${post.name}_post_${i}"></i>

                ${( (post.likes.users).find(el => el === `${currentlyLoggedInUser}`) !== undefined ) ? 
                    `<p class="likeNum">You and ${post.likes.count - 1} others</p>` 
                    : 
                    `<p class="likeNum">${post.likes.count} likes</p>`
                }

                <div id="comments_${post.name}_post_${i}"></div>

            </div>
        </div>`
}

export { feedTemplate };