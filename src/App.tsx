import { useState } from "react";
import CustomSlider from "./components/CustomSlider";

function App() {
  const [purchasePrice, setPurchasePrice] = useState<number>(0);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [repaymentTime, setRepaymentTime] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [quoteRequested, setQuoteRequested] = useState<boolean>(false);
  const handlePurchasePrice = (value: number) => {
    setPurchasePrice(value);
  };
  const handleDownPayment = (value: number) => {
    setDownPayment(value);
  };

  const handleRepaymentTime = (value: number) => {
    setRepaymentTime(value);
  };

  const handleInterestRate = (value: number) => {
    setInterestRate(value);
  };

  const handleEstimatedMonthlyPayment = (): number => {
    const loanAmount = purchasePrice - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = repaymentTime * 12;
    const discountFactor =
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1) /
      (monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments));
    return Math.floor(loanAmount / discountFactor);
  };

  const handleGetQuote = () => {
    setQuoteRequested(true);
  };
  const handleReset = ()=>{
    setPurchasePrice(0);
    setDownPayment(0);
    setRepaymentTime(0);
    setInterestRate(0);
    setQuoteRequested(false);
  };
  const sliders = [
    {
      id: 1,
      text: "Purchase price",
      maxValue: 1000000,
      onChange: handlePurchasePrice,
      stepping: 1000
    },
    {
      id: 2,
      text: "Down payment",
      maxValue: 1000000,
      onChange: handleDownPayment,
      stepping: 1000
    },
    {
      id: 3,
      text: "Repayment time",
      maxValue: 35,
      onChange: handleRepaymentTime,
      stepping: 1
    },
    {
      id: 4,
      text: "Interest rate",
      maxValue: 100,
      onChange: handleInterestRate,
      stepping: 1
    }
  ];
  

  return (
    <div className="grid grid-cols-1 items-center justify-center p-20 mt-44 rounded-[2rem] mx-10 bg-[#edeef6] gap-10 md:w-[80rem] md:mx-auto max-md:w-full max-md:mt-8">
      <div className="text-3xl font-semibold p-10 max-md:text-xl max-md:p-0">Mortgage calculator</div>
      <div className="grid  grid-cols-2 grow max-md:grid-cols-1">
      {sliders.map((slider) => (
          <CustomSlider
            key={slider.id}
            text={slider.text}
            maxValue={slider.maxValue}
            onChange={slider.onChange}
            stepping={slider.stepping}
          />
        ))}
        <div className="flex flex-col gap-4">
          <div className="text-xl font-semibold max-md:text-sm">Loan amount:</div>
          {quoteRequested ? (
            <h1 className="text-2xl font-semibold max-md:text-base">
              ${purchasePrice - downPayment}
            </h1>
          ) : (
            <h1 className="text-2xl font-semibold">-</h1>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-xl font-semibold max-md:text-sm">Estimated pr.month:</div>
          <h1 className="text-2xl font-semibold max-md:text-base">
            {quoteRequested ? `$${handleEstimatedMonthlyPayment()}` : "-"}
          </h1>
        </div>
      </div>
      <div
        className="bg-[#8c56ff] w-fit py-6 px-12 text-white rounded-lg hover:opacity-60 active:opacity-100 cursor-pointer max-md:py-4 max-md:px-6"
        onClick={handleGetQuote}
      >
        Get a mortgage quote
      </div>
      <div
        className="bg-slate-400 w-fit py-6 px-[6.8rem] text-white rounded-lg hover:opacity-60 active:opacity-100 cursor-pointer max-md:py-4 max-md:px-20"
        onClick={handleReset}
      >
        Reset
      </div>
    </div>
  );
}

export default App;
