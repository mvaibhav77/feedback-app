import { useState, useContext, useEffect  } from "react"
import FeedbackContext from "../context/FeedbackContext"
import Card from "./shared/Card"
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";

function FeedbackForm() {
    const { addFeedback, updateFeedback, feedbackEdit } = useContext(FeedbackContext)

    const [text, setText] = useState('')
    const [rating, setRating] = useState(10)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')

    useEffect(()=>{
        if(feedbackEdit.edit === true){
            setBtnDisabled(false);
            setText(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating);
        }
    },[feedbackEdit])

    const handleText = (e)=>{
        if(text === ''){
            setMessage(null)
            setBtnDisabled(true)
        }else if(text !== '' && text.trim().length <=10){
            setBtnDisabled(true)
            setMessage('Text must be atleast 10 characters...')
        }else{
            setMessage(null)

            setBtnDisabled(false)
        }

        setText(e.target.value);

    }

    const handleSubmit = (e)=>{
        if(text.trim().length > 10){
            const newFeedback = {
                text,
                rating
            }
            addFeedback(newFeedback)
            setText('')

        }

        e.preventDefault()
    }

    const handleUpdate = (e)=>{
        if(text.trim().length > 10){
            const newFeedback = {
                id:feedbackEdit.item.id,
                text,
                rating
            }          
            updateFeedback(feedbackEdit.item.id,newFeedback)
            setText('')
        }

        e.preventDefault()
    }

  return (
    <Card>
        <form onSubmit={(feedbackEdit) ? handleUpdate : handleSubmit}>
            <h2>How would you rate us?</h2>
            <RatingSelect select={setRating} selected={rating} />
            <div className="input-group">
                <input onChange={handleText} type="text" placeholder='Write a review' value={text} />
                <Button type="submit" children= "Send" isDisabled={btnDisabled}/>
            </div>
            
            {message && <div className="message">{message}</div>}

        </form>
    </Card>
  )
}


export default FeedbackForm