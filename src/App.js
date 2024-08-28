import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Rescard from './Rescard';

const API_URL = 'https://chatbot-telegram-440x.onrender.com/';

const App = () => {
    const [text, setText] = useState("");
    const [response, setResponse] = useState([]);

    useEffect(() => {
        setResponse([{ text: "hi there how may i help you", who: "received" }]);
    }, []);

    function getResponse(e) {
        e.preventDefault();
        if (text.trim() !== "") {
            setResponse(prevResponse => [...prevResponse, { text: text, who: "sent" }]);

            axios.post(API_URL + "/text", { prompt: text })
                .then(async function (res) {
                    var data = await res.data;

                    console.log(data);
                    if (typeof data === "string") {
                        setResponse(prevResponse => [...prevResponse, { text: data, who: "received" }]);
                    } else {
                        setResponse(prevResponse => [...prevResponse, { text: "error", who: "received" }]);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    setResponse(prevResponse => [...prevResponse, { text: "no network", who: "received" }]);
                });
            setText("");
        }
    }

    return (
        <div className="app">
            <div className="head">
                <img src="icon.png" alt="icon" />
            </div>
            {
                response.length > 0
                    ? (
                        <div className="body">
                            {
                                response.map(
                                    (res, i) => (<Rescard answer={res.text} who={res.who} id={"id" + i} key={i} />)
                                )
                            }
                        </div>
                    ) : (
                        <div className="body">
                            messages....
                            {console.log(response)}
                        </div>
                    )
            }
            <div className="foot">
                <form className="form" onSubmit={getResponse}>
                    <input type="text" value={text} onChange={(e) => { setText(e.target.value) }} className="text" />
                    <input type="submit" value="send" className="send" />
                </form>
            </div>
        </div>
    );
}

export default App;
