import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { type AdminTask } from '@/store/admin';

interface TaskManagementCardProps {
  task: AdminTask;
  onUpdate: (taskId: number, updates: Partial<AdminTask>) => void;
  onDelete: (taskId: number) => void;
  isLoading?: boolean;
}

export const TaskManagementCard = ({ task, onUpdate, onDelete, isLoading }: TaskManagementCardProps) => (
  <Card className="mb-4">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">{task.title}</h3>
            <Badge variant={
              task.priority === 'high' ? 'destructive' :
              task.priority === 'medium' ? 'default' :
              'secondary'
            }>
              {task.priority}
            </Badge>
            <Badge variant={
              task.status === 'completed' ? 'default' :
              task.status === 'in_progress' ? 'secondary' :
              'outline'
            }>
              {task.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm">
              Reward: {task.reward} {task.rewardType}
            </span>
            <span className="text-sm">
              Due: {new Date(task.deadline).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onUpdate(task.id, { status: 'completed' })}
            disabled={isLoading || task.status === 'completed'}
          >
            Mark Complete
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="text-red-500 hover:text-red-600"
            onClick={() => onDelete(task.id)}
            disabled={isLoading}
          >
            Delete
          </Button>
        </div>
      </div>
      {task.progress > 0 && (
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{task.progress}%</span>
          </div>
          <Progress value={task.progress} />
        </div>
      )}
      {task.assignedTo && task.assignedTo.length > 0 && (
        <div className="mt-4">
          <span className="text-sm text-muted-foreground">
            Assigned to: {task.assignedTo.join(', ')}
          </span>
        </div>
      )}
    </CardContent>
  </Card>
); 