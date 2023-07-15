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

  return (
    <div className="grid grid-cols-1 items-center justify-center p-20 mt-44 rounded-[2rem] mx-10 bg-[#edeef6] gap-10 md:w-[80rem] md:mx-auto ">
      <div className="text-3xl font-semibold p-10">Mortgage calculator</div>
      <div className="grid  grid-cols-2 grow">
        <CustomSlider
          text="Purchase price"
          maxValue={1000000}
          onChange={handlePurchasePrice}
          stepping={1000}
        />
        <CustomSlider
          text="Down payment"
          maxValue={1000000}
          onChange={handleDownPayment}
          stepping={1000}
        />
        <CustomSlider
          text="Repayment time"
          maxValue={35}
          onChange={handleRepaymentTime}
          stepping={1}
        />
        <CustomSlider
          text="Interest rate"
          maxValue={100}
          onChange={handleInterestRate}
          stepping={1}
        />
        <div className="flex flex-col gap-4">
          <div className="text-xl font-normal">Loan amount:</div>
          {quoteRequested ? (
            <h1 className="text-2xl font-semibold">
              ${purchasePrice - downPayment}
            </h1>
          ) : (
            <h1 className="text-2xl font-semibold">-</h1>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-xl font-normal">Estimated pr.month:</div>
          <h1 className="text-2xl font-semibold">
            {quoteRequested ? `$${handleEstimatedMonthlyPayment()}` : "-"}
          </h1>
        </div>
      </div>
      <div
        className="bg-[#8c56ff] w-fit py-6 px-12 text-white rounded-lg hover:opacity-60 active:opacity-100 cursor-pointer"
        onClick={handleGetQuote}
      >
        Get a mortgage quote
      </div>
    </div>
  );
}

export default App;
