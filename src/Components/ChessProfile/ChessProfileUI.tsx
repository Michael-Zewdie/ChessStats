import { useChessProfile } from "../../hooks/useChessProfile";
import ChessProfileBox from "./ChessProfileBox";

// Skeleton loader for profile


interface ChessProfileUIProps {
    username: string | undefined;
}

export default function ChessProfileUI({ username }: ChessProfileUIProps) {
    const { profile, country, error } = useChessProfile(username);

    
    if (!profile || error) {
        return <div>User not found</div>;
    } 
    
    return (
        <div className="fixed top-6 left-80 z-50">
            <ChessProfileBox profile={profile} country={country} />
        </div>
    );
}   