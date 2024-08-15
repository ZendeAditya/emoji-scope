"use client";
import React, { useState } from "react";

interface Props {}

const DatePicker = (props: Props) => {
  const [date, setDate] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const getResponse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date }),
      });

      const data = await res.json();
      if (data.geminiResponse) {
        setResponse(data.geminiResponse);
      } else {
        setResponse("No response from server.");
      }
    } catch (error) {
      console.error(error);
      setResponse("Error occurred while fetching data.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 py-4 flex-col">
      <form className="flex flex-col text-center" onSubmit={getResponse}>
        <div>
          <label htmlFor="dateId" className="py-4">
            Enter your DOB
          </label>
        </div>
        <div>
          <input
            type="date"
            name="date"
            id="dateId"
            value={date}
            onChange={handleChange}
            className="py-2 my-3 cursor-pointer border-2 px-2 rounded-lg shadow-lg w-72"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg shadow-lg text-white bg-green-500 hover:bg-green-600 w-52"
          >
            Generate
          </button>
        </div>
      </form>
      <div className="py-2 px-5 text-justify lg:px-20
      ">
        <p>{response}</p>
      </div>
    </div>
  );
};

export default DatePicker;
