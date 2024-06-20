import CountersContainer from "../components/CountersContainer"

const HomePage = ({currentUser}) => {
  return (
    <CountersContainer currentUser={currentUser} />
  )
}

export default HomePage