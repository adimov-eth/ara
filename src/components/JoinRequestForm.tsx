import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface JoinRequestFormProps {
  aravtId: number;
  onSubmit: (data: { reason: string; additionalInfo: string }) => void;
  onClose: () => void;
}

const JoinRequestForm = ({ aravtId, onSubmit, onClose }: JoinRequestFormProps) => {
  const [reason, setReason] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ reason, additionalInfo });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold">Join Aravt {aravtId}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Reason for Joining</label>
          <Input 
            type="text" 
            value={reason} 
            onChange={(e) => setReason(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Information</label>
          <Input 
            type="text" 
            value={additionalInfo} 
            onChange={(e) => setAdditionalInfo(e.target.value)} 
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
            Submit Join Request
          </Button>
          <Button type="button" className="bg-red-500 hover:bg-red-600 text-white" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default JoinRequestForm; 