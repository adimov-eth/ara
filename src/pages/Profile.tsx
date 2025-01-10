import { useEffect } from 'react';
import { useUserStore } from '@/store/user'; // Import the user store
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/auth'
import { api } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, /*applications,*/ isLoading, error, fetchUserProfile} = useUserStore();

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
  
{/*       <div className="mt-4">
        <h3 className="text-md font-semibold">Join Requests</h3>
        {applications.length > 0 ? (
          <ul className="list-disc pl-5">
            {applications.map((request) => (
              <li key={request.id} className="text-gray-700">
                {request.aravt_id} - {request.text}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No join requests found.</p>
        )}
      </div> */}

      <div>
        <button 
        onClick={async () => {
          await api.logout()
          useAuthStore.getState().logout()
        }}
        className={cn(
          "mt-4 bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md text-sm font-medium transition duration-200 ease-in-out"
        )}
      >
        Logout
      </button>
      </div>

      {/* Aravt Info */}
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Aravt Membership</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {user?.aravt ? (
            <>
              <div className="p-4 border rounded-lg">
                <p className="font-medium">{user.aravt.name}</p>
                <p className="text-sm text-gray-500">{user.aravt.description}</p>
              </div>
              <Button asChild className="w-full">
                <Link to="/dashboard">Aravt Dashboard</Link>
              </Button>
            </>
          ) : (
            <p className="text-gray-500">Not a member of any Aravt</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile; 