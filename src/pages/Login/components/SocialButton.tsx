import React from 'react';

interface SocialButtonProps {
    provider: string;
    logoSrc: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider, logoSrc }) => {
    return (
        <button type="button" className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
            <img className="w-auto h-6 mr-3" src={logoSrc} alt={`Logo ${provider}`} />
            Masuk dengan {provider}
        </button>
    );
};

export default SocialButton;