import { Main } from "./pages/Main";

function App() {
  // const [currenciesFrom, setCurrenciesFrom] = useState("USD");
  // const [currenciesTo, setCurrenciesTo] = useState("EUR");
  // const [amount, setAmount] = useState<string>("0");
  // const [exchangeRate, setExchangeRate] = useState(0);
  // const [inverseRate, setInverseRate] = useState(0);
  // const currencies = useCurrenciesList();
  // const [result, setResult] = useState(0);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (!amount) return;

  //   const timeout = setTimeout(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get<Currency>(
  //           "https://api.fxratesapi.com/latest",
  //           {
  //             params: {
  //               api_key: import.meta.env.VITE_API_KEY,
  //               amount,
  //               base: currenciesFrom,
  //             },
  //           }
  //         );
  //         const { rates } = response.data;
  //         setExchangeRate(rates[currenciesTo]);
  //         setInverseRate(
  //           Number(amount) * (rates[currenciesFrom] / rates[currenciesTo])
  //         );
  //       } catch (error) {
  //         console.error("Ошибка при получении данных:", error);
  //       }
  //     };

  //     fetchData();
  //   }, 250);

  //   return () => clearTimeout(timeout);
  // }, [amount, currenciesFrom, currenciesTo, isOnline]);

  return (
    <section>
      <Main />
      {/* 
        <p>Result:</p>
        <p>
          Exchange Rate {amount} {currenciesFrom} = {exchangeRate}{" "}
          {currenciesTo}
        </p>
        <p>
          Inverse Rate {amount} {currenciesTo} = {inverseRate} {currenciesFrom}
        </p> */}
    </section>
  );
}

export default App;
