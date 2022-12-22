import React,{useEffect,useCallback,useState,useMemo} from 'react'
import "./Right.scss"
import {RxHamburgerMenu} from "react-icons/rx"
import TodoCard from '../todoCard/TodoCard'
import {doc, collection, query, where, onSnapshot, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

import { auth, db } from '../../firebase'
interface Props{

}

interface User{
  description:string
}
const Right:React.FC= () => {
  const user  = auth.currentUser
  const [data,setData] = useState<Array<DocumentData>>([])
  
  function convertTimestamp(timestamp:any) {
    var date
    if(timestamp){
      date = timestamp.toDate().toDateString()
    }
    else{
      date="Today"
    }
    // let mm = date.getMonth();
    // let dd = date.getDate();
    // let yyyy = date.getFullYear();
  
    // date = mm + '/' + dd + '/' + yyyy;
    return date;
  }
  useEffect(()=>{
    if(user?.uid){
      let collectionRef = collection(db, "todos", user?.uid, "user_todo");

      onSnapshot(collectionRef, (snapshot) => {
        setData(snapshot.docs.map(doc=>
         {
          return{
            id:doc.id,
            data:doc.data()
          }
        
        }));
    
    })
    
  }

  

},[])



  
  return (
    // whole container
    <div className='right_container'>
      {/* right side of the header where heading text will be displayed */}
    <div className="right_header">
      <h2>All Task</h2>
      {/* right side of the header that contain dropdown box and more */}
      <div className='right_header_box'>
     <select>
      <option>Newest</option>
      <option>Oldest</option>
     </select>
     <div className='header_icon'>
     <RxHamburgerMenu />
     </div>
      </div>
    </div>


    {/* todo cards */}
    <div className='todo_card'>
      {data.length>0 ?data.map((info,idx)=>(
        <TodoCard 
        key={idx}
        id={info.id}
        label={info.data.label}
        completed={info.data.completed}
        description={info.data.description}
        timestamp={convertTimestamp(info.data.timestamp)}
        />
      )):(
        <div className='no_task'>
          <h1>No new task</h1>
        </div>
        
      )
        
        
      }
    
    

    </div>
   
    </div>
  )
}

export default Right