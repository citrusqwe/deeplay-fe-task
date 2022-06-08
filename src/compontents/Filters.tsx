import React, { useContext, useEffect, useState } from 'react';
import workersAPI from '../api';
import { AppContext } from '../App';

const Filters = () => {
  const [filter, setFilter] = useState<{
    role: string | undefined;
    division: string | undefined;
  }>({
    role: '',
    division: '',
  });
  const {
    workers: [data, setData],
  } = useContext(AppContext);

  const handleSetFilter = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFilter({ ...filter, [e.target.name]: e.target.value });

  const getWorkers = async () => {
    const list = await workersAPI().getWorkers(filter);
    setData(list);
  };

  useEffect(() => {
    getWorkers();
  }, [filter]);

  return (
    <div className="mb-5">
      <form>
        <label htmlFor="role">
          <span className="mr-2">Role:</span>
          <select
            className="border border-black rounded-md p-2 mb-4 mr-12"
            name="role"
            value={filter.role}
            onChange={handleSetFilter}
          >
            <option value="">All</option>
            <option value="worker">Worker</option>
            <option value="director">Director</option>
            <option value="department-head">Department Head</option>
            <option value="controller">Controller</option>
          </select>
        </label>
        <label htmlFor="division">
          <span className="mr-2">Division:</span>
          <select
            className="border border-black rounded-md p-2 mb-4"
            name="division"
            value={filter.division}
            onChange={handleSetFilter}
          >
            <option value="">All</option>
            <option value="first">First</option>
            <option value="second">Second</option>
            <option value="third">Third</option>
          </select>
        </label>
      </form>
    </div>
  );
};

export default Filters;
