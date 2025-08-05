import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import InputUserName from '../Components/InputUserName/InputUserName';
import { isValidUsername } from '../lib/utils/isValidUsername';

export default function LandingPage() {
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [checkedUsername, setCheckedUsername] = useState<string>('');

    const handleUserSubmit = async (userName: string) => {
        if (!userName.trim()) return;
        
        setCheckedUsername(userName);
        
        try {
            const valid = await isValidUsername(userName);
            setIsValid(valid);
            
            if (valid) {
                navigate(`/profile/${userName}`);
            }
        } catch (error) {
            console.error('Error validating username:', error);
            setIsValid(false);
        }
    };

    const handleInputChange = () => {
        setIsValid(null); // Clear error message when user types
    };

    return (
      <>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          gap: '1rem'
        }}>
          {isValid === false && (
            <div style={{
              color: '#ff6b6b',
              textAlign: 'center',
              fontSize: '2rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              maxWidth: '800px'
            }}>
              "{checkedUsername}" doesn't exist in the Chess.com database
            </div>
          )}
          <div id="main" style={{ display: 'contents' }}>
            <InputUserName 
              className="input" 
              onSubmit={handleUserSubmit}
              onInputChange={handleInputChange}
            />
          </div>
        </div>
      </>
    );
}