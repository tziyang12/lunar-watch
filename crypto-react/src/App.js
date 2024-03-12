import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [search, setSearch] = useState("")
  const [currency, setCurrency] = useState([])

  useEffect(() => {
    axios.get('https://openapiv1.coinstats.app/coins', {
      headers: {
        'X-API-KEY': 'MWIVYFTgOhSz6MU7Gh+sqmeQQBSTyiOOAshZW0Vkufc='
      }
    }).then(res => setCurrency(res.data.result))
    .catch(error => console.log(error))
  }, [])

  return (
    <div className="App">
      <h2>Crypto Currency App</h2>
      <input type="text" placeholder="Search..." onChange={e => setSearch(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>Volume (24h)</th>
          </tr>
        </thead>
        <tbody>
          {currency.filter((val) => {
              return val.name.toLowerCase().includes(search.toLowerCase())
          }).map((val) => {
            return <tr>
              <td className="rank">{val.rank}</td>
              <td className="logo">
                <a href={val.websiteUrl}>
                  <img src={val.icon} alt=""/>
                </a>
                <p>{val.name}</p>
              </td>
              <td className="symbol">{val.symbol}</td>
              <td>${val.price.toFixed(2)}</td>
              <td>${val.marketCap}</td>
              <td>{val.volume.toFixed(0)}</td>
            </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
