import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import InputUserName from '../Components/InputUserName/InputUserName';
import { isValidUsername } from '../lib/utils/isValidUsername';
import NoDataMessage from '../Components/NoDataMessage/NoDataMessage';

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
            <NoDataMessage 
              username={checkedUsername}
              message="User not found"
              suggestion="This username doesn't exist in the Chess.com database. Please check the spelling and try again."
            />
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