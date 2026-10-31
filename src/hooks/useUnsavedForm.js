import { useEffect, useState } from 'react';
import { useFormState, useWatch } from 'react-hook-form';

import { formValuesEqual } from '../utils/formValuesEqual';
import { useUnsavedChanges } from './useUnsavedChanges';

// Compara todos os valores, incluindo selects/setValue sem shouldDirty.
export function useUnsavedForm(form, active, onDiscard, extraDirty = false) {
  const values = useWatch({ control: form.control });
  const { defaultValues } = useFormState({ control: form.control });
  const [baseline, setBaseline] = useState(() =>
    structuredClone(form.getValues()),
  );
  useEffect(() => {
    setBaseline(structuredClone(form.getValues()));
  }, [active, defaultValues, form]);
  return useUnsavedChanges(
    Boolean(active && (extraDirty || !formValuesEqual(values, baseline))),
    () => {
      form.reset(structuredClone(baseline));
      onDiscard?.();
    },
  );
}
