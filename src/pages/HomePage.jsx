import CountersContainer from "../components/CountersContainer"
import HeaderText from "../components/HeaderText"

const HomePage = ({currentUser, counterQuantity, changeCounterQuantity}) => {
  return (
    <div>
      <HeaderText currentUser={currentUser} />
      <CountersContainer currentUser={currentUser} counterQuantity={counterQuantity} changeCounterQuantity={changeCounterQuantity} />
    </div>
  )
}

export default HomePage