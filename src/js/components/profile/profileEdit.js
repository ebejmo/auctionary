import { manageMedia } from '../../listeners/mediaHandler.js';
import { handleCreateListingForm } from '../forms/createListingForm.js';
import { handleProfileUpdate } from '../forms/updateProfileForm.js';

export async function setupProfileEditing() {
  await manageMedia('#mediaFields', '#addMediaButton');
  await handleCreateListingForm();
  await handleProfileUpdate();
}
