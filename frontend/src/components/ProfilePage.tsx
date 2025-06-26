import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Profile } from '../types';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  CircularProgress, 
  Alert 
} from '@mui/material';

interface ApiResponse {
  profile: Profile;
}

const ProfilePage: React.FC = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState<Partial<Profile>>({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    pincode: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getAccessTokenSilently();
        const res = await axios.get<ApiResponse>(`${process.env.REACT_APP_API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data.profile);
        setForm(res.data.profile);
      } catch (err) {
        setError('Failed to fetch profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user?.sub, getAccessTokenSilently]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = await getAccessTokenSilently();
      await axios.post(`${process.env.REACT_APP_API_URL}/api/profile`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !profile) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Profile Information
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Profile updated!</Alert>}

      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField 
          label="First Name" 
          name="firstName" 
          value={form.firstName || ''} 
          onChange={handleChange} 
          fullWidth 
        />
        <TextField 
          label="Last Name" 
          name="lastName" 
          value={form.lastName || ''} 
          onChange={handleChange} 
          fullWidth 
        />
        <TextField 
          label="Phone" 
          name="phone" 
          value={form.phone || ''} 
          onChange={handleChange} 
          fullWidth 
        />
        <TextField 
          label="City" 
          name="city" 
          value={form.city || ''} 
          onChange={handleChange} 
          fullWidth 
        />
        <TextField 
          label="Pincode" 
          name="pincode" 
          value={form.pincode || ''} 
          onChange={handleChange} 
          fullWidth 
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button 
            variant="contained" 
            onClick={handleSave} 
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;