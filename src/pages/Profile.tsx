import { useEffect } from 'react';
import { useUserStore } from '@/store/user'; // Import the user store
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/auth'
import { api } from '@/lib/api'

const Profile = () => {
  const { user, isLoading, error, fetchUserProfile } = useUserStore();

  useEffect(() => {
    fetchUserProfile(); // Fetch user profile on component mount
  }, [fetchUserProfile]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="space-y-2">
        <p><strong>Username:</strong> {user?.username}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>City:</strong> {user?.city}</p>
        <p><strong>Date of Birth:</strong> {user?.date_of_birth}</p>
        <p><strong>Full Name:</strong> {user?.full_name}</p>
      </div>
      <div>
        <button 
        onClick={async () => {
          await api.logout()
          useAuthStore.getState().logout()
        }}
        className={cn(
          "bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md text-sm font-medium transition duration-200 ease-in-out"
        )}
      >
        Logout
      </button>
      </div>
    </div>
  );
};

export default Profile; 