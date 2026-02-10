import { ButtonVariant, ButtonWidth } from "@shared/components/button/types/button.enum";

export const BUTTON_WIDTH_MAP: Record<ButtonWidth, string> = Object.freeze({
  [ButtonWidth.XS]: 'w-24',
  [ButtonWidth.SM]: 'w-32',
  [ButtonWidth.MD]: 'w-36',
  [ButtonWidth.LG]: 'w-52',
});

export const BUTTON_VARIANT_MAP: Record<ButtonVariant, string> = Object.freeze({
  [ButtonVariant.PRIMARY]: 'button-primary',
  [ButtonVariant.UPDATING]: 'button-updating',
  [ButtonVariant.ERROR]: 'button-error',
  [ButtonVariant.PRIMARY_OUTLINED]: 'button-primary-outlined',
});
