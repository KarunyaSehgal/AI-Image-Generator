import React, {useRef, useState } from "react";
import './ImageGenerator.css'
import default_image from '../Assets/default_image.jpg'

const ImageGenerator = () => {
    const [image_url,setImage_url] = useState("/");
    let inputRef = useRef(null);
    //used for updating the image of thwe web page
    const [loading,setLoading] = useState(false);
    //loading bar jab generate pe click karenge tab dikhna chahiye, usse pehle nahi isliye false kardiya
 
 
    const imageGenerator = async () => {
        if(inputRef.current.value===""){
            return 0;
            //agar koi input text nahi diya
        }
        setLoading(true);
        //before image loaded the "loading" text will be shown
        //debugger;
        const response = await fetch (
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:
                    // console.log("Hello", process.env.REACT_APP_OPENAI_API_KEY)
                    `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                    "User-Agent":"Chrome",
                },
                body: JSON.stringify({
                    prompt:`${inputRef.current.value}`,
                    //get the text written in the input field
                    n:1,
                    //we want only 1 image result
                    size:"512x512",
                    //what size image do we want
                }),
            }
        );
        let data = await response.json();
        // console.log(data);
        //image ka url console mein dikh jaayega, just copy its string path
        let data_array=data.data;
        setImage_url(data_array[0].url);
        setLoading(false);
        //after image loaded the "loading" text will be removed
    }
    return (
        <div className="ai-image-generator">
            <div className="header">AI Image <span>generator</span></div>
            <div className="img-loading">
                <div className="image"><img src={image_url==="/"?default_image:image_url} alt=""></img></div>
                <div className="loading">
                    <div className={loading?"loading-bar-full":"loading-bar"}></div>
                    <div className={loading?"loading-text":"display-none"}>Loading.....</div>
                </div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef} className="search-input" placeholder="Describe What You Want To See"/>
                <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
            </div>
        </div>
    )
 }
 
 
 export default ImageGenerator; 