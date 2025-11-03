/**
 * 定位Hook
 */
import { useState, useEffect } from 'react';
import { getCurrentPosition, watchPosition, clearWatch } from '@/services/locationService';
import type { LocationPosition } from '@/services/locationService';

export function useLocation(watch = false) {
  const [position, setPosition] = useState<LocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let watchId: number | null = null;

    const initLocation = async () => {
      setLoading(true);
      try {
        const pos = await getCurrentPosition();
        setPosition(pos);
        setError(null);
      } catch (err: any) {
        setError(err.message || '定位失败');
      } finally {
        setLoading(false);
      }
    };

    if (watch) {
      watchId = watchPosition(
        (pos) => {
          setPosition(pos);
          setError(null);
        },
        (err) => {
          setError(err.message || '定位失败');
        }
      );
    } else {
      initLocation();
    }

    return () => {
      if (watchId !== null) {
        clearWatch(watchId);
      }
    };
  }, [watch]);

  return { position, error, loading };
}

