import React from "react";

type Props = {
  title: string;
  content: string | number;
};

const InfoCard = ({ title, content }: Props) => {
  return (
    <div className="border border-2 border-blue-600 p-4 flex flex-col">
      <span className="text-lg font-semibold">{title}</span>
      {content}
    </div>
  );
};

export default InfoCard;
