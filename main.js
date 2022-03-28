let userEmail = 'bissen_irnazarov@mail.com'
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
let onLoad = async function () {
    let user = await getProfile()
    $('.profile-block > h3').text(`${user.firstName} ${user.lastName}`)

}
$(document).ready(function (){
    onLoad().then();
})