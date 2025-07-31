import type { ChessProfile } from "../../../Types/ChessProfile";

interface ProfileMiniProps {
  profile: ChessProfile;
  country: string | null;
}

function getCountryFlag(country: string | null): string {
  if (!country) return '🌍';
  
  // Country name to flag emoji mapping
  const countryFlags: Record<string, string> = {
    // Africa
    'ethiopia': '🇪🇹',
    'south africa': '🇿🇦',
    'egypt': '🇪🇬',
    'nigeria': '🇳🇬',
    'kenya': '🇰🇪',
    'morocco': '🇲🇦',
    'ghana': '🇬🇭',
    'tunisia': '🇹🇳',
    'algeria': '🇩🇿',
    'uganda': '🇺🇬',
    'tanzania': '🇹🇿',
    'zimbabwe': '🇿🇼',
    'zambia': '🇿🇲',
    'botswana': '🇧🇼',
    'senegal': '🇸🇳',
    
    // North America
    'united states': '🇺🇸',
    'canada': '🇨🇦',
    'mexico': '🇲🇽',
    'guatemala': '🇬🇹',
    'cuba': '🇨🇺',
    'jamaica': '🇯🇲',
    'costa rica': '🇨🇷',
    'panama': '🇵🇦',
    
    // South America
    'brazil': '🇧🇷',
    'argentina': '🇦🇷',
    'chile': '🇨🇱',
    'colombia': '🇨🇴',
    'peru': '🇵🇪',
    'venezuela': '🇻🇪',
    'ecuador': '🇪🇨',
    'uruguay': '🇺🇾',
    'bolivia': '🇧🇴',
    'paraguay': '🇵🇾',
    
    // Europe
    'united kingdom': '🇬🇧',
    'germany': '🇩🇪',
    'france': '🇫🇷',
    'spain': '🇪🇸',
    'italy': '🇮🇹',
    'russia': '🇷🇺',
    'poland': '🇵🇱',
    'ukraine': '🇺🇦',
    'netherlands': '🇳🇱',
    'belgium': '🇧🇪',
    'switzerland': '🇨🇭',
    'austria': '🇦🇹',
    'sweden': '🇸🇪',
    'norway': '🇳🇴',
    'denmark': '🇩🇰',
    'finland': '🇫🇮',
    'iceland': '🇮🇸',
    'portugal': '🇵🇹',
    'greece': '🇬🇷',
    'turkey': '🇹🇷',
    'czech republic': '🇨🇿',
    'hungary': '🇭🇺',
    'romania': '🇷🇴',
    'bulgaria': '🇧🇬',
    'croatia': '🇭🇷',
    'serbia': '🇷🇸',
    'bosnia and herzegovina': '🇧🇦',
    'slovenia': '🇸🇮',
    'slovakia': '🇸🇰',
    'estonia': '🇪🇪',
    'latvia': '🇱🇻',
    'lithuania': '🇱🇹',
    'ireland': '🇮🇪',
    'luxembourg': '🇱🇺',
    'malta': '🇲🇹',
    'cyprus': '🇨🇾',
    
    // Asia
    'china': '🇨🇳',
    'japan': '🇯🇵',
    'india': '🇮🇳',
    'south korea': '🇰🇷',
    'indonesia': '🇮🇩',
    'thailand': '🇹🇭',
    'vietnam': '🇻🇳',
    'philippines': '🇵🇭',
    'malaysia': '🇲🇾',
    'singapore': '🇸🇬',
    'taiwan': '🇹🇼',
    'hong kong': '🇭🇰',
    'pakistan': '🇵🇰',
    'bangladesh': '🇧🇩',
    'sri lanka': '🇱🇰',
    'nepal': '🇳🇵',
    'myanmar': '🇲🇲',
    'cambodia': '🇰🇭',
    'laos': '🇱🇦',
    'mongolia': '🇲🇳',
    'kazakhstan': '🇰🇿',
    'uzbekistan': '🇺🇿',
    'kyrgyzstan': '🇰🇬',
    'tajikistan': '🇹🇯',
    'turkmenistan': '🇹🇲',
    'afghanistan': '🇦🇫',
    'iran': '🇮🇷',
    'iraq': '🇮🇶',
    'syria': '🇸🇾',
    'lebanon': '🇱🇧',
    'jordan': '🇯🇴',
    'israel': '🇮🇱',
    'palestine': '🇵🇸',
    'saudi arabia': '🇸🇦',
    'united arab emirates': '🇦🇪',
    'qatar': '🇶🇦',
    'kuwait': '🇰🇼',
    'bahrain': '🇧🇭',
    'oman': '🇴🇲',
    'yemen': '🇾🇪',
    'georgia': '🇬🇪',
    'armenia': '🇦🇲',
    'azerbaijan': '🇦🇿',
    
    
    // Oceania
    'australia': '🇦🇺',
    'new zealand': '🇳🇿',
    'fiji': '🇫🇯',
    'papua new guinea': '🇵🇬',
    'samoa': '🇼🇸',
    'tonga': '🇹🇴',
    'vanuatu': '🇻🇺',
    'solomon islands': '🇸🇧'
  };
  
  return countryFlags[country.toLowerCase()] || '🌍';
}

export default function ProfileMini({ profile, country }: ProfileMiniProps) {
  const avatarSrc = profile.avatar && profile.avatar.trim() !== "" 
    ? profile.avatar 
    : "/public/default-avatar.png";

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem' // Doubled from 0.75rem
    }}>
      <img
        src={avatarSrc}
        alt={profile.name}
        style={{
          width: '6rem', // Doubled from 3rem
          height: '6rem', // Doubled from 3rem
          borderRadius: '50%',
          objectFit: 'cover',
          border: '4px solid #374151' // Doubled from 2px
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{ fontSize: '2rem', fontWeight: '500' }}>{profile.username}</div> 
        <div style={{ fontSize: '2.5rem' }}>{getCountryFlag(country)}</div> 
      </div>
    </div>
  );
}