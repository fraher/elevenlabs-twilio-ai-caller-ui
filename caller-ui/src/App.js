import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
function App() {
    const [response, setResponse] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const sendRequest = async () => {
        try {
            const res = await fetch("/outbound-call", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    number: phoneNumber,
                    prompt: "You are an assistant",
                }),
            });
            const data = await res.json();
            setResponse(data);
        }
        catch (error) {
            setResponse({ error: "Request failed" });
        }
    };
    return (_jsxs("div", { children: [_jsx("h1", { children: "Server is Running" }), _jsx("input", { type: "text", placeholder: "Enter phone number", value: phoneNumber, onChange: (e) => setPhoneNumber(e.target.value) }), _jsx("button", { onClick: sendRequest, children: "Send Request" }), response && _jsx("pre", { children: JSON.stringify(response, null, 2) })] }));
}
export default App;
