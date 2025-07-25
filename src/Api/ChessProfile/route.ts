import type { ChessProfile } from '../../Types/ChessProfile';
import type { rawChessProfile} from "../../Types/ChessProfile";

function toChessProfile(raw: rawChessProfile): ChessProfile {
  return {
    avatar: raw.avatar ?? "",
    player_id: raw.player_id ?? 0,
    name: raw.name ?? "",
    username: raw.username ?? "",
    followers: raw.followers ?? 0,
    country: raw.country ?? "",
    status: raw.status ?? "basic",
    streaming_platforms: Array.isArray(raw.streaming_platforms) ? raw.streaming_platforms : [],
  };
}

export async function fetchUserProfile(username: string): Promise<ChessProfile | null> {
  const res = await fetch(`https://api.chess.com/pub/player/${username}`);
  if (!res.ok) {
    return null;
  }
  const raw = await res.json();
  return toChessProfile(raw);
}
export async function fetchCountry(country: string) {
  const res = await fetch(country);
  const data = await res.json();
  return data.name;
}