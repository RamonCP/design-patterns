const people = (function(){

    const users = []

    const $buttonAddUser = document.querySelector('#addUser')
    const $inputNewUser = document.querySelector('#nameId')
    const $usersUl = document.querySelector('#users')
    let $buttonAction = ''

    $buttonAddUser.addEventListener('click', addUser)
    $inputNewUser.addEventListener('keyup', pressEnterToSave)
    
    function addUser(){
        users.push($inputNewUser.value)
        renderList()
    }

    function pressEnterToSave(){
        if ( event.key == 'Enter' ) {
            addUser()
        }
    }

    function buttonActionUserList(){
        const buttonDataValue = event.target.dataset.value
        if ( buttonDataValue == 'edit' ) {
            editUser(event)
            return
        }

        deleteUser(event)
        return
    }

    function eventListenerButtonsAction(){
        $buttonAction = document.querySelectorAll('.button-action')

        $buttonAction.forEach(function(elem,key) {
            elem.addEventListener("click", buttonActionUserList)
        });
    }

    function deleteUser(event){
        console.log(event.target)
    }

    function editUser(event){
        console.log('edit')
    }

    function addToUlElement(){
        for ( const k in users ) {
            const $li = document.createElement('li')
            const $liContent = `
                    <span>${users[k]}</span>
                    <button class='btn btn-warning button-action' data-value='edit'>Edit</button>
                    <button class='btn btn-danger button-action' data-value='delete'>Delete</button>
                `

            $li.innerHTML = $liContent
            $usersUl.append($li)
        }

        eventListenerButtonsAction()
    }

    function clearList(){
        $usersUl.innerHTML = ''
    }

    function renderList(){
        clearList()
        addToUlElement()
    }

    return {
        addUser,
        editUser
    }
})()




