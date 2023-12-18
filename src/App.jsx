import { useEffect, useMemo, useState } from "react";
import "./App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import priceData from "./data.json";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const startDateFormat = useMemo(
    () =>
      `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()}`,
    [startDate]
  );
  const endDateFormat = useMemo(
    () => `${endDate.getFullYear()}-${endDate.getMonth()}-${endDate.getDate()}`,
    [endDate]
  );

  const options = [
    { value: "INR", text: "INR" },
    { value: "US", text: "US" },
  ];
  const [currencySelected, setCurrencySelected] = useState(options[0].value);

  const [loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true);
    setData(null);
    setTimeout(() => {
      setLoading(false);
      setData(priceData);
    }, 2000);
  };

  return (
    <>
      <div className="title">Price Index</div>
      <div className="flex-horizontal">
        <div>
          <div>Start Date</div>
          <div>
            <DatePicker
              showIcon
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>
        <div>
          <div>Start Date</div>
          <div>
            <DatePicker
              showIcon
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>
        </div>
        <div>
          <div>Select Currency</div>
          <div>
            <select
              className="select-currency"
              value={currencySelected}
              onChange={(event) => setCurrencySelected(event.target.value)}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div>
        <button onClick={getData}>Get Price Index</button>
      </div>
      <br />
      {loading && <div class="loader" />}
      {data ? (
        <>
          <div className="flex-horizontal-2">
            <div>
              <div className="minmax-title">Max Price</div>
              <div>Date : {data.high.date}</div>
              <div>Price : {data.high.price}</div>
            </div>
            <div>
              <div className="minmax-title">Min Price</div>
              <div>Date : {data.low.date}</div>
              <div>Price : {data.low.price}</div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.bpi).map(([date, price]) => {
                return (
                  <tr key={date}>
                    <td>{date}</td>
                    <td>{price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : null}
    </>
  );
}

export default App;
