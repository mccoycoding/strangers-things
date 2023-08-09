//Capitalizes first letter of a string
function capitalize(string) {
    //If string is a string
    if (typeof string === "string") {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    //If string is not a string
    console.error("capitalize() requires a string as a parameter")
    return
}



export { capitalize }