import React, { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { ManagedTeamMember, TeamRole } from '../../types';
import { TeamList } from './components/TeamList';
import { InviteMemberModal } from './components/InviteMemberModal';

const initialTeamMembers: ManagedTeamMember[] = [
    { id: 1, name: 'Zaenal Suep', email: 'zaenalsuep@gmail.com', role: TeamRole.Admin, avatarUrl: 'https://i.pravatar.cc/150?u=zaenal' },
    { id: 2, name: 'Dhea Mufni', email: 'dhea.m@email.com', role: TeamRole.Sales, avatarUrl: 'https://i.pravatar.cc/150?u=dhea' },
    { id: 3, name: 'Antonion', email: 'antonio.dev@email.com', role: TeamRole.Advertiser, avatarUrl: 'https://i.pravatar.cc/150?u=antonion' },
    { id: 4, name: 'Budi Gudang', email: 'budi.gudang@email.com', role: TeamRole.Gudang, avatarUrl: 'https://i.pravatar.cc/150?u=budi' },
];

const TeamPage: React.FC = () => {
    const [members, setMembers] = useState<ManagedTeamMember[]>(initialTeamMembers);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInviteMember = (name: string, email: string, role: TeamRole) => {
        const newMember: ManagedTeamMember = {
            id: Date.now(),
            name,
            email,
            role,
            avatarUrl: `https://i.pravatar.cc/150?u=${email}`,
        };
        setMembers([...members, newMember]);
    };

    const handleDeleteMember = (id: number) => {
        setMembers(members.filter(member => member.id !== id));
    };

    return (
        <div className="flex-1 flex flex-col">
            <Header title="Kelola Tim">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center bg-violet-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-violet-700 transition"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                    Undang Anggota
                </button>
            </Header>
            <div className="flex-1 p-6">
                <TeamList members={members} onDelete={handleDeleteMember} />
            </div>
            <InviteMemberModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onInvite={handleInviteMember}
            />
        </div>
    );
};

export default TeamPage;