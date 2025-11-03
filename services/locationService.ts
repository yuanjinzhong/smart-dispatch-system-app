/**
 * 定位服务
 */

export interface LocationPosition {
  lat: number;
  lng: number;
  accuracy?: number;
}

/**
 * 获取当前位置
 */
export function getCurrentPosition(): Promise<LocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('浏览器不支持定位'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}

/**
 * 监听位置变化
 */
export function watchPosition(
  callback: (position: LocationPosition) => void,
  errorCallback?: (error: any) => void
): number {
  if (!navigator.geolocation) {
    throw new Error('浏览器不支持定位');
  }

  return navigator.geolocation.watchPosition(
    (position) => {
      callback({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy,
      });
    },
    errorCallback,
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );
}

/**
 * 清除位置监听
 */
export function clearWatch(watchId: number): void {
  navigator.geolocation.clearWatch(watchId);
}

