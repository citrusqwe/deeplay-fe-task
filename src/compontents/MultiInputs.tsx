import React from 'react';
import { Head, Worker } from '../types';
import Skeleton from 'react-loading-skeleton';

interface MultiInputsProps {
  values: Worker;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  heads: Head[] | null;
}

const MultiInputs: React.FC<MultiInputsProps> = ({
  values,
  handleChange,
  heads,
}) => {
  switch (values.role) {
    case 'director':
      return (
        <input
          name="company"
          type="text"
          placeholder="Enter name of company"
          value={values.company}
          onChange={handleChange}
          className="border border-black rounded-md p-2 mb-4"
        />
      );
    case 'worker':
      if (!heads)
        return (
          <Skeleton
            containerClassName="max-w-4xl w-full"
            className="w-full h-11 mb-4"
            inline
            count={1}
          />
        );
      return (
        <select
          className="w-full border border-black rounded-md p-2 mb-4 animate-fadein"
          name="head"
          value={values.head}
          onChange={handleChange}
        >
          {heads?.map((head) => (
            <option key={head.id} value={head.id}>
              {head.name}
            </option>
          ))}
        </select>
      );
    case 'controller':
    case 'department-head':
      return (
        <select
          className="w-full border border-black rounded-md p-2 mb-4"
          name="head"
          value={values.head}
          onChange={handleChange}
        >
          <option value="first">First</option>
          <option value="second">Second</option>
          <option value="third">Third</option>
        </select>
      );

    default:
      break;
  }

  return null;
};

export default MultiInputs;
