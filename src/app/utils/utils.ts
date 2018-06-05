export function toRadians(value: number): number {
  return value * Math.PI / 180;
}

export function getDistanceFromGeo(lon1, lat1, lon2, lat2): number {
  const R = 6371; // Radius of the earth in km
  const dLat = toRadians(lat2 - lat1);  // Javascript functions in radians
  const dLon = toRadians(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c) / 1000; // Distance in km
}
