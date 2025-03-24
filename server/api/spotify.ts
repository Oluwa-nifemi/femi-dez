type RecentlyPlayedResponse = {
  href: string
  limit: number
  next: string
  cursors: {
    after: string
    before: string
  }
  total: number
  items: {
    track: {
      album: {
        album_type: string
        total_tracks: number
        available_markets: string[]
        external_urls: {
          spotify: string
        }
        href: string
        id: string
        images: {
          url: string
          height: number
          width: number
        }[]
        name: string
        release_date: string
        release_date_precision: string
        restrictions?: {
          reason: string
        }
        type: string
        uri: string
        artists: {
          external_urls: {
            spotify: string
          }
          href: string
          id: string
          name: string
          type: string
          uri: string
        }[]
      }
      artists: {
        external_urls: {
          spotify: string
        }
        href: string
        id: string
        name: string
        type: string
        uri: string
      }[]
      available_markets: string[]
      disc_number: number
      duration_ms: number
      explicit: boolean
      external_ids: {
        isrc: string
        ean: string
        upc: string
      }
      external_urls: {
        spotify: string
      }
      href: string
      id: string
      is_playable: boolean
      linked_from: Record<string, unknown>
      restrictions?: {
        reason: string
      }
      name: string
      popularity: number
      preview_url: string
      track_number: number
      type: string
      uri: string
      is_local: boolean
    }
    played_at: string
    context: {
      type: string
      href: string
      external_urls: {
        spotify: string
      }
      uri: string
    }
  }[]
}

type TransformedRecentlyPlayed = {
  image_url: string;
  name: string;
  artist: string;
  href: string;
}

const clientId = useRuntimeConfig().spotifyClientId
const clientSecret = useRuntimeConfig().spotifyClientSecret
const refreshToken = useRuntimeConfig().spotifyRefreshToken


// Prepare Basic auth header
const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

let accessTokenCache: {
  token: string;
  expiresAt: number; // timestamp in ms
} | null = null;

async function getAccessToken() {
  const now = Date.now();

  // Check if cached token is valid
  if (accessTokenCache && accessTokenCache.expiresAt > now) {
    return accessTokenCache.token;
  }

  // Generate new token
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  });

  const data = await res.json();

  const expiresIn = data.expires_in || 3600; // default to 1 hour
  accessTokenCache = {
    token: data.access_token,
    expiresAt: now + expiresIn * 1000 - 60 * 1000 // subtract 1 minute as buffer
  };

  return data.access_token;
}

export default defineCachedEventHandler(async () => {
  const token = await getAccessToken();

  const resp = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
    headers: { Authorization: `Bearer ${token}` }
  })

  let recentlyPlayed: TransformedRecentlyPlayed[] = [];

  if(resp.ok){
    const data = await resp.json() as RecentlyPlayedResponse

   recentlyPlayed = data.items.sort((a, b) => new Date(a.played_at).getTime() - new Date(b.played_at).getTime()).map(item => {
     return {
       artist: item.track.artists[0]?.name || "",
       name: item.track.name,
       image_url: item.track.album.images[0]?.url || "",
       href: item.track.external_urls.spotify
     }
   })
  }

  return {
    data: recentlyPlayed
  }
},
{
  maxAge: 300 // cache for 5 minutes (in seconds)
})