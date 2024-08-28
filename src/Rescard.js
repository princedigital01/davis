import React, { useEffect, useState, useRef } from "react";

const Rescard = ({ answer, who }) => {
    const [displayText, setDisplayText] = useState("");
    const indexRef = useRef(0);
    const timeoutRef = useRef(null);
    const speed = 50; // Speed of typing effect

    useEffect(() => {
        setDisplayText(answer.charAt(0)); // Reset displayText before starting the typing effect
        indexRef.current = 0; // Reset index
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current); // Clear any existing timeouts
        }

        const typeWriter = () => {
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
        <div className={`rescard ${who}`}>
            {displayText}
        </div>
    );
};

export default Rescard;
