/* Re-exports from the central config so older imports keep working. */
import { getPublicContact, SITE_CONFIG } from "@/config/site";

export { SITE_CONFIG };

/** Contact details with feature flags applied. */
export const CONTACT_CONFIG = getPublicContact();
