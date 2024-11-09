import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const ExploreFeatures = ({ onBrowseClick }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Explore Aravt Features</CardTitle>
          <CardDescription>Learn how to get started with Aravt</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Badge className="mr-2">Basic</Badge>
                    <span>10 member groups</span>
                  </li>
                  <li className="flex items-center">
                    <Badge variant="secondary" className="mr-2">Advanced</Badge>
                    <span>100 member organization</span>
                  </li>
                  <li className="flex items-center">
                    <Badge variant="destructive" className="mr-2">Elite</Badge>
                    <span>1000 member network</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tasks & Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Badge className="mr-2">Local</Badge>
                    <span>Group specific tasks</span>
                  </li>
                  <li className="flex items-center">
                    <Badge variant="secondary" className="mr-2">Global</Badge>
                    <span>Network-wide opportunities</span>
                  </li>
                  <li className="flex items-center">
                    <Badge variant="destructive" className="mr-2">Rewards</Badge>
                    <span>Tokens & USDT compensation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Button 
            className="w-full" 
            onClick={onBrowseClick}
          >
            Browse Available Aravts
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExploreFeatures;