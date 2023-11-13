const openDrawer = () => {
    return {
        type: 'openDrawer'
    }
}
const closeDrawer = () => {
    return {
        type: 'closeDrawer'
    }
}

const login = () => {
    return {
        type: 'login'
    }
}
const logout = () => {
    return {
        type: 'logout'
    }
}
const openProfileMenu = () => {
    return {
        type: 'openProfileMenu'
    }
}

const closeProfileMenu = () => {
    return {
        type: 'closeProfileMenu'
    }
}
const navigateHome = () => {
    return {
        type: 0
    }
}
const navigateClasses = () => {
    return {
        type: 1
    }
}
const navigatePrices = () => {
    return {
        type: 2
    }
}
const navigateAboutus = () => {
    return {
        type: 3
    }
}
const navigateContactus = () => {
    return {
        type: 4
    }
}
const navigateBlog = () => {
    return {
        type: 5
    }
}

const addUseri = ()=>{
    return {
        type: 'addUserId'
    }
}
const getUserId = ()=>{
    return {
        type: 'getUserId'
    }
}
