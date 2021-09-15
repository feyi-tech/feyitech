export const notSet = value => {
    return value === undefined || value === null 
}
export const textEmpty = value => {
    return notSet(value) || (typeof value === "string" && value.length == 0)
}