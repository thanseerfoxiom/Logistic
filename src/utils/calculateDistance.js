export function calculateDistance(lat1, lon1, lat2, lon2) {
  console.log("lat",lat1)
  console.log("lon",lon1)
  console.log("lat2",lat2)
  console.log("lon2",lon2)
    const toRadians = (degree) => (degree * Math.PI) / 180;
  
    const R = 6371; // Radius of the Earth in kilometers
    const deltaLat = toRadians(lat2 - lat1);
    const deltaLon = toRadians(lon2 - lon1);
  
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c;
    console.log("distance in calculate",distance)
    return distance; // Distance in kilometers
  }