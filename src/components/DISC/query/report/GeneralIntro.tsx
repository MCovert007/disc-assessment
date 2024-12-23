import React from "react";

export default function GeneralIntro() {

  return (
    <React.Fragment>
      <div>
        <p className="">
          The DISC model is a renowned psychological framework that categorizes behavior into four main components : &nbsp;
          <span className="text-red">Dominance (D)</span>,&nbsp;
          <span className="text-yellow-500">Influence (I)</span>,&nbsp;
          <span className="text-green-500">Steadiness (S)</span>, and&nbsp;
          <span className="text-blue-500">Conscientiousness (C)</span>.<br/>
          Each element represents a different personality trait.
        </p>
        <p className="text-center mb-4">
          It helps in understanding an individual&apos;s preferred pace (fast vs. slow) and their preference for tasks or people.
        </p>
        <ol className="md:px-16 hidden" style={{listStyle:'circle'}}>
          <li className="flex py-1">
            <span className="min-w-[180px] text-red">●	Dominance : </span>
            <p>People with high D scores are assertive, goal-oriented, and decisive.</p>
          </li>
          <li className="flex py-1">
            <span className="min-w-[180px] text-yellow-500">●	Influence : </span>
            <p>Those with high I scores are sociable, talkative, and persuasive.</p>
          </li>
          <li className="flex py-1">
            <span className="min-w-[180px] text-green-500">● Steadiness : </span>
            <p>Individuals scoring high in S are dependable, calm, and supportive.</p>
          </li>
          <li className="flex py-1">
            <span className="min-w-[180px] text-blue-500">●	Conscientiousness : </span>
            <p>High C scorers are accurate, analytical, and careful.</p>
          </li>
        </ol>

      </div>
    </React.Fragment>
  );
}