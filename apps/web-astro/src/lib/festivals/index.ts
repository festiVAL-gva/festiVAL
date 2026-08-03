import { createJsonFestivalRepository } from './adapters/json-adapter';
import type { FestivalRepository } from './repository';

/**
 * Active festival repository. Today: JSON adapter. Tomorrow: Sanity adapter
 * behind the same interface — pages keep calling `festivalRepository`.
 */
export const festivalRepository: FestivalRepository = createJsonFestivalRepository();
