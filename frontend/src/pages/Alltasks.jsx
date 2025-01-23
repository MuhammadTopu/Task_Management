
import React, { useState } from 'react';
import Cards from '../components/Cards';
import InputData from '../components/InputData';

const Alltasks = () => {
  const [inputDivVisibility, setInputDivVisibility] = useState("hidden");

  return (
    <>
      <div>
        
        <Cards home={"false"} setInputDiv={setInputDivVisibility} />
      </div>

      
      {inputDivVisibility !== "hidden" && (
        <div>
          <InputData setInputDiv={setInputDivVisibility} />
        </div>
      )}
    </>
  );
};

export default Alltasks;
