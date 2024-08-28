import React, { useEffect, useState, useRef } from "react";

const Rescard = ({ answer, who, id }) => {
  
    const [displayText, setDisplayText] = useState("");
    const indexRef = useRef(0);
    const timeoutRef = useRef(null);
    const speed = 20; // Speed of typing effect
    
    //answer = answer.replace(/\*\*(.*?)\*\*/g, '\n').replace(/\*(.*?)\*/g, '\n').replace(/-/g, '\n');

    useEffect(() => {
        setDisplayText(answer.charAt(0)); // Reset displayText before starting the typing effect
        indexRef.current = 0; // Reset index
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current); // Clear any existing timeouts
        }

        const typeWriter = () => {
          document.querySelector(".body").scrollTo(0, document.body.scrollHeight);
            if (indexRef.current < answer.length) {
                setDisplayText(prev => prev + answer.charAt(indexRef.current));
                indexRef.current++;
                timeoutRef.current = setTimeout(typeWriter, speed);
            }
        };

        typeWriter();
        

        // Cleanup function to clear timeout when component unmounts or answer changes
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [answer]);

    return (
        <div className={`rescard ${who}`} id={id} >
           {displayText}
        </div>
    );
};

export default Rescard;
