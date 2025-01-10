import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAravtsStore } from '@/store/aravts';
import { useAuthStore } from '@/store/auth';

const CreateAravtForm = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [init_user_id, setInitUserId] = useState(0);
  const createAravt = useAravtsStore(state => state.createAravt);
  const fetchUser = useAuthStore(state => state.fetchUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAravt({ name, description, init_user_id });
      onClose();
      fetchUser();
      alert('Aravt created successfully');

    } catch (error) {
      console.error('Failed to create Aravt:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Create New Aravt</h2>
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded w-full p-2 bg-gray-100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded w-full p-2 bg-gray-100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Init User ID</label>
          <input
            type="number"
            value={init_user_id}
            onChange={(e) => setInitUserId(parseInt(e.target.value))}
            className="border rounded w-full p-2 bg-gray-100"
            required
          />
        </div>
        <div className="flex justify-end">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" className="ml-2">Create</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateAravtForm; 