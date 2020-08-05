import fetch from 'node-fetch'
import cache from '@helper/cache'
import md5 from 'md5'

export default async function ipLocation(ip) {
  try {
    let data

    data = await cache.get(['geoip', md5(ip)])
    if (!data) {
      data = await (await fetch('http://www.geoplugin.net/json.gp?ip=' + ip)).json()
      cache.set(['geopi', md5(ip)], data, 60*60*24*15)
    }

    let res = {
      city: data.geoplugin_city,
      region: {
        name: data.geoplugin_regionName || data.geoplugin_region,
        code: data.geoplugin_regionCode
      },
      country: {
        name: data.geoplugin_countryName,
        code: data.geoplugin_countryCode
      },
      europeanUnion: {
        is_in: data.geoplugin_inEU,
        vatRate: data.geoplugin_VATrate
      },
      continent: {
        name: data.geoplugin_continentName,
        code: data.geoplugin_continentCode
      },
      coords: {
        latitude: data.geoplugin_latitude,
        longitude: data.geoplugin_longitude,
        accuracyRadius: data.geoplugin_locationAccuracyRadius
      },
      locale: {
        timezone: data.geoplugin_timezone,
        currency: {
          iso_code: data.geoplugin_currencyCode,
          symbol: data.geoplugin_currencySymbol
        }
      }
    }

    return res
  } catch (e) {
    return {}
  }
}

export function formatAddress(addrstruct, reduced = false) {
  let parts = []

  if (addrstruct.city) {
    parts.push(addrstruct.city)
    parts.push(", ")
  }

  if (addrstruct.region.name) {
    parts.push(reduced ? addrstruct.region.code : addrstruct.region.name)
    parts.push(" - ")
  }

  if (addrstruct.country.name) {
    parts.push(reduced ? addrstruct.country.name : addrstruct.country.code)
  }

  return parts.join("")
}

export function geoDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI/180; // φ, λ in radians
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const d = R * c; // in metres

  return d
}
