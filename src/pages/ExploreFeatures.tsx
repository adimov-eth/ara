import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useFeaturesStore } from '@/store/features';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ExploreFeatures = () => {
  const navigate = useNavigate();
  const { features, isLoading, error, fetchFeatures } = useFeaturesStore();

  useEffect(() => {
    fetchFeatures();
  }, [fetchFeatures]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Explore Aravt Features</CardTitle>
          <CardDescription>Learn how to get started with Aravt</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {features.community.map((feature) => (
                    <li key={feature.id} className="flex items-center">
                      <Badge 
                        variant={feature.badgeVariant} 
                        className="mr-2"
                      >
                        {feature.badge}
                      </Badge>
                      <div>
                        <span className="font-medium">{feature.title}</span>
                        <p className="text-sm text-gray-500">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tasks & Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {features.tasks.map((feature) => (
                    <li key={feature.id} className="flex items-center">
                      <Badge 
                        variant={feature.badgeVariant} 
                        className="mr-2"
                      >
                        {feature.badge}
                      </Badge>
                      <div>
                        <span className="font-medium">{feature.title}</span>
                        <p className="text-sm text-gray-500">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Button 
            className="w-full mt-4" 
            onClick={() => navigate('/browse')}
          >
            Browse Available Aravts
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExploreFeatures; 