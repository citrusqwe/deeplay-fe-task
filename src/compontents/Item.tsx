import React, { useContext } from 'react';
import { Worker } from '../types';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import workersAPI from '../api';
import AvatarPlaceholder from '../assets/avatar-placeholder.jpg';
import { AppContext } from '../App';

interface ItemProps {
  worker: Worker;
  openModal: () => void;
}

const Item: React.FC<ItemProps> = ({ worker, openModal }) => {
  const {
    workers: [workers, setWorkers],
  } = useContext(AppContext);

  const deleteWorker = async () => {
    await workersAPI().deleteWorker(worker.id);
    const filteredWorkers = workers?.filter((w) => w.id !== worker.id) || null;
    setWorkers(filteredWorkers);
  };

  const editWorker = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('id', worker.id);
    // eslint-disable-next-line no-restricted-globals
    history.replaceState(null, '', `?${queryParams.toString()}`);
    openModal();
  };

  return (
    <li
      className="bg-slate-300 rounded-md p-6 mb-4 flex justify-between group"
      key={worker.id}
    >
      <div className="flex">
        <img
          className="w-16 h-16 rounded-full mr-4"
          src={AvatarPlaceholder}
          alt="avatar"
        />
        <div>
          <div>Name: {worker.name}</div>
          <div>Date of birth: {worker.birth}</div>
          <div>Gender: {worker.gender}</div>
          <div>Role: {worker.role}</div>
        </div>
      </div>
      <div className=" transition-opacity opacity-0 group-hover:opacity-100">
        <button className="p-2 bg-white rounded-md mr-2" onClick={editWorker}>
          <AiOutlineEdit />
        </button>
        <button className="p-2 bg-white rounded-md" onClick={deleteWorker}>
          <AiOutlineDelete />
        </button>
      </div>
    </li>
  );
};

export default Item;
