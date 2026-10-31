import { useEffect, useMemo, useRef, useState } from 'react';

import {
  distributeColumnWidths,
  parseColumnWidth,
} from '../utils/tableColumnLayout';

export function useTableColumnLayout(columns, actionWidth) {
  const container = useRef(null);
  const [availableWidth, setAvailableWidth] = useState(0);
  const tracks = useMemo(
    () => columns.map((column) => parseColumnWidth(column.width)),
    [columns],
  );
  const configured = tracks.length > 0 && tracks.every(Boolean);
  useEffect(() => {
    const element = container.current;
    if (!element || !configured) return undefined;
    const measure = () => {
      const width = element.clientWidth;
      setAvailableWidth((previous) => (previous === width ? previous : width));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [configured]);
  const layout = useMemo(
    () =>
      configured
        ? distributeColumnWidths(tracks, availableWidth, actionWidth)
        : null,
    [configured, tracks, availableWidth, actionWidth],
  );
  return { container, layout, tracks };
}
