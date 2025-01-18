import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Learn = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-6xl mx-auto p-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to Aravt</h1>
        <p className="text-xl text-gray-600">Learn how Aravt works and get started</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>What is Aravt?</CardTitle>
            <CardDescription>Understanding the basics</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Aravt is a decentralized project management platform where teams collaborate on projects,
              share resources, and grow together. Each Aravt is a unique community with its own focus and goals.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How to Join</CardTitle>
            <CardDescription>Getting started with Aravt</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              1. Browse available Aravts<br/>
              2. Find one that matches your interests<br/>
              3. Submit a join request<br/>
              4. Start collaborating once accepted
            </p>
            <Button onClick={() => navigate('/browse')} className="w-full">
              Browse Aravts
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projects & Tasks</CardTitle>
            <CardDescription>How work is organized</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Each Aravt manages multiple projects. Projects are broken down into tasks
              that members can work on. Complete tasks to earn rewards and contribute to
              your Aravt's success.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rewards & Growth</CardTitle>
            <CardDescription>Benefits of participation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              As you contribute to projects and complete tasks, you'll earn rewards
              and build your reputation within the Aravt community. Successful Aravts
              share in the benefits of their collective work.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Learn;
