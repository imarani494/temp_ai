import * as wf from '@temporalio/workflow';
import type * as activities from './activities';

const { saveToDb, updateCrudCrud } = wf.proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export const updateProfileWorkflow = wf.defineSignal<[activities.Profile]>('updateProfile');

export async function updateProfile(profile: activities.Profile) {
  await saveToDb(profile);
  await wf.sleep(10000); // 10 seconds
  await updateCrudCrud(profile);
}
