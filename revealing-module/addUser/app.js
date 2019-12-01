const people = (function(){

    const users = []

    const $buttonAddUser = document.querySelector('#addUser')
    const $inputNewUser = document.querySelector('#nameId')
    const $usersUl = document.querySelector('#users')
    let $buttonAction = ''

    $buttonAddUser.addEventListener('click', addUser)
    $inputNewUser.addEventListener('keyup', pressEnterToSave)
    
    
    function pressEnterToSave(){
        if ( event.key == 'Enter' ) {
            addUser()
        }
    }

    function discoverIndexLiElement(target){
        const $li = target.parentElement
        const usersUlToArray = document.querySelectorAll(`li`); 
        let keyElement = 0
        usersUlToArray.forEach(function(elem,key){
            if ( elem == $li ) {
                keyElement = key
            }
        })

        return keyElement
    }

    function buttonActionUserList(){
        const buttonDataValue = event.target.dataset.value
        const keyElement = discoverIndexLiElement(event.target)
        if ( buttonDataValue == 'edit' ) {
            editUser(event,keyElement)
            return
        }

        deleteUser(event,keyElement)
        return
    }

    function eventListenerButtonsAction(){
        $buttonAction = document.querySelectorAll('.button-action')

        $buttonAction.forEach(function(elem,key) {
            elem.addEventListener("click", buttonActionUserList)
        });
    }

    function addUser(){
        users.push($inputNewUser.value)
        renderList()
    }

    function deleteUser(event, key){
        users.splice(key,1)
        renderList()
    }

    function editUser(event){
        console.log('edit')
    }

    function addToUlElement(){
        users.forEach(function(elem, key){
            const $li = document.createElement('li')
            const $liContent = `
                    <span>${users[key]}</span>
                    <button class='btn btn-warning button-action' data-value='edit'>Edit</button>
                    <button class='btn btn-danger button-action' data-value='delete'>Delete</button>
                `

            $li.innerHTML = $liContent
            $usersUl.append($li)
        })

        eventListenerButtonsAction()
    }

    function clear(){
        $inputNewUser.value = ''
        $usersUl.innerHTML = ''
    }

    function renderList(){
        clear()
        addToUlElement()
    }

    return {
        addUser,
        editUser
    }
})()




