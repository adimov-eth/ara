import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Home, CreditCard, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types';

interface TaskCardProps {
  task: Task;
  onUpdate?: (taskId: number, updates: Partial<Task>) => void;
  onDelete?: (taskId: number) => void;
  isLoading?: boolean;
}

export const TaskCard = ({ task, onUpdate, onDelete, isLoading }: TaskCardProps) => (
  <Card className="hover:bg-gray-50 max-w-3xl w-full">
    <CardHeader className="p-4">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {task.is_global ? (
              <Globe className="h-4 w-4 text-blue-500" />
            ) : (
              <Home className="h-4 w-4 text-green-500" />
            )}
            <CardTitle className="text-lg">{task.title}</CardTitle>
            {task.priority && (
              <Badge variant={
                task.priority === 'high' ? 'destructive' :
                task.priority === 'medium' ? 'default' :
                'secondary'
              }>
                {task.priority}
              </Badge>
            )}
          </div>
          <p className="text-gray-500">{task.description}</p>
        </div>
        <div className="flex gap-2">
          {onUpdate && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onUpdate(task.id, { is_done: true })}
              disabled={isLoading || task.is_done === true}
            >
              Mark Complete
            </Button>
          )}
          {onDelete && (
            <Button 
              variant="outline" 
              size="sm"
              className="text-red-500 hover:text-red-600"
              onClick={() => onDelete(task.id)}
              disabled={isLoading}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <CreditCard className="h-4 w-4 mr-1 text-gray-500" />
              <span>{task.reward} {task.reward_type}</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-gray-500" />
              <span>Due: {new Date(task.date_time).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
); 