import React from 'react';
import DetailCard from '../../../components/ui/DetailCard';

const FollowUpButton: React.FC<{ icon: string; badge?: number; sent?: boolean; isIcon?: boolean; large?: boolean; }> = ({ icon, badge, sent, isIcon, large }) => {
    const baseClasses = "secondary-btn font-semibold rounded-lg flex items-center justify-center transition-colors duration-200";
    const sentClasses = "bg-green-100 border-green-200 cursor-default text-green-800";
    const regularClasses = "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200";

    if (large) {
        return <button className={`${baseClasses} w-10 h-10 ${sent ? sentClasses : regularClasses}`}><i className={`ph ${sent ? 'ph-check' : icon} text-xl`}></i></button>;
    }
    
    if (isIcon) {
        return (
            <button className={`relative p-2 rounded-full ${sent ? sentClasses : regularClasses}`}>
                <i className={`ph-fill ${icon} text-2xl`}></i>
                {badge && <span className="absolute -top-1 -right-1 bg-red-500 text-white w-[18px] h-[18px] rounded-full text-[11px] font-semibold flex items-center justify-center border-2 border-white">{badge}</span>}
                 {sent && <i className="ph ph-check text-xl"></i>}
            </button>
        );
    }
    
    return <button className="bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 text-xs font-semibold py-1.5 px-3 rounded-md flex items-center gap-1.5"><i className={`ph ${icon}`}></i> {badge}</button>
}

const FollowUpAction: React.FC<{ type: 'WhatsApp' | 'Email' }> = ({ type }) => {
    const isWhatsApp = type === 'WhatsApp';
    const iconClass = isWhatsApp ? 'ph-whatsapp-logo text-green-500' : 'ph-envelope-simple text-blue-500';
    
    return (
        <div>
            <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-3">
                <i className={`ph-fill ${iconClass} text-xl`}></i>
                <span>Follow Up {type}</span>
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
                <FollowUpButton large sent icon="" />
                <FollowUpButton isIcon sent icon={iconClass} />
                <FollowUpButton isIcon badge={2} icon={iconClass} />
                <FollowUpButton isIcon badge={3} icon={iconClass} />
                <FollowUpButton isIcon badge={4} icon={iconClass} />
                <FollowUpButton isIcon badge={5} icon={iconClass} />
                <button className="text-xs font-semibold py-1.5 px-3 rounded-md flex items-center gap-1.5 bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"><i className="ph ph-check-circle text-base text-green-600"></i> Complete</button>
                <button className="text-xs font-semibold py-1.5 px-3 rounded-md flex items-center gap-1.5 bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"><i className="ph ph-arrow-circle-up text-base text-blue-600"></i> Upsell</button>
                <button className="text-xs font-semibold py-1.5 px-3 rounded-md flex items-center gap-1.5 bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"><i className="ph ph-x-circle text-base text-red-600"></i> Cancel</button>
            </div>
        </div>
    );
}

const FollowUpCard: React.FC = () => {
    return (
        <DetailCard>
            <h2 className="text-xl font-bold mb-4">Tindakan Follow Up</h2>
            <div className="space-y-6">
                <FollowUpAction type="WhatsApp" />
                <FollowUpAction type="Email" />
            </div>
        </DetailCard>
    );
};

export default FollowUpCard;
