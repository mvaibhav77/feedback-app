import { createContext,  useState } from "react"
import { v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children})=>{
    const [feedback,setFeedback] = useState([
        {
            id:1,
            text: 'This item 1 is from context',
            rating:9
        },
        {
            id:2,
            text: 'This item 2 is from context',
            rating:10
        }
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item:{},
        edit: false,
    })

    // Delete feedback
    const deleteFeedback = (id)=>{
        if(window.confirm("ARE YOU SURE???")){
            setFeedback(feedback.filter((item)=> item.id!==id))
        }
    }

    // Add Feedback
    const addFeedback = (newFeedback)=>{
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    // Update Feedback
    const updateFeedback = (id, updatedFeedback) =>{
        setFeedback(feedback.map((item)=>(item.id) === id ? {...item,...updatedFeedback} : item))
    }


    // SET ITEM TO UPDATE
    const editFeedback = (item)=>{
        setFeedbackEdit({
            item,
            edit:true
        })
    }


    return (
        <FeedbackContext.Provider 
           value={{
            feedback, 
            deleteFeedback,
            addFeedback,
            editFeedback,
            updateFeedback,
            feedbackEdit
        }}>

                 {children}

        </FeedbackContext.Provider>
    )

}


export default FeedbackContext