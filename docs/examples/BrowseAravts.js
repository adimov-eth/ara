import React from 'react';
import { Star, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const BrowseAravts = ({ onViewDetails, onJoinRequest }) => {
  const aravts = [
    { 
      id: 1, 
      name: 'Tech Pioneers', 
      description: 'Technology focused community building Web3 solutions',
      rating: 4.8,
      slots: 3,
      members: 7,
      skills: ['Programming', 'Blockchain', 'Design'],
      projects: 4
    },
    { 
      id: 2, 
      name: 'Creative Hub', 
      description: 'Digital artists and creators collaborative space',
      rating: 4.5,
      slots: 5,
      members: 5,
      skills: ['Art', 'Animation', 'Marketing'],
      projects: 2
    },
    { 
      id: 3, 
      name: 'DeFi Builders', 
      description: 'Financial technology and DeFi project development',
      rating: 4.9,
      slots: 2,
      members: 8,
      skills: ['Finance', 'Smart Contracts', 'Analytics'],
      projects: 6
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Available Aravts</CardTitle>
          <CardDescription>Find your perfect community</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Input placeholder="Search Aravts..." className="max-w-sm" />
            <Button variant="outline">
              Filter
            </Button>
          </div>

          {aravts.map((aravt) => (
            <Card key={aravt.id} className="cursor-pointer hover:bg-gray-50">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{aravt.name}</CardTitle>
                    <CardDescription>{aravt.description}</CardDescription>
                  </div>
                  <Badge variant="outline">
                    {aravt.slots} slots available
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    {aravt.rating}/5.0
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {aravt.members} members
                  </div>
                  <div>
                    {aravt.projects} active projects
                  </div>
                </div>
                <div className="mt-2 flex gap-2">
                  {aravt.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => onViewDetails(aravt)}
                >
                  View Details
                </Button>
                <Button 
                  onClick={() => onJoinRequest(aravt)}
                >
                  Request to Join
                </Button>
              </CardFooter>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default BrowseAravts;