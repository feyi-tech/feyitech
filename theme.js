
import { extendTheme } from "@chakra-ui/react"
// Extend the theme to include custom colors, fonts, etc

export const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
  pageBg: {
    light: "#f4f4f4",
    dark: "#222329"
  },
  cardBg: {
    light: "#f4f4f4",
    dark: "#27262c"
  },
  pageBgTrans: {
    light: "rgba(220,220,220,0.96)",
    dark: "rgba(0,0,0,0.5)"
  },
  pageColor: {
    light: "#222329",
    dark: "#f4f4f4"
  },
  navbarBg: {
    light: "rgba(220,220,220,0.96)",
    dark: "#242526"
  },
  navbarColor: {
    light: "#242526",
    dark: "rgba(220,220,220,0.96)"
  },
  navbarShadow: {
    light: "#0D1121",
    dark: "#0D1121"
  },
  homeBg: {
    light: "linear-gradient(139.73deg, rgb(230, 253, 255) 0%, rgb(243, 239, 255) 100%)",
    dark: "radial-gradient(103.12% 50% at 50% 50%, rgb(33, 25, 58) 0%, rgb(25, 19, 38) 100%)"
  },
  homeBg2: {
    light: "linear-gradient(rgb(255, 255, 255) 22%, #f4f4f4 100%)",
    dark: "linear-gradient(rgba(9, 7, 12, 1) 22%, #222329 100%)"
  },
  primaryButtonBg: {
    light: "#27C827",
    dark: "#27C827"
  },
  primaryButtonColor: {
    light: "#FFF",
    dark: "#FFF"
  },
  link: {
    light: "#050505",
    dark: "#e4e6eb"
  },
  linkHover: {
    light: "#27C827",
    dark: "#27C827"
  },
  colorAccent: {
    light: "#f0b528",
    dark: "#f0b528"
  },
  colorAccentInverse: {
    light: "#32404e",
    dark: "#32404e"
  },
  colorError: {
    light: "#b00020",
    dark: "#b00020"
  },
  border: {
    light: "rgba(153,153,153,0.16)",
    dark: "rgba(153,153,153,0.16)"
  }
}
// Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}
// extend the theme
const theme = extendTheme({ colors, config })
export default theme