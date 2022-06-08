import React from 'react';

interface HeaderProps {
  openModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ openModal }) => {
  return (
    <header className="w-full py-10 flex justify-between items-center mb-6">
      <a href="/">Workers</a>
      <button
        className="p-2 bg-slate-300 rounded-md transition hover:brightness-95"
        onClick={openModal}
      >
        Add new worker
      </button>
    </header>
  );
};

export default Header;
