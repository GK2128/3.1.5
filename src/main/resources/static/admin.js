const showNavbarInfo = (user) => {
    document.getElementById("showUser").innerHTML =
        `<h3>${user.username} <small>with roles:</small> ${user.showRoles}</h3>`
}
fetch('api/users/user')
    .then(response => response.json())
    .then(data => showNavbarInfo(data))
    .catch(error => console.log(error))

let usersInfo = ''
const showUsers = (users) => {
    const container = document.getElementById("tbody-admin")
    const arr = Array.from(users)
    arr.forEach(user => {
        usersInfo += `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.showRoles}</td>
            <td class="text text-white">
                <a class="btnEdit btn btn-info">Edit</a>
            </td>
            <td class="text text-white">
                <a class="btnDelete btn btn-danger">Delete</a>
            </td>
        </tr>
        `
    })
    container.innerHTML = usersInfo
}
fetch('/api/users')
    .then(response => response.json())
    .then(data => showUsers(data))
    .catch(error => console.log(error))

const reloadShowUsers = () => {
    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            usersInfo = ''
            showUsers(data)
        })
}

let userInfo = ''
const showUser = (user) => {
    const container = document.getElementById("tbody-user")
    userInfo += `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.showRoles}</td>
        </tr>`
    container.innerHTML = userInfo
}
fetch('api/users/user')
    .then(response => response.json())
    .then(data => showUser(data))
    .catch(error => console.log(error))


//Create user
const formNew = document.getElementById('formNewUser')
const name = document.getElementById('name')
const lastname = document.getElementById('lastName')
const age = document.getElementById('age')
const email = document.getElementById('email')
const password = document.getElementById('password')
const roles = document.getElementById('userRole')
const btnNewUser = document.getElementById('btnNewUser')
const allRoles = [{id: 1, name: "ROLE_USER"}, {id: 2, name: "ROLE_ADMIN"}]
let option = ''

btnNewUser.addEventListener('click', () => {
    console.log('btnNewUser click')
    name.value = ''
    lastname.value = ''
    age.value = ''
    email.value = ''
    password.value = ''
    roles.innerHTML = `
        <option>USER</option>
        <option>ADMIN</option>
        `
    option = 'userPage'
})

formNew.addEventListener('submit', (e) => {
    e.preventDefault()
    let listRoles = roleArray(document.getElementById('userRole'))
    console.log(
        name.value, lastname.value, age.value, email.value, password.value, listRoles
    )
    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: name.value,
            lastName: lastname.value,
            age: age.value,
            email: email.value,
            password: password.value,
            roles: listRoles
        })
    })
        .then(formNew.reset())
        .then(res => res.json())
        .then(data => showUsers(data))
        .catch(error => console.log(error))
        .then(reloadShowUsers)
    $('.nav-tabs a[href="#nav-admin"]').tab('show')

})

// Edit modal
const modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'))
const editForm = document.getElementById('editForm')
const idEdit = document.getElementById('idEdit')
const nameEdit = document.getElementById('nameEdit')
const lastnameEdit = document.getElementById('lastNameEdit')
const ageEdit = document.getElementById('ageEdit')
const emailEdit = document.getElementById('emailEdit')
const passwordEdit = document.getElementById('passwordEdit')
const rolesEdit = document.getElementById('userRoleEdit')

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            console.log("btnEditClick")
            handler(e)
        }
    })
}

let idForm = 0
on(document, 'click', '.btnEdit', e => {
    const row = e.target.parentNode.parentNode
    idForm = row.firstElementChild.innerHTML
    fetch('/api/users/' + idForm, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => getUserById(data))
        .catch(error => console.log(error))
    const getUserById = (user) => {
        idEdit.value = user.id
        nameEdit.value = user.name
        lastnameEdit.value = user.lastName
        ageEdit.value = user.age
        emailEdit.value = user.email
        passwordEdit.value = ''
        rolesEdit.innerHTML = `
            <option value="${allRoles[0].id}">${allRoles[0].name}</option>
            <option value="${allRoles[1].id}">${allRoles[1].name}</option>
            `
        Array.from(rolesEdit.options).forEach(opt => {
            user.roles.forEach(role => {
                if (role.name === opt.text) {
                    opt.selected = true
                }
            })
        })
        modalEdit.show()
    }
})

editForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let listRoles = roleArray(document.getElementById('userRoleEdit'))
    fetch('/api/users', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: idForm,
            name: nameEdit.value,
            lastName: lastnameEdit.value,
            age: ageEdit.value,
            email: emailEdit.value,
            password: passwordEdit.value,
            roles: listRoles
        })
    })
        .then(res => res.json())
        .then(data => showUsers(data))
        .catch(error => console.log(error))
        .then(reloadShowUsers)
    modalEdit.hide()
})

//Delete modal
const modalDelete = new bootstrap.Modal(document.getElementById('modalDelete'))
const deleteForm = document.getElementById('modalDelete')
const idDelete = document.getElementById('idDel')
const nameDelete = document.getElementById('nameDel')
const lastnameDelete = document.getElementById('lastNameDel')
const ageDelete = document.getElementById('ageDel')
const emailDelete = document.getElementById('emailDel')
const rolesDelete = document.getElementById('userRoleDel')

on(document, 'click', '.btnDelete', e => {
    const row = e.target.parentNode.parentNode
    idForm = row.firstElementChild.innerHTML
    fetch('/api/users/' + idForm, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => getUserById(data))
        .catch(error => console.log(error))
    const getUserById = (user) => {
        idDelete.value = user.id
        nameDelete.value = user.name
        lastnameDelete.value = user.lastName
        ageDelete.value = user.age
        emailDelete.value = user.email
        rolesDelete.innerHTML = `
            <option value="${allRoles[0].id}">${allRoles[0].name}</option>
            <option value="${allRoles[1].id}">${allRoles[1].name}</option>
            `
        Array.from(rolesDelete.options).forEach(opt => {
            user.roles.forEach(role => {
                if (role.name === opt.text) {
                    opt.selected = true
                }
            })
        })
        modalDelete.show()
    }
})

deleteForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch('/api/users/' + idForm, {
        method: 'DELETE'
    })
        .then(data => showUsers(data))
        .catch(error => console.log(error))
        .then(reloadShowUsers)
    modalDelete.hide()
})

let roleArray = (options) => {
    let array = []
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            let role = {id: options[i].value}
            array.push(role)
        }
    }
    return array
}