import { DB_DEFAULT_LOCALE } from "../utils/c"

export const getLocaleColName = (name, locale) => {
    if(!locale) locale = DB_DEFAULT_LOCALE
    return `${name}_${locale}`
}