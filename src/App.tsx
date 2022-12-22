import React,{useEffect,useState,useCallback,useMemo}from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import HomeScreens from './screens/HomeScreens';
import { useRecoilState } from "recoil";
import { overlayState } from './atom/modalAtom';
import {RxCross2} from "react-icons/rx"
import { auth, db } from './firebase';
import Login from './components/Login/Login';
import { onAuthStateChanged } from 'firebase/auth';
import Loading from './Loading/Loading';
import { doc, addDoc,serverTimestamp,collection, setDoc} from "firebase/firestore"; 


function App() {
  // using recoil to set overlay to true or false
  const [overlay,setOverlay] = useRecoilState(overlayState)
  const [user,setUser] = useState(auth.currentUser)
  const [isLoading,setIsloading] = useState(true)
  const [description,setDescription] = useState("")
  const[label,setLabel] = useState("normal")

  const reset = ()=>{
    setOverlay(false)
    setLabel("")
    setDescription("")
  }
  const handleSelectChange = useCallback((e:React.ChangeEvent<HTMLSelectElement>)=>{
    
    setLabel(e.target.value)
    
  },[label])
  const handleInputChange =  useCallback((e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    
    setDescription(e.target.value)
    
  },[label])
  
  useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth,(data)=>{
      setUser(data)
      setIsloading(false)
    })
    return ()=>{
      unSubscribe()
     
    }
  })


  

  const submitData = async()=>{
    if(user?.uid){
      try{
        const docRef = await doc(db,"todos",user?.uid)
        const colRef = collection(docRef, "user_todo")
      
        const data = await addDoc(colRef,
          {
            description:description,
            timestamp:serverTimestamp(),
            label:label,
            completed:false
          })
  
       reset()
      }catch(error){

      }
      
    }

  }

  
  if(isLoading) return <Loading/>
  if(!isLoading && !user) return <Login />
  
  return (
    <div className="app">
  
  <Navbar key="navbar"/>
  <HomeScreens key="homescreens"/>
    {/* if overlay is true show overlay */}
    {overlay&&(
      <div 
      key="overlay"
      className="overlay">
        {/* overlay box that helps you add a text */}
      <div className='overlay_container'>
      <div className='overlay_header'>
      <h1>Add Todo</h1>
      <div
      onClick={reset}
      >
      <RxCross2
      
      />


      </div>
   
      </div>
      {/* end of box */}
      <hr></hr>

      {/* starting of input fields */}

      <div className='input_container'>
       <div className='input_box'>
        <label>Description</label>
        <textarea
        key="description"
        value={description}
        onChange={e=>handleInputChange(e)}
        placeholder="Try Adding Items"/>
       </div>
       <div className='input_box'>
        <label>Label</label>
        <select

        key="select"
        value={label}
        onChange={e=>handleSelectChange(e)}
        >
          <option key="3" value="normal">Normal</option>
          <option key="5" value="important">Important</option>
        </select>
       </div>
      </div>

      {/* final button */}

      <div className='btn_container'>
         <div 
         onClick={reset}
         className='btn'>
          Cancel
        </div>
        <div 
        onClick={submitData}
        className='btn submit'>
        Submit
        </div>
      </div>
  </div>
  </div>
    )}
    
    </div>
  )
}

export default App;
