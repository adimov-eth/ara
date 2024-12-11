import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users } from 'lucide-react';
import { Aravt } from '@/types'; // Adjust the import based on your types location

interface AravtCardProps {
  aravt: Aravt;
  onJoin: (aravtId: number) => void;
  onGetMoreInfo: (aravtId: number) => void;
}

const AravtCard = ({ aravt, onJoin, onGetMoreInfo }: AravtCardProps) => {
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
            <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={() => onJoin(aravt.id)}>
              Join Aravt
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => onGetMoreInfo(aravt.id)}>
              Get More Info
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AravtCard; 