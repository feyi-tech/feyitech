
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
  primaryButtonBg: {
    light: "#3929c5",
    dark: "#3929c5"
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
    light: "#3929c5",
    dark: "#3929c5"
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