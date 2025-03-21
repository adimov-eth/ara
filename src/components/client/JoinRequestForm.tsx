import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

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
    <Card className="p-6">
      <h3 className="text-lg font-semibold">Join Aravt {aravtId}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Motivation for Joining</label>
          <Input 
            type="text" 
            value={reason} 
            onChange={(e) => setReason(e.target.value)} 
            placeholder='I want to jin to your Aravt ...'
            required 
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" className="bg-black hover:bg-gray-700 text-white">
            Submit
          </Button>
          <Button type="button" className="bg-black hover:bg-gray-700 text-white" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default JoinRequestForm; 