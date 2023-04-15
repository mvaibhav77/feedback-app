import { useContext } from "react"
import FeedbackItem from './FeedbackItem'
import Loader from "./shared/Loader"
import FeedbackContext from "../context/FeedbackContext"

function FeedbackList() {
  const {feedback, isLoading} = useContext(FeedbackContext)

  if(!isLoading && (!feedback || feedback.length ===0)){
    return <p>No FeedBack yet</p>
  }

  
  return isLoading ? <Loader /> : (
    <div className="feedback-list">
      {feedback.map((item) => (
              <FeedbackItem key = {item.id} item={item}/>
        ))}
    </div>

  )
}

export default FeedbackList