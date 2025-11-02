import React from 'react';
import { Lead } from '../../../types';
import DetailCard from '../../../components/ui/DetailCard';

export const LeadView: React.FC<{ lead: Lead }> = ({ lead }) => (
    <DetailCard>
        <h2 className="text-xl font-bold mb-4">Lead: {lead.product}</h2>
        <p className="text-gray-600">Tampilan detail untuk Lead sedang dalam pengembangan.</p>
         <div className="mt-4 space-y-2">
            <p><strong>Customer:</strong> {lead.customer}</p>
            <p><strong>Follow Up (WA):</strong> Stage {lead.followupStage}</p>
            <p><strong>Follow Up (Email):</strong> Stage {lead.fuEmailStage}</p>
        </div>
    </DetailCard>
);
