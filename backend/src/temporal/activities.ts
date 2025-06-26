export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  pincode: string;
}

export async function saveToDb(profile: Profile): Promise<void> {
  console.log('Saving to DB:', profile);
  // Mock DB save or real DB logic
}

export async function updateCrudCrud(profile: Profile): Promise<void> {
  await fetch(`https://crudcrud.com/api/YOUR_API_KEY_HERE/profiles/${profile.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });
}
