import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users } from 'lucide-react';
import { Aravt } from '@/types'; // Adjust the import based on your types location
import JoinRequestForm from '@/components/JoinRequestForm'; // Import the join request form
import { useAravtsStore } from '@/store/aravts'; // Import the store to fetch details

interface AravtCardProps {
  aravt: Aravt;
}

const AravtCard = ({ aravt }: AravtCardProps) => {
  const { fetchAravtDetails, applyToAravt } = useAravtsStore(); // Access the store to fetch details and apply to Aravt
  const [isJoining, setIsJoining] = useState(false); // State to control the join request form visibility
  const [selectedAravtDetails, setSelectedAravtDetails] = useState<Aravt | null>(null); // State for selected Aravt details
  const [loadingDetails, setLoadingDetails] = useState(false); // State to manage loading state for details
  const [loadingJoin, setLoadingJoin] = useState(false); // State to manage loading state for join request

  const handleJoinRequestSubmit = async (data: { reason: string }) => {
    setLoadingJoin(true); // Set loading state for join request
    try {
      await applyToAravt(aravt.id, data.reason); // Call applyToAravt with the reason
    } catch (error) {
      console.error("Failed to apply to Aravt:", error);
    } finally {
      setLoadingJoin(false); // Reset loading state
      setIsJoining(false); // Close the form after submission
    }
  };

  const handleCloseForm = () => {
    setIsJoining(false); // Close the form without submitting
  };

  const handleGetMoreInfo = async () => {
    setLoadingDetails(true); // Set loading state
    try {
      const details = await fetchAravtDetails(aravt.id); // Fetch details for the selected Aravt
      setSelectedAravtDetails(details); // Set the selected Aravt details
    } catch (error) {
      console.error("Failed to fetch Aravt details:", error);
    } finally {
      setLoadingDetails(false); // Reset loading state
    }
  };

  return (
    <Card className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-6">
        <Avatar className="h-[100px] w-[100px] rounded-lg">
          <AvatarFallback className="rounded-lg bg-gray-100">
            {aravt.name.substring(0, 2)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">{aravt.name}</h3>
              <p className="text-gray-500">{aravt.description}</p>
              <div className="flex items-center gap-1 text-gray-600">
                <span>Leader:</span>
                <span className="text-blue-500">{aravt.leader?.full_name}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-gray-600">
                <Users className="h-4 w-4" />
                <span>{aravt.team?.length}/{10}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {aravt.skills?.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                {skill}
              </span>
            ))}
          </div>

          {/* Buttons for Join and Get More Info */}
          <div className="mt-4 flex gap-2">
            <Button className="bg-gray-300 hover:bg-gray-400 text-black" onClick={() => setIsJoining(true)}>
              Join Aravt
            </Button>
            <Button className="bg-gray-300 hover:bg-gray-400 text-black" onClick={handleGetMoreInfo}>
              Get More Info
            </Button>
          </div>

          {/* Display Join Request Form */}
          {isJoining && (
            <JoinRequestForm 
              aravtId={aravt.id} 
              onSubmit={handleJoinRequestSubmit} 
              onClose={handleCloseForm} 
            />
          )}

          {/* Display Selected Aravt Details */}
          {selectedAravtDetails && (
            <div className="mt-4">
              <h4 className="text-md font-semibold">Details:</h4>
              <p className="text-gray-500">{selectedAravtDetails.description}</p>
              <div className="flex items-center gap-1 text-gray-600">
                <span>Leader:</span>
                <span className="text-blue-500">{selectedAravtDetails.leader?.full_name}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedAravtDetails.skills?.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Loading State for Details */}
          {loadingDetails && <p className="text-gray-500">Loading details...</p>}
        </div>
      </div>
    </Card>
  );
};

export default AravtCard; 