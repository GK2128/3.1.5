const showNavbarInfoUser = (user) => {
    document.getElementById("showUser").innerHTML =
        `<h3>${user.username} <small>with roles:</small> ${user.showRoles}</h3>`
}
fetch("/api/users/user")
    .then(response => response.json())
    .then(data => showNavbarInfoUser(data))
    .catch(error => console.log(error))

let userPageInfo = ' '
const showUserInfo = (user) => {
    const container = document.getElementById("user")
    userPageInfo +=
        `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.showRoles}</td>
        </tr>`
    container.innerHTML = userPageInfo
}
fetch("/api/users/user")
    .then(response => response.json())
    .then(data => showUserInfo(data))
    .catch(error => console.log(error))