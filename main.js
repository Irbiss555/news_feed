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
let getPosts = async function () {
    let posts = await makeRequest(`${baseUrl}/posts`)
    posts = posts.map(post => ({...post, datetime: new Date(post.datetime)}))
    posts.sort((a, b) => b.datetime - a.datetime)
    for (let post of posts) {
        let cardTitle = $('<p>').addClass('card-title').text(`${post.user.firstName} ${post.user.lastName}`)
        let cardDate = $('<p>').addClass('card-text').append($('<small>').text(`${post.datetime.toLocaleString()}`))
        let cardText = $('<h4>').addClass('card-text').text(post.message)
        let cardBody = $('<div>').addClass('card-body').append(cardTitle, cardText, cardDate)
        let card = $('<div>').addClass('card').append(cardBody)
        $('#posts-block').append(card)
    }
}
let onLoad = async function () {
    let user = await getProfile()
    await getPosts()
    let intervalId = setInterval(function(){getPosts()}, 4000);
    $('.profile-block > h3').text(`${user.firstName} ${user.lastName}`)
}
$(document).ready(function (){
    onLoad().then();
})