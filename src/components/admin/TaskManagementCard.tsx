import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types';

interface TaskManagementCardProps {
  task: Task;
  onUpdate: (taskId: number, updates: Partial<Task>) => void;
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
              task.is_done ? 'default' : 'secondary' 
            }>
              {task.is_done ? "Completed" : "In Progress"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm">
              Reward: {task.reward} {"AT"}
            </span>
            <span className="text-sm">
              Due: {new Date(task.date_time).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onUpdate(task.id, { is_done: true })}
            disabled={isLoading || task.is_done}
          >
            Complete
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
      {task.responsible_users_ids && task.responsible_users_ids.length > 0 && (
        <div className="mt-4">
          <span className="text-sm text-muted-foreground">
            Assigned to: {task.responsible_users_ids.join(', ')}
          </span>
        </div>
      )}
    </CardContent>
  </Card>
); 