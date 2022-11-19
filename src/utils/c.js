import { isProduction } from "./f";


//import appAbi from '../web3/abis/GreenCoindle.json'
import { utils } from "ethers";
import { FaBehance, FaFacebook, FaGithub, FaMedium, FaReddit, FaTelegram, FaTwitter } from "react-icons/fa";

const fbIcon = "/images/fbicon.png"
const twIcon = "/images/twitter.svg"
const tgIcon = "/images/tg.svg"
const rIcon = "/images/reddit.png"
const mIcon = "/images/medium.png"

export const CURRENCY = {
    name: "USD",
    symbol: "$"
}

export const PRIMARY_COLOR = "#F8D12F"
export const SEC_COLOR = "rgb(14,203,129)"

export const BTN_COLOR = "#fff"
export const BTN_BG = "#f0b528"

export const APP_NAME = "FeyiTech"
export const AIR_DROP_ACTIVE = true;
export const PRESALE_ACTIVE = true;
export const FUNDING_ACTIVE = false;
export const PROJECTS_ACTIVE = false;
export const TEAM_ACTIVE = false;
export const TITLE_SEPARATOR = " - "

export const CONTACT_FORM_ID = "W5uiXq2U"
export const G_RECAPTCHA_KEY = "6LeJPmUcAAAAADC7yY49R5rVKuEpxTohfVFRT24m"

export const URL_BASE = "http://feyitech.com"
export const DB_DEFAULT_LOCALE = "en"

export const CONTACT = {
    email: "hello@feyitech.com",//"hello@feyitech.com",
    mobile: "+39 323 826 7650",
    address: "Via Nazionale 46, Staben(BZO) \nItaly"
}

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"

export const ECT_DECIMAL_ZEROS = "000000000"
export const CURRENCY_DECIMAL_ZEROS = "000000000000000000"
export const REG_COST_STRING = "10" + CURRENCY_DECIMAL_ZEROS
export const SITE_PROTOCOL = (() => {
    if(isProduction()) {
      return "https://"
  
    } else {
      return "http://"
    }
})()
export const SITE_DOMAIN_SLASH = (() => {
    if(isProduction()) {
      return "tronpipe.io/"
  
    } else {
      return "localhost:2000/"
    }
})()
export const REFERRAL_PATH_SLASH = "n/"

//Testnet: https://data-seed-prebsc-1-s1.binance.org:8545
//MAINNET: https://bsc-dataseed1.binance.org
export const NETWORK_URL = "https://data-seed-prebsc-1-s1.binance.org:8545"
//Testnet: 97
//MAINNET: 56
export const REACT_APP_CHAIN_ID = "97"

export const BLOCK_CHAIN_ADDRESS_SCAN_PREFIX = {
    main: "https://bscscan.com/address/",
    test: "https://testnet.bscscan.com/address/"
}
export const CONTRACT_ADDRESSES = {
    app: "0x..."
}

export const READ_ONLY_WALLET = {
    key: "READ_ONLY",
    privateKey: "",
    address: ""
}

export const LOCAL_STORAGE = {
    web3ConnectorKey: "web3ConnectorKey",
    refId: "refId",
    refUserId: "refUserId",
    loginAddress: "loginAddress"
}

export const SOCIAL_LINKS = {
    twitter: {
        link: `https://www.twitter.com/feyi_tech`,
        icon: twIcon,
        settings: {
            disabled: false
        },
        getButton: size => {
            return <FaTwitter size={size} h={size} />
        }
    },
    telegram: {
        link: `https://t.me/earnchain_official`,
        icon: tgIcon,
        settings: {
            disabled: true
        },
        getButton: size => {
            return <FaTelegram size={size} h={size} />
        }
    },
    reddit: {
        link: `https://reddit.com/r/earnchain`,
        icon: rIcon,
        settings: {
            disabled: true
        },
        getButton: size => {
            return <FaReddit size={size} h={size} />
        }
    },
    facebook: {
        link: `https://facebook.com/feyitech`,
        icon: fbIcon,
        settings: {
            disabled: true
        },
        getButton: size => {
            return <FaFacebook size={size} h={size} />
        }
    },
    medium: {
        link: `https://medium.com/@earnchain`,
        icon: mIcon,
        settings: {
            disabled: true
        },
        getButton: size => {
            return <FaMedium size={size} h={size} />
        }
    },
    github: {
        link: `https://github.com/feyi-tech`,
        icon: mIcon,
        settings: {
            disabled: false
        },
        getButton: size => {
            return <FaGithub size={size} h={size} />
        }
    },
    behance: {
        link: `https://behance.net/feyitech`,
        icon: mIcon,
        settings: {
            disabled: true
        },
        getButton: size => {
            return <FaBehance size={size} h={size} />
        }
    },
}
export const ERROR_CODES = {
    META_MASK_TX_DECLINED: 4001
}
export const EVENTS_FILTERS = {
}