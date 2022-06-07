import React from "react";
import { useFetchCapitals, useFetchCountryNames, useFetchCurrencyCodes, useFetchPhoneCodes } from "../util/useFetch"

const CountryTable = () => {
  const [countryNames, loadingNames] = useFetchCountryNames();
  const [capitals, loadingCapitals] = useFetchCapitals();
  const [phoneCodes, loadingPhoneCodes] = useFetchPhoneCodes();
  const [currencyCodes, loadingCurrencyCodes] = useFetchCurrencyCodes();
  
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    if (countryNames && capitals && phoneCodes && currencyCodes) {
      const dataArray = [];
      for (const code in countryNames) {
        dataArray.push({
          code: code, 
          name: countryNames[code],
          capital: capitals[code],
          phoneCode: phoneCodes[code],
          currencyCode: currencyCodes[code]
        })
      }
      setData(dataArray);
    }
  }, [countryNames, capitals, phoneCodes, currencyCodes]);

  const handleRowsSort = (key) => {
    return () => {
      const newData = [...data].sort((a, b) => {
        if (a[key] > b[key]) return 0;
        return -1;
      })
      setData(newData);
    }
  }

  const renderTableRows = () => {
    return data.map(d => 
      <tr>
        <td>{d.name}</td>
        <td>{d.capital}</td>
        <td>{d.phoneCode}</td>
        <td>{d.currencyCode}</td>
      </tr>
    )
  }

  return loadingNames || loadingCapitals || loadingPhoneCodes || loadingCurrencyCodes ? (<div>Loading...</div>) : (
    <table>
      <thead>
        <tr>
          <th onClick={handleRowsSort('name')}>Country name</th>
          <th onClick={handleRowsSort('capital')}>Capital</th>
          <th onClick={handleRowsSort('phoneCode')}>Phone code</th>
          <th onClick={handleRowsSort('currencyCode')}>Currency code</th>
        </tr>
      </thead>
      <tbody>
        {renderTableRows()}
      </tbody>
    </table>
    )
}

export default CountryTable;