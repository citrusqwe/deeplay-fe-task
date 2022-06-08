import React, { createContext, useState } from 'react';
import Modal from 'react-modal';
import WorkerForm from './compontents/WorkerForm';
import { Worker } from './types';
import { GrClose } from 'react-icons/gr';
import Filters from './compontents/Filters';
import WorkersList from './compontents/WorkersList';

Modal.setAppElement('#root');

export const AppContext = createContext<{
  workers: [
    Worker[] | null,
    React.Dispatch<React.SetStateAction<Worker[] | null>>
  ];
  modal: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}>({
  workers: [[], () => {}],
  modal: [false, () => {}],
});

function App() {
  const [workers, setWorkers] = useState<Worker[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    // eslint-disable-next-line no-restricted-globals
    history.pushState('', '', window.location.origin);
    setIsModalOpen(false);
  };
  const openModal = () => setIsModalOpen(true);

  return (
    <>
      <AppContext.Provider
        value={{
          workers: [workers, setWorkers],
          modal: [isModalOpen, setIsModalOpen],
        }}
      >
        <div className="flex justify-center px-4">
          <div className="max-w-7xl w-full flex flex-col items-center">
            <header className="w-full py-10 flex justify-between items-center mb-6">
              <a href="/">Workers</a>
              <button
                className="p-2 bg-slate-300 rounded-md transition hover:brightness-95"
                onClick={openModal}
              >
                Add new worker
              </button>
            </header>
            <Filters />
            <WorkersList />
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="absolute inset-28 inset-x-1/4 bg-white p-8 shadow-xl"
        >
          <div className="flex justify-between mb-4 ">
            <h2>Worker modal</h2>
            <button className="text-lg" onClick={closeModal}>
              <GrClose />
            </button>
          </div>
          <WorkerForm closeModal={closeModal} />
        </Modal>
      </AppContext.Provider>
    </>
  );
}

export default App;
