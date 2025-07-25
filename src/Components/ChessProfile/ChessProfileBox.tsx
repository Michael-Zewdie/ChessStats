import type { ChessProfile } from "../../Types/ChessProfile";
import styles from "./styles/ChessProfileBox.module.css";

interface ChessProfileBoxProps {
  profile: ChessProfile;
  country: string | null;
}

export default function ChessProfileBox({ profile, country }: ChessProfileBoxProps) {
  const avatarSrc =
    profile.avatar && profile.avatar.trim() !== ""
      ? profile.avatar
      : "/public/default-avatar.png";
  return (
    <div className={styles.profileBox}>
      <img
        src={avatarSrc}
        alt={profile.name}
        className={styles.avatar}
      />
      <div className={styles.name}>{profile.name}</div>
      <div className={styles.username}>{profile.username}</div>
      <div className={styles.followers}>Followers: {profile.followers}</div>
      <div className={styles.country}>
        Country: {country ?? "Unknown"}
      </div>
      
      
    </div>
  );
} 