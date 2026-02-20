import { SelectGap } from "@shared/components/select/types/select.enum";

export const SELECT_GAP_MAP: Record<SelectGap, string> = Object.freeze({
  [SelectGap.SM]: 'gap-1',
  [SelectGap.MD]: 'gap-2',
});
