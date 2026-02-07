import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface PasscodeGateProps {
  onUnlock: () => void;
}

const CORRECT_PASSCODE = '182004032007';

export default function PasscodeGate({ onUnlock }: PasscodeGateProps) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleNumberClick = (num: string) => {
    if (passcode.length < 12) {
      setPasscode(passcode + num);
      setError(false);
    }
  };

  const handleDelete = () => {
    setPasscode(passcode.slice(0, -1));
    setError(false);
  };

  const handleClear = () => {
    setPasscode('');
    setError(false);
  };

  const handleSubmit = () => {
    if (passcode === CORRECT_PASSCODE) {
      onUnlock();
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setTimeout(() => {
        setPasscode('');
        setError(false);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-romantic-blush via-romantic-pink to-romantic-rose p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">🔒</h1>
          <h2 className="text-2xl font-bold text-white mb-2">Enter Passcode</h2>
          <p className="text-white/80 text-sm">Enter the special code to unlock</p>
        </div>

        <div className={`bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl ${isShaking ? 'animate-shake' : ''}`}>
          {/* Display */}
          <div className="mb-6">
            <div className={`bg-gradient-to-r from-romantic-blush to-romantic-pink/30 rounded-2xl p-4 min-h-[60px] flex items-center justify-center ${error ? 'ring-2 ring-destructive' : ''}`}>
              <div className="flex gap-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i < passcode.length
                        ? 'bg-romantic-rose scale-110'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            {error && (
              <p className="text-destructive text-sm text-center mt-2 font-medium">
                Incorrect passcode. Try again!
              </p>
            )}
          </div>

          {/* Number Pad */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
              <Button
                key={num}
                onClick={() => handleNumberClick(num)}
                className="h-16 text-2xl font-semibold bg-gradient-to-br from-romantic-pink to-romantic-rose hover:from-romantic-rose hover:to-romantic-pink text-white shadow-lg"
                disabled={passcode.length >= 12}
              >
                {num}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button
              onClick={handleClear}
              variant="outline"
              className="h-16 text-lg font-medium border-2 border-romantic-pink text-romantic-rose hover:bg-romantic-blush"
            >
              Clear
            </Button>
            <Button
              onClick={() => handleNumberClick('0')}
              className="h-16 text-2xl font-semibold bg-gradient-to-br from-romantic-pink to-romantic-rose hover:from-romantic-rose hover:to-romantic-pink text-white shadow-lg"
              disabled={passcode.length >= 12}
            >
              0
            </Button>
            <Button
              onClick={handleDelete}
              variant="outline"
              className="h-16 text-lg font-medium border-2 border-romantic-pink text-romantic-rose hover:bg-romantic-blush"
            >
              ⌫
            </Button>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full mt-4 h-14 text-lg font-semibold bg-gradient-to-r from-romantic-rose to-romantic-gold hover:from-romantic-gold hover:to-romantic-rose text-white shadow-xl"
            disabled={passcode.length !== 12}
          >
            Unlock
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
