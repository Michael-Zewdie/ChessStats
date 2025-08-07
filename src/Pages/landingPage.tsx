import { useNavigate } from 'react-router-dom';
import InputUserName from '../Components/InputUserName/InputUserName';
import { isValidUsername } from '../lib/utils/isValidUsername';

export default function LandingPage() {
    const navigate = useNavigate();

    const handleUserSubmit = async (userName: string) => {
        if (!userName.trim()) return;
        
        try {
            const valid = await isValidUsername(userName);
            
            if (valid) {
                navigate(`/profile/${userName}`);
            } else {
                navigate(`/error?username=${encodeURIComponent(userName)}&message=${encodeURIComponent('User not found')}&suggestion=${encodeURIComponent("This username doesn't exist in the Chess.com database. Please check the spelling and try again.")}`);
            }
        } catch {
            navigate(`/error?username=${encodeURIComponent(userName)}&message=${encodeURIComponent('User not found')}&suggestion=${encodeURIComponent("This username doesn't exist in the Chess.com database. Please check the spelling and try again.")}`);
        }
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
          <div id="main" style={{ display: 'contents' }}>
            <InputUserName 
              className="input" 
              onSubmit={handleUserSubmit}
            />
          </div>
        </div>
      </>
    );
}