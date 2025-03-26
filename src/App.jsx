import React, { use, useEffect, useState } from 'react'
import './App.css'
import { GoogleGenerativeAI } from '@google/generative-ai'

function App() {
  let [input,setInput]=useState("")
  // console.log(input)
  let [prompt,setPrompt]=useState('')
  let [fileContent,setFileContent]=useState("")
  let [chatHistory,setChathistory]=useState([])
  let dummy=[]
  // let [promptArray,setPromptArray]=useState([])

  useEffect(()=>{
   
    fetch("/ShivaPrasad.txt")
    .then((response)=>response.text())
    .then((text)=>setFileContent(text))
    .catch((error)=>error)
  },[])
  const handleSend=async ()=>{
    if(input.trim!=""){
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// console.log("API Key:", apiKey);
      const genAI=new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
      const promptInput="You are my assistant, responding directly to recruiters based on the following user information. Provide precise, positive, and complete answers. If specific details are not available, infer relevant strengths based on the given information. If no relevant information is found, respond with 'Information not provided.' Ensure that responses are well-structured and fully address the input User information:"+fileContent+" input: "+input
      const result = await model.generateContent(promptInput);
      
      setPrompt(result.response.text())
      // console.log(result.response.text())
     dummy.push({
      userText:input,
      answer:result.response.text(),
     })
     setChathistory([...chatHistory,...dummy])
     setInput('')
    }
  }
  // console.log(prompt)
  return (
    <div className='bg-gray-300 '>
      <h1 className='text-5xl text-center text-gray-800'>BSP Bot</h1><br />
    
      <div className='flex flex-col gap-1'>
      {
        chatHistory.map((value,index)=>(
          <div key={index} className=' bg-gray-800 text-white p-4 rounded-lg gap-1 m-5'>
            <p ><b>Question: </b>{value.userText}</p>
            <pre className="whitespace-pre-wrap break-words"><b>Answer: </b>{value.answer}</pre>
          </div>
        ))
      }
     </div>
     <div className=' p-5 flex justify-center'>
     <br /><input type="text" placeholder='Ask anything about me....' onChange={(e)=>setInput(e.target.value)} value={input} className='input-group w-2xl h-10 border-2 bg-white rounded-lg mr-1.5 p-3'/>
      <button onClick={handleSend} className='text-2xl border-2 rounded-lg bg-gray-600 text-white w-20 border-black h-10 hover:cursor-pointer hover:bg-gray-800 '>Ask</button>
      
     </div>
     
      
    {/* <br /> <pre className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-lg whitespace-pre-wrap break-words border border-gray-300 dark:border-gray-700">{prompt}</pre> */}
     
     
    </div>
  )
}

export default App
