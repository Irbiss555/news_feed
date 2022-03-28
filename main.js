let baseUrl = 'http://146.185.154.90:8000/blog/'
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
let loadProfile = async function () {
    let userEmail = 'bissen_irnazarov@mail.com'
    return await makeRequest(`${baseUrl + userEmail}/profile`)
}
let onLoad = async function () {
    let user = await loadProfile()
    $('.profile-block > h3').text(`${user.firstName} ${user.lastName}`)

}
$(document).ready(function (){
    onLoad().then();
})