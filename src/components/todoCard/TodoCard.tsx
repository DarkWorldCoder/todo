import React,{useState} from 'react'
import { BsTag } from 'react-icons/bs'
import "./TodoCard.scss"
import { Firestore, collection, doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
interface Props{
  description:string 
  label:string 
  completed:boolean
  id:string
  timestamp:string
}

const TodoCard:React.FC<Props> = ({id,timestamp,description,label,completed}) => {
  const[checked,setChecked] = useState(completed)
  const user = auth.currentUser
  // console.log(timestamp)
  // console.log(id,description,label,completed)
  const changeChecked = async()=>{
    if(user?.uid){
      const docRef = await doc(db,"todos",user?.uid,"user_todo",id)
      await updateDoc(docRef, {
        completed:!checked
    });
    setChecked(prev=>!prev)
    }
   
  }
  return (
    <div className='todo_container'>
        <div className='todo_left'>
        <label className="custom-checkbox" tab-index="0" aria-label="Checkbox Label">
    <input type="checkbox" checked={checked}
    onClick={changeChecked}
    />
    <span className="checkmark"></span>
    
  </label>
        </div>
        <div className='todo_right'>
       <p>{timestamp}</p>
       <h3>{description}</h3>
       <div className='tag_container '>
<div className='tag_icon'>
<BsTag 
style={{width:"30px",height:"30px"}}
fill={label==="normal"?"yellow":"red"} />
    {label}
    </div>
    </div>

      
      </div>
    
    </div>
  )
}

export default TodoCard