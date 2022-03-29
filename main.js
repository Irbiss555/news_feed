// let userEmail = 'bissen_irnazarov@mail.com'
let userEmail = 'john.doe@gmail.com'
let baseUrl = `http://146.185.154.90:8000/blog/${userEmail}`

let makeRequest = async function(url, data, method='GET') {
    try {
        return await $.ajax({
                method: method,
                url: url,
                data: data,
                dataType: 'json'
        }
        );
    } catch(error) {
        console.log('error')
        console.log(error)
    }
}
let getProfile = async function () {
    return await makeRequest(`${baseUrl}/profile`)
}
let editProfile = async function (event){
    let user = await makeRequest(`${baseUrl}/profile`, $(event.currentTarget).serialize(), 'POST')
    $('.profile-block > h3').text(`${user.firstName} ${user.lastName}`)
    $('#editUserModal').modal('toggle')
    event.currentTarget.reset()
}
let getPosts = async function () {
    let posts = await makeRequest(`${baseUrl}/posts`)
    let newPosts = posts.map(post => ({...post, datetime: new Date(post.datetime)}))
    let postBlock = $('#posts-block')
    newPosts.sort((a, b) => b.datetime - a.datetime)
    postBlock.empty()
    for (let post of newPosts) {
        let cardTitle = $('<p>').addClass('card-title').text(`${post.user.firstName} ${post.user.lastName}`)
        let cardDate = $('<p>').addClass('card-text').append($('<small>').text(`${post.datetime.toLocaleString()}`))
        let cardText = $('<h4>').addClass('card-text').text(post.message)
        let cardBody = $('<div>').addClass('card-body').append(cardTitle, cardText, cardDate)
        let card = $('<div>').addClass('card').append(cardBody)
        postBlock.append(card)
    }
}
let addPost = async function (event) {
    try {
        await makeRequest(`${baseUrl}/posts`, $(event.currentTarget).serialize(), 'POST')
        event.currentTarget.reset()
    }
    catch (error) {
        console.log(error)
    }

}

let onLoad = async function () {
    let user = await getProfile()
    await getPosts()
    let intervalId = setInterval(async function(){await getPosts()}, 4000);
    $('.profile-block > h3').text(`${user.firstName} ${user.lastName}`)
}
$(document).ready(function (){
    $('#post-form').submit(function(event){
        event.preventDefault()
        addPost(event).then(getPosts)
    });
    $('#edit-user-form').submit(function (event) {
        event.preventDefault()
        editProfile(event).then(getPosts)
    })
    return onLoad()
})