export interface ChessProfile {
    "avatar": string, // "https://images.chesscomfiles.com/uploads/v1/user/144815481.120c74a1.200x200o.73cb87cba034.jpg"
    "player_id": number, // 144815481
    //"@id": string, // "https://api.chess.com/pub/player/ratboi77"
    //"url": string, // "https://www.chess.com/member/ratboi77"
    "name": string,
    "username": string,
    "followers": number,
    "country": string, // "https://api.chess.com/pub/country/ET"
    //"last_online": number,
    //"joined": number,
    "status": string, // basic, premium, etc.
    //"is_streamer": boolean,
    //"verified": boolean,
   // "league": string, // Champion, Master, etc.
    "streaming_platforms": string[] // ["twitch", "youtube", "tiktok"]
}
export interface rawChessProfile {
    "avatar": string, // "https://images.chesscomfiles.com/uploads/v1/user/144815481.120c74a1.200x200o.73cb87cba034.jpg"
    "player_id": number, // 144815481
    "@id": string, // "https://api.chess.com/pub/player/ratboi77"
    "url": string, // "https://www.chess.com/member/ratboi77"
    "name": string,
    "username": string,
    "followers": number,
    "country": string, // "https://api.chess.com/pub/country/ET"
    "last_online": number,
    "joined": number,
    "status": string, // basic, premium, etc.
    "is_streamer": boolean,
    "verified": boolean,
    "league": string, // Champion, Master, etc.
    "streaming_platforms": string[] // ["twitch", "youtube", "tiktok"]
}

