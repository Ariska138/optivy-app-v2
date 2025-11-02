import React from 'react';

interface ActionBarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    filterDate: string;
    setFilterDate: (value: string) => void;
}

const DownloadIcon = () => (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
);

const SearchIcon = () => (
    <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
);

const ActionIcon = () => <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>;
const SortIcon = () => <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9M3 12h9m-9 4h9m5-4v.01M5 8v.01M5 12v.01M5 16v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
const ColumnIcon = () => <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;


export const ActionBar: React.FC<ActionBarProps> = ({ searchTerm, setSearchTerm, filterDate, setFilterDate }) => {
    return (
        <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <button className="p-2 border rounded-lg text-sm hover:bg-gray-100 hover:border-violet-300 transition-colors duration-200" title="Aksi">
                       <ActionIcon />
                    </button>
                     <button className="p-2 border rounded-lg text-sm hover:bg-gray-100 hover:border-violet-300 transition-colors duration-200" title="Custom Sort">
                        <SortIcon />
                    </button>
                    <button className="p-2 border rounded-lg text-sm hover:bg-gray-100 hover:border-violet-300 transition-colors duration-200" title="Custom Kolom">
                        <ColumnIcon />
                    </button>
                    <button className="flex items-center px-4 py-2 border border-transparent rounded-lg text-sm bg-violet-600 text-white hover:bg-violet-700 shadow-sm hover:shadow-md transition-all duration-200">
                       <DownloadIcon />
                        Download
                    </button>
                </div>
                 <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                    <div className="relative w-full sm:w-64">
                        <input 
                            id="searchInput" 
                            type="text" 
                            placeholder="Cari order..." 
                            className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors duration-200 text-gray-900 placeholder-gray-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <SearchIcon />
                    </div>
                    <input 
                        type="date" 
                        id="filterDate" 
                        className="border bg-white border-gray-300 rounded-lg p-2 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors duration-200 text-gray-900" 
                        title="Filter Tanggal"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};
