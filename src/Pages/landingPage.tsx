import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputUserName from '../Components/InputUserName/InputUserName';

export default function LandingPage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    const handleUserSubmit = (userName: string) => {
        navigate(`/profile/${userName}`);
    };

    return (
      <>
        <div id="main">
          <InputUserName className="input" onSubmit={handleUserSubmit} />
        </div>
      </>
    );
}