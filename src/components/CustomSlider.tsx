import React, { ChangeEvent, useState } from "react";

interface SliderProps {
  text: string;
  maxValue: number;
  stepping: number;
  onChange: (value: number) => void;
}

const CustomSlider: React.FC<SliderProps> = ({
  maxValue,
  text,
  onChange,
  stepping,
}) => {
  const [selectedValue, setSelectedValue] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setSelectedValue(value);
    onChange(value);
  };

  const displayText =
    text === "Interest rate"
      ? `Interest rate: ${selectedValue}%`
      : text === "Repayment time"
      ? `Repayment time: ${selectedValue} years`
      : `${text}: $ ${selectedValue}`;

  return (
    <div className="flex flex-col max-md:flex-shrink">
      <div className="flex flex-row items-center mb-4 gap-4">
        <h1 className="text-2xl font-semibold max-md:text-sm">{displayText}</h1>
      </div>
      <input
        type="range"
        min={0}
        max={maxValue}
        onChange={handleChange}
        step={stepping}
        className="w-80 appearance-none h-3 rounded-lg bg-gray-300 outline-none max-md:w-[12rem]"
        style={{
          background: `linear-gradient(to right, #8c56ff 0%, #8c56ff ${
            (selectedValue / maxValue) * 100
          }%, #c0c0ff ${(selectedValue / maxValue) * 100}%, #e0e0e0 100%)`,
        }}
      />
    </div>
  );
};

export default CustomSlider;
