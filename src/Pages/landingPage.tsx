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
      <div className="landing-page">
        <div className="landing-container">
          <InputUserName 
            className="input" 
            onSubmit={handleUserSubmit}
          />
        </div>
      </div>
    );
}