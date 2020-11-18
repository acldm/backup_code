const KeyState = {
    KEYUP: 0,
    KEYDOWN: 1,
    KEYPRESS: 2,
}

const keys = new Map()

window.addEventListener('keydown', function(e) {
    keys.set(e.keyCode, KeyState.KEYDOWN)
})

window.addEventListener('keypress', function(e) {
    keys.set(e.keyCode, KeyState.KEYPRESS)
})

window.addEventListener('keyup', function(e) {
    keys.delete(e.keyCode, KeyState.KEYUP)
})

export default {
    
    isKeyDown(keyCode) {
        if (keys.get(keyCode) == KeyState.KEYDOWN
            || keys.get(keyCode) == KeyState.KEYPRESS) {
            return true
        }

        return false
    },
    isKeyUp(keyCode) {
        if (keys.get(keyCode) == KeyState.KEYUP) {
            return true
        }

        return false
    }
}