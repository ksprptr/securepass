// Class names shared by unrelated modules; ones used by a single component stay with it.

/** The filled brand button: page-level actions, tool actions and the copy button all share it. */
export const primaryButtonClassName =
  'rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 ease-out';

/** Adds the hover state that a disabled button must not show. */
export const primaryButtonHoverClassName = 'enabled:hover:bg-amber-700';
