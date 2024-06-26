import React, { createContext, useState } from 'react'
import runChat from '../Config/gemini'
export const Context = createContext();

const ContextProvider = (props) => {

    const [input , setInput] = useState("");
    const [recentPrompt , setRecentPrompt] = useState("");
    const [previousPrompts , setPreviousPrompts] = useState([]);
    const [showResult , setShowResult] = useState(false);
    const [loading , setLoading] = useState(false);
    const [resultData , setResultData] = useState("");

    const delayPara = (index , nextWord) =>{
        setTimeout(function() {
            setResultData(prev => prev+nextWord)
        } , 75*index)
    }

    async function onSent(){

        setResultData(""); //so that the prevoius response will be removed 
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);
        setPreviousPrompts(prev => [...prev , input]); //for prevoius prompts , for history


        const response = await runChat(input);
        console.log(typeof response); // Check the type of response

        const answer = response();
        console.log(typeof answer);
        const responseArray = answer.split("**");

        // console.log(responseArray)
        let newResponse ; 
        for(let i = 0;i<responseArray.length ; i++){
            if(i === 0 || i%2 !== 1 ){
                newResponse += responseArray[i];
            }else{
                newResponse += "</br>"+"<b>" + responseArray[i] + "</b>" 
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");

        for(let i = 0 ; i < newResponseArray.length ; i++){
            const nextWord = newResponseArray[i];
            delayPara(i , nextWord+" ")
        }
        setLoading(false);
        setInput("");// so that after getting the answer the input field will be empty
    }

    // onSent("What is react-js")

    const contextValue = {
        previousPrompts,
        setPreviousPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider
