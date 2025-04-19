import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '../ui/textarea';

interface JoinRequestFormProps {
  aravtId: number;
  onSubmit: (data: { reason: string }) => void;
  onClose: () => void;
}

const JoinRequestForm = ({ aravtId, onSubmit, onClose }: JoinRequestFormProps) => {
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ reason });
  };

  return (
    <Card className="p-2 mt-4">
      <h3 className="text-lg font-semibold p-2">Joining Aravt #{aravtId}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 pb-2 text-left">Message to Leader</label>
          <Textarea 
            value={reason} 
            onChange={(e) => setReason(e.target.value)} 
            placeholder='Describe why you want to join this Aravt'
            required 
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" className="bg-blue-700 hover:bg-gray-700 text-white">
            Submit
          </Button>
          <Button type="button" className="bg-black hover:bg-gray-700 text-white" onClick={onClose}>
            X Close
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default JoinRequestForm; 