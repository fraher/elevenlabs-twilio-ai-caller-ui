import { useState } from "react";

interface ApiResponse {
  message?: string;
  error?: string;
}

function App() {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

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

      const data: ApiResponse = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: "Request failed" });
    }
  };

  return (
    <div>
      <h1>Server is Running</h1>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={sendRequest}>Send Request</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}

export default App;
