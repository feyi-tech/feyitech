import { getAddress } from "@ethersproject/address"
import { isAddress } from "../web3/utils"
import { LOCAL_STORAGE, SITE_DOMAIN_SLASH, SITE_PROTOCOL, REFERRAL_PATH_SLASH } from "./c"

export const isClient = () => {
    return typeof window !== 'undefined'
}

export const isProduction = () => {
    return false
}
export const isDev = () => {
    if(isClient()) return ! '%NODE_ENV%' || '%NODE_ENV%' === 'development'
    return !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
}


export const removeStopwords = (str, separator) => {
    const STOP_WORDS = ['a', 'able', 'about', 'above', 'abroad', 'according', 'accordingly', 'across', 'actually', 'adj', 'after', 'afterwards', 'again', 'against', 'ago', 'ahead', "ain't", 'all', 'allow', 'allows', 'almost', 'alone', 'along', 'alongside', 'already', 'also', 'although', 'always', 'am', 'amid', 'amidst', 'among', 'amongst', 'an', 'and', 'another', 'any', 'anybody', 'anyhow', 'anyone', 'anything', 'anyway', 'anyways', 'anywhere', 'apart', 'appear', 'appreciate', 'appropriate', 'are', "aren't", 'around', 'as', "a's", 'aside', 'ask', 'asking', 'associated', 'at', 'available', 'away', 'awfully', 'b', 'back', 'backward', 'backwards', 'be', 'became', 'because', 'become', 'becomes', 'becoming', 'been', 'before', 'beforehand', 'begin', 'behind', 'being', 'believe', 'below', 'beside', 'besides', 'best', 'better', 'between', 'beyond', 'both', 'brief', 'but', 'by', 'c', 'came', 'can', 'cannot', 'cant', "can't", 'caption', 'cause', 'causes', 'certain', 'certainly', 'changes', 'clearly', "c'mon", 'co', 'com', 'come', 'comes', 'concerning', 'consequently', 'consider', 'considering', 'contain', 'containing', 'contains', 'corresponding', 'could', "couldn't", 'course', "c's", 'currently', 'd', 'dare', "daren't", 'definitely', 'described', 'despite', 'did', "didn't", 'different', 'directly', 'do', 'does', "doesn't", 'doing', 'done', "don't", 'down', 'downwards', 'during', 'e', 'each', 'edu', 'eg', 'eight', 'eighty', 'either', 'else', 'elsewhere', 'end', 'ending', 'enough', 'entirely', 'especially', 'et', 'etc', 'even', 'ever', 'evermore', 'every', 'everybody', 'everyone', 'everything', 'everywhere', 'ex', 'exactly', 'example', 'except', 'f', 'fairly', 'far', 'farther', 'few', 'fewer', 'fifth', 'first', 'five', 'followed', 'following', 'follows', 'for', 'forever', 'former', 'formerly', 'forth', 'forward', 'found', 'four', 'from', 'further', 'furthermore', 'g', 'get', 'gets', 'getting', 'given', 'gives', 'go', 'goes', 'going', 'gone', 'got', 'gotten', 'greetings', 'h', 'had', "hadn't", 'half', 'happens', 'hardly', 'has', "hasn't", 'have', "haven't", 'having', 'he', "he'd", "he'll", 'hello', 'help', 'hence', 'her', 'here', 'hereafter', 'hereby', 'herein', "here's", 'hereupon', 'hers', 'herself', "he's", 'hi', 'him', 'himself', 'his', 'hither', 'hopefully', 'how', 'howbeit', 'however', 'hundred', 'i', "i'd", 'ie', 'if', 'ignored', "i'll", "i'm", 'immediate', 'in', 'inasmuch', 'inc', 'indeed', 'indicate', 'indicated', 'indicates', 'inner', 'inside', 'insofar', 'instead', 'into', 'inward', 'is', "isn't", 'it', "it'd", "it'll", 'its', "it's", 'itself', "i've", 'j', 'just', 'k', 'keep', 'keeps', 'kept', 'know', 'known', 'knows', 'l', 'last', 'lately', 'later', 'latter', 'latterly', 'least', 'less', 'lest', 'let', "let's", 'like', 'liked', 'likely', 'likewise', 'little', 'look', 'looking', 'looks', 'low', 'lower', 'ltd', 'm', 'made', 'mainly', 'make', 'makes', 'many', 'may', 'maybe', "mayn't", 'me', 'mean', 'meantime', 'meanwhile', 'merely', 'might', "mightn't", 'mine', 'minus', 'miss', 'more', 'moreover', 'most', 'mostly', 'mr', 'mrs', 'much', 'must', "mustn't", 'my', 'myself', 'n', 'name', 'namely', 'nd', 'near', 'nearly', 'necessary', 'need', "needn't", 'needs', 'neither', 'never', 'neverf', 'neverless', 'nevertheless', 'new', 'next', 'nine', 'ninety', 'no', 'nobody', 'non', 'none', 'nonetheless', 'noone', 'one', 'nor', 'normally', 'not', 'nothing', 'notwithstanding', 'novel', 'now', 'nowhere', 'o', 'obviously', 'of', 'off', 'often', 'oh', 'ok', 'okay', 'old', 'on', 'once', 'one', 'ones', "one's", 'only', 'onto', 'opposite', 'or', 'other', 'others', 'otherwise', 'ought', "oughtn't", 'our', 'ours', 'ourselves', 'out', 'outside', 'over', 'overall', 'own', 'p', 'particular', 'particularly', 'past', 'per', 'perhaps', 'placed', 'please', 'plus', 'possible', 'presumably', 'probably', 'provided', 'provides', 'q', 'que', 'quite', 'qv', 'r', 'rather', 'rd', 're', 'really', 'reasonably', 'recent', 'recently', 'regarding', 'regardless', 'regards', 'relatively', 'respectively', 'right', 'round', 's', 'said', 'same', 'saw', 'say', 'saying', 'says', 'second', 'secondly', 'see', 'seeing', 'seem', 'seemed', 'seeming', 'seems', 'seen', 'self', 'selves', 'sensible', 'sent', 'serious', 'seriously', 'seven', 'several', 'shall', "shan't", 'she', "she'd", "she'll", "she's", 'should', "shouldn't", 'since', 'six', 'so', 'some', 'somebody', 'someday', 'somehow', 'someone', 'something', 'sometime', 'sometimes', 'somewhat', 'somewhere', 'soon', 'sorry', 'specified', 'specify', 'specifying', 'still', 'sub', 'such', 'sup', 'sure', 't', 'take', 'taken', 'taking', 'tell', 'tends', 'th', 'than', 'thank', 'thanks', 'thanx', 'that', "that'll", 'thats', "that's", "that've", 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'thence', 'there', 'thereafter', 'thereby', "there'd", 'therefore', 'therein', "there'll", "there're", 'theres', "there's", 'thereupon', "there've", 'these', 'they', "they'd", "they'll", "they're", "they've", 'thing', 'things', 'think', 'third', 'thirty', 'this', 'thorough', 'thoroughly', 'those', 'though', 'three', 'through', 'throughout', 'thru', 'thus', 'till', 'to', 'together', 'too', 'took', 'toward', 'towards', 'tried', 'tries', 'truly', 'try', 'trying', "t's", 'twice', 'two', 'u', 'un', 'under', 'underneath', 'undoing', 'unfortunately', 'unless', 'unlike', 'unlikely', 'until', 'unto', 'up', 'upon', 'upwards', 'us', 'use', 'used', 'useful', 'uses', 'using', 'usually', 'v', 'value', 'various', 'versus', 'very', 'via', 'viz', 'vs', 'w', 'want', 'wants', 'was', "wasn't", 'way', 'we', "we'd", 'welcome', 'well', "we'll", 'went', 'were', "we're", "weren't", "we've", 'what', 'whatever', "what'll", "what's", "what've", 'when', 'whence', 'whenever', 'where', 'whereafter', 'whereas', 'whereby', 'wherein', "where's", 'whereupon', 'wherever', 'whether', 'which', 'whichever', 'while', 'whilst', 'whither', 'who', "who'd", 'whoever', 'whole', "who'll", 'whom', 'whomever', "who's", 'whose', 'why', 'will', 'willing', 'wish', 'with', 'within', 'without', 'wonder', "won't", 'would', "wouldn't", 'x', 'y', 'yes', 'yet', 'you', "you'd", "you'll", 'your', "you're", 'yours', 'yourself', 'yourselves', "you've", 'z', 'zero']
    var res = []
    var words = str.split(separator)
    for(var i = 0; i < words.length; i++) {
       var word_clean = words[i].split(".").join("")
       if(!STOP_WORDS.includes(word_clean)) {
           res.push(word_clean)
       }
    }
    return(res.join(separator))
}

export const slugify = (string, leaveStopWords, lang) => {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
    
    var slug = string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'

    if(!leaveStopWords) {
        var stopWordsRemoved =  removeStopwords(slug, "-")
        if(stopWordsRemoved.length > 0) {
            slug = stopWordsRemoved
        }
    }

    slug = slug
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text

    return slug
}

export const createId = (text) => {
    return slugify((text || ""), true)
}


export const replaceNumMillSeparator = (num, separator) => {
    return parseInt(num).toLocaleString("en").replace(/,/g, " ")
}

export const saveRefId = refId => {
    saveToStorage(LOCAL_STORAGE.refId, refId)
}

export const saveRefUserId = userId => {
    saveToStorage(LOCAL_STORAGE.refUserId, userId)
}

export const getRefId = () => {
    return getFromStorage(LOCAL_STORAGE.refId)
}

export const getRefUserId = () => {
    return getFromStorage(LOCAL_STORAGE.refUserId)
}
const USER_ID_BALANCER = 10000000//10 million
//this method use used for creating referral link
//unique id by converting the position of the user
//in the array of users sorted in ascending order(first user = 0) 
//in order to make the unique id have the same length, a constant 
//value is added to each position before creating the unique id by base 10 to 36 convertion
export const userIdToRefId = userId => {
    try {
        return (parseInt(userId) + USER_ID_BALANCER).toString(36)

    } catch(e) {
        return null
    }
}
//converts base refferal link's unique id to registration position of the user
export const refIdToUserId = refId => {
    try {
        return parseInt(refId, 36) - USER_ID_BALANCER

    } catch(e) {
        return null
    }
}

export const refLinkFromRefId = refId => {
    return `${ SITE_PROTOCOL }${ SITE_DOMAIN_SLASH }${ REFERRAL_PATH_SLASH }${ refId.toLowerCase() }`
}
export const refLinkFromUserId = userId => {
    const refId = userIdToRefId(userId)
    if(refId) return refLinkFromRefId(refId)
    return null
}

export const saveToStorage = (key, value, session) => {
    if(!isClient()) return
    if(!session) {
        window.localStorage.setItem(key, value)

    } else {
        var expiry = ( (new Date()).getTime() / 1000 ) + session
        window.localStorage.setItem(key, JSON.stringify({data: value, expiry: expiry}))
    }
}

export const emptyToNull = value => {
    if(value == "") return null
    return value
}

export const getFromStorage = (key, isSession) => {
    if(!isClient()) return null
    if(!isSession) {
        return window.localStorage.getItem(key)

    } else {
        var item = window.localStorage.getItem(key)
        if(!item || item.length == 0) {
            return null

        } else {
            item = JSON.parse(item)
            var expiry = parseInt(item.expiry)
            var now = (new Date()).getTime() / 1000
            if(!item.data) {
                return null

            } else if(expiry <= now) {
                window.localStorage.setItem(key, JSON.stringify({data: "", expiry: 0}))
                return null

            } else {
                return item.data
            }
        }
    }
}

export const textIsNumber = (text, excludedNumbers) => {
    text = String(text)
    try {
        var num = parseInt(text)
        //console.log("QUERY_:", text, num)

        return !isNaN(num) && (!excludedNumbers || !excludedNumbers.includes(num))
    } catch (error) {
        return false
    }
}

export const handleNetError = (e, onMessage, onRequestSpecific) => {
    
}

export const logIn = (router, address) => {
    if(address && address.length > 0) {
        saveToStorage(LOCAL_STORAGE.loginAddress, address.trim())
        if(router) router.push("/dashboard")

    } else {
        var userAddress = getFromStorage(LOCAL_STORAGE.loginAddress)
        console.log("UserAddr:", userAddress)
        if(userAddress && userAddress.length > 0) {
            if(router) router.push("/dashboard")
        }
    }
}
export const logOut = router => {
    saveToStorage(LOCAL_STORAGE.loginAddress, "")
    if(router) router.push("/login")
}

export const buildProductLink = (name, id) => {
    return `/products/${slugify(name)}-${id}`
}

export const buildPackageLink = (name, id) => {
    return `/packages/${slugify(name)}-${id}`
}

export const destroySlugLink = link => {
    var linkShreds = link.split("/")
    
    var i = linkShreds[0].length > 0? 0 : 1

    var slug = linkShreds[linkShreds.length - 1] || ""
    return {
        slug: slug,
        id: slug.split("-").pop()
    }
}

export const toLocaleString = (number, locale, decimals) => {
    if(isNaN(number)) number = 0;
    return number.toLocaleString(locale, {
        minimumFractionDigits: decimals || 0, 
        maximumFractionDigits: decimals || 0
    })
}

export const copyText = e => {
    if(e) {
        var target = e.target
        var text = target.getAttribute("data-copy")
        copyFromText(text, () => {
            target.setAttribute("data-copy-msg", target.getAttribute("data-copy-ok") || "Text Copied.")
        }, 
        err => {
            target.setAttribute("data-copy-msg", target.getAttribute("data-copy-failed") || "Text Copy failed.")
        })
    }
}

export const copyFromTextFallBack = (text, onCopy, onError) => {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
        if(onCopy) onCopy()
    } catch (e) {
        console.error('Fallback: Oops, unable to copy', e);
        if(onError) onError(e)
    }
    
    document.body.removeChild(textArea);
}

export const copyFromText = (text, onCopy, onError) => {
    if (!navigator.clipboard) {
        copyFromTextFallBack(text, onCopy, onError);
        return;
    }
    navigator.clipboard.writeText(text)
    .then( () => {
        console.log('Async: Copying to clipboard was successful!')
        if(onCopy) onCopy()
    })
    .catch(e => {
        console.error('Async: Could not copy text: ', e)
        if(onError) onError(e)
    })
}


export function shortenAddress(address, chars = 4) {
    const parsed = isAddress(address)
    if (!parsed) {
      throw Error(`Invalid 'address' parameter '${address}'.`)
    }
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

export const removeItem = (array, item) => {
    array.splice(array.indexOf(item), 1)
}