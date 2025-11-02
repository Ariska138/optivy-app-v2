// OtpVerification.tsx (REFACTORED)
import React, {
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
  type KeyboardEvent,
  type ClipboardEvent,
} from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useOTP } from '@hooks/useOTP';

const OTP_LENGTH = 6;

const OtpVerification: React.FC = () => {
  // State for OTP inputs remains the same
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // State for email and success messages
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  // **REMOVED**: Local loading and error states are now handled by useOTP
  // const [error, setError] = useState<string | null>(null);
  // const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAuthState } = useAuth();

  // **NEW**: Instantiate the useOTP hook
  const {
    isLoading,
    error: otpError,
    sendOtp,
    verifyOtp,
  } = useOTP<{ token: string; user: { role: string } }>();

  // This logic remains unchanged
  useEffect(() => {
    const userEmail = searchParams.get('email');
    if (userEmail) {
      setEmail(userEmail);
    } else {
      navigate('/register');
    }
    inputRefs.current[0]?.focus();
  }, [searchParams, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (/^\d+$/.test(pasteData)) {
      const digits = pasteData.slice(0, OTP_LENGTH).split('');
      const newOtp = [...otp];
      digits.forEach((digit, i) => (newOtp[i] = digit));
      setOtp(newOtp);
      const lastFilledIndex = Math.min(OTP_LENGTH - 1, digits.length - 1);
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  // **REFACTORED**: handleVerifyClick now uses the hook
  const handleVerifyClick = async () => {
    setMessage(null); // Clear previous messages
    const otpCode = otp.join('');

    // Call the verification function from the hook
    const result = await verifyOtp(email, otpCode);

    if (result && result.user) {
      setAuthState(result.user);
      // -----------------------------------------------------------

      setMessage('Verifikasi berhasil! Mengarahkan ke dashboard...');

      // Redirect user based on role
      if (result.user.role === 'admin') {
        navigate('/dashboard/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
    // Error state is automatically handled by the hook and displayed in the JSX
  };

  // **REFACTORED**: handleResendClick now uses the hook
  const handleResendClick = async () => {
    setMessage('Mengirim ulang kode...');

    // Call the resend function from the hook
    const result = await sendOtp(email);

    // If result is not null, the request was successful
    if (result) {
      setMessage(result.message || 'Kode baru telah dikirim ke email Anda.');
    }
    // Error state is automatically handled by the hook
  };

  const isButtonDisabled = otp.some((digit) => digit === '');

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mx-4">
        {/* Header (unchanged) */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Verifikasi Akun Anda
          </h1>
          <p className="text-gray-500 mt-2">
            Masukkan 6 digit kode yang kami kirimkan ke alamat email <br />
            <span className="font-medium text-gray-700">{email}</span>
          </p>
        </div>

        {/* Form Input OTP (unchanged) */}
        <div className="mt-8">
          <div className="flex justify-center gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="\d{1}"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition duration-200"
              />
            ))}
          </div>
        </div>

        {/* **UPDATED**: Display error from hook */}
        <div className="mt-4 text-center">
          {otpError && (
            <p className="text-sm text-red-600">{otpError.message}</p>
          )}
          {message && <p className="text-sm text-green-600">{message}</p>}
        </div>

        {/* **UPDATED**: Use isLoading from hook */}
        <div className="mt-8">
          <button
            onClick={handleVerifyClick}
            disabled={isButtonDisabled || isLoading}
            className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold text-base transition duration-300 ease-in-out hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Memverifikasi...' : 'Verifikasi'}
          </button>
        </div>

        {/* **UPDATED**: Use isLoading from hook */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Tidak menerima kode?{' '}
            <button
              onClick={handleResendClick}
              className="font-semibold text-purple-500 hover:text-purple-600 disabled:text-gray-400"
              disabled={isLoading}
            >
              Kirim Ulang
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
