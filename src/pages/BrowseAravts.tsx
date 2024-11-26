import { useEffect, useState } from 'react';
import { Search, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAravtsStore } from '@/store/aravts';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuthStore } from '@/store/auth';

const BrowseAravts = () => {
  const { user, hasAravt } = useAuthStore();
  const { aravts, isLoading, error, fetchAravts, applyToAravt } = useAravtsStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAravts();
  }, [fetchAravts]);

  const filteredAravts = aravts.filter(aravt => 
    aravt.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    aravt.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    aravt.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
            <Card 
              key={aravt.id} 
              className="p-6 hover:bg-gray-50 transition-colors"
            >
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
                        <span className="text-blue-500">
                          {aravt.leader?.full_name}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{aravt.team?.length}/{10}</span>
                      </div>
                      { (!user || user && !hasAravt) ? ( 
                        <Button 
                          className="bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-lg px-6"
                          onClick={() => applyToAravt(aravt.id, "")}
                          disabled={isLoading}
                        >
                          Register
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button> 
                        ) : null
                      }
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {aravt.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseAravts; 