import React from 'react';

const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const SearchIcon = () => <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>;

interface ActionBarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    onAddProduct: () => void;
}

export const ActionBar: React.FC<ActionBarProps> = ({ searchTerm, setSearchTerm, onAddProduct }) => {
    return (
        <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                 <div className="relative w-full sm:w-64">
                    <input 
                        type="text" 
                        placeholder="Cari produk..." 
                        className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors duration-200 text-gray-900 placeholder-gray-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <SearchIcon />
                </div>
                <button 
                    onClick={onAddProduct}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                    <PlusIcon />
                    Buat Produk
                </button>
            </div>
        </div>
    );
};
