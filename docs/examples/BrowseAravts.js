import React from 'react';
import { Search, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const BrowseAravts = () => {
  const aravts = [
    {
      id: 1,
      name: 'ARAVT SYSTEMS',
      description: 'Founders Aravt',
      capacity: { current: 4, max: 10 },
      leader: 'Anar Artur',
      skills: ['Governance building', 'team management', 'organization'],
      logo: '/api/placeholder/100/100'
    },
    {
      id: 2,
      name: 'RubeTON',
      description: 'e/acc token for digital life',
      capacity: { current: 1, max: 10 },
      leader: 'Ruben Babaev',
      skills: ['Development', 'Fundraising', 'Design'],
      logo: '/api/placeholder/100/100'
    },
    {
      id: 3,
      name: 'Grow Port One',
      description: 'Blockchain Infrastructure & Development',
      capacity: { current: 2, max: 10 },
      leader: 'Alex Wei',
      skills: ['Blockchain', 'Infrastructure', 'Development'],
      logo: '/api/placeholder/100/100'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      {/* Welcome Message */}
      <Card className="bg-blue-50 border-none p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">👋</span>
          <h2 className="text-xl font-semibold">Welcome to Aravt!</h2>
        </div>
        <p className="text-gray-600">You need to join one of the active Aravts to continue.</p>
      </Card>

      {/* Aravts Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Aravts</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search Aravts..." 
              className="w-64 pl-9 h-10 bg-white"
            />
          </div>
        </div>

        <div className="space-y-4">
          {aravts.map((aravt) => (
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
                        <a href="#" className="text-blue-500 hover:underline">
                          {aravt.leader}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{aravt.capacity.current}/{aravt.capacity.max}</span>
                      </div>
                      <Button 
                        className="bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-lg px-6"
                      >
                        Register
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {aravt.skills.map((skill, index) => (
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