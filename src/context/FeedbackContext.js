import { createContext,  useState, useEffect } from "react"

const FeedbackContext = createContext()

export const FeedbackProvider = ({children})=>{
    const [isLoading, setIsLoading] = useState(true);
    const [feedback,setFeedback] = useState([])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item:{},
        edit: false,
    })

    useEffect(()=>{
        fetchFeedback()
    },[])


    // Delete feedback
    const deleteFeedback = async (id)=>{
        if(window.confirm(`Delete Feedback ${id}???`)){
            await fetch(`/feedback/${id}`, {method: 'DELETE'})
            setFeedback(feedback.filter((item)=> item.id!==id))
        }
    }

    // Add Feedback
    const addFeedback = async (newFeedback)=>{
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFeedback),
        })
        const data = await response.json();
        setFeedback([data, ...feedback])
    }

    // Update Feedback
    const updateFeedback = async (id, updatedFeedback) =>{
        const res = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFeedback)
        })

        const data = await res.json();

        setFeedback(feedback.map((item)=>(item.id) === id ? {...item,...data} : item))
    }

    // SET ITEM TO UPDATE
    const editFeedback = (item)=>{
        setFeedbackEdit({
            item,
            edit:true
        })
    }

    // CRUD Functions for db.json
    // fetching ServerData from db.json
    const fetchFeedback = async ()=>{
        const feed = fetch('/feedback?_sort=id&_order=desc');
        const feedRes = await feed;
        feedRes.json().then((data)=>setFeedback(data));
        setIsLoading(false);
    }

    


    return (
        <FeedbackContext.Provider 
           value={{
            feedback, 
            isLoading,
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