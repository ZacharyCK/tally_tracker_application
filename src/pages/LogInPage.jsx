import LogInForm from "../components/LogInForm"

const LogInPage = ({isDarkTheme, url}) => {
  return (
    <LogInForm isDarkTheme={isDarkTheme} url={url} />
  )
}

export default LogInPage