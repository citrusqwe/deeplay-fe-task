import React, { useContext } from 'react';
import { AppContext } from '../App';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Item from './Item';
import { Worker } from '../types';

const WorkersList = () => {
  const {
    workers: [workers, setWorkers],
    modal: [isModalOpen, setIsModalOpen],
  } = useContext(AppContext);

  const isLoading = !workers;

  const openModal = () => setIsModalOpen(true);

  if (isLoading)
    return (
      <Skeleton
        containerClassName="max-w-4xl w-full"
        className="w-full h-36 mb-4"
        inline
        count={5}
      />
    );

  return (
    <div className="max-w-4xl w-full animate-fadein">
      <ul>
        {workers.map((worker: Worker) => (
          <Item key={worker.id} worker={worker} openModal={openModal} />
        ))}
      </ul>
    </div>
  );
};

export default WorkersList;
