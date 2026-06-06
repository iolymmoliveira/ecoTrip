'use client';

import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface MapCenterUpdaterProps {
  position: [number, number];
}

export const MapCenterUpdater: React.FC<MapCenterUpdaterProps> = ({
  position,
}) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position);
  }, [map, position]);

  return null;
};
