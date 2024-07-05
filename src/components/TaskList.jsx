import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { name: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <div className="mb-4">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-center mb-2">
            <Checkbox checked={task.completed} onCheckedChange={() => toggleTaskCompletion(index)} />
            <span className={`ml-2 ${task.completed ? "line-through" : ""}`}>{task.name}</span>
            <Button variant="outline" size="sm" className="ml-auto" onClick={() => setSelectedTask(task)}>Edit</Button>
            <Button variant="destructive" size="sm" className="ml-2" onClick={() => deleteTask(index)}>Delete</Button>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <Input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Add a new task" />
        <Button onClick={addTask} className="ml-2">Add</Button>
      </div>

      {selectedTask && (
        <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>
                Make changes to your task here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="taskName">Task Name</Label>
                <Input id="taskName" value={selectedTask.name} onChange={(e) => setSelectedTask({ ...selectedTask, name: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="taskDescription">Description</Label>
                <Textarea id="taskDescription" value={selectedTask.description || ""} onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })} />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setSelectedTask(null)}>Cancel</Button>
              <Button onClick={() => {
                const updatedTasks = tasks.map((task) => task.name === selectedTask.name ? selectedTask : task);
                setTasks(updatedTasks);
                setSelectedTask(null);
              }}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TaskList;