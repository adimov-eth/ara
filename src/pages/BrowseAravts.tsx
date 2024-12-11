import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useAravtsStore } from '@/store/aravts';
import { useAuthStore } from '@/store/auth';
import AravtCard from '@/components/AravtCard'; // Import the new component
import { Card } from '@/components/ui/card'; 
import { Alert, AlertDescription } from '@/components/ui/alert';
import JoinRequestForm from '@/components/JoinRequestForm'; // Import the join request form
import { Aravt } from '@/types';

const BrowseAravts = () => {
  // const { user, hasAravt } = useAuthStore();
  const { aravts, isLoading, error, fetchAravts, applyToAravt, fetchAravtDetails } = useAravtsStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAravt, setSelectedAravt] = useState<Aravt | null>(null); // State for selected Aravt details
  const [isJoining, setIsJoining] = useState(false); // State to control the join request form visibility

  useEffect(() => {
    fetchAravts();
  }, [fetchAravts]);

  const filteredAravts = aravts.filter(aravt => 
    aravt.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    aravt.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    aravt.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleJoinAravt = (aravtId: number) => {
    setSelectedAravt(aravtId); // Set the selected Aravt for joining
    setIsJoining(true); // Show the join request form
  };

  const handleGetMoreInfo = async (aravtId: number) => {
    const details = await fetchAravtDetails(aravtId); // Fetch details for the selected Aravt
    setSelectedAravt(details); // Set the selected Aravt details
  };

  const handleJoinRequestSubmit = async (data: { reason: string; additionalInfo: string }) => {
    if (selectedAravt) {
      await applyToAravt(selectedAravt.id, data.reason); // Send join request with reason
      setIsJoining(false); // Close the form after submission
      setSelectedAravt(null); // Clear selected Aravt
    }
  };

  const handleCloseForm = () => {
    setIsJoining(false); // Close the form without submitting
    setSelectedAravt(null); // Clear selected Aravt
  };

  if (isLoading && !aravts.length) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-8 space-y-8">
      {/* Welcome Message */}
      <Card className="bg-blue-50 border-none p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">👋</span>
          <h2 className="text-xl font-semibold">Welcome to Aravt!</h2>
        </div>
        <p className="text-gray-600">You need to join one of the active Aravts to continue.</p>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Aravts Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Aravts</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search Aravts..." 
              className="w-64 pl-9 h-10 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredAravts.map((aravt) => (
            <AravtCard 
              key={aravt.id} 
              aravt={aravt} 
              onJoin={handleJoinAravt} 
              onGetMoreInfo={handleGetMoreInfo} 
            />
          ))}
        </div>

        {/* Display Join Request Form */}
        {isJoining && selectedAravt && (
          <JoinRequestForm 
            aravtId={selectedAravt.id} 
            onSubmit={handleJoinRequestSubmit} 
            onClose={handleCloseForm} 
          />
        )}

        {/* Display Selected Aravt Details */}
        <div className="mt-6">
          {selectedAravt && !isJoining && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold">{selectedAravt.name}</h3>
              <p className="text-gray-500">{selectedAravt.description}</p>
              <div className="flex items-center gap-1 text-gray-600">
                <span>Leader:</span>
                <span className="text-blue-500">{selectedAravt.leader?.full_name}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedAravt.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseAravts; 