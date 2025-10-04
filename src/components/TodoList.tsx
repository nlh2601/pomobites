import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DraggableCard } from "@/components/DraggableCard";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  transparent?: boolean;
}

export const TodoList = ({ transparent = false }: TodoListProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("pomobites-todos");
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pomobites-todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now().toString(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id: string) => {
    if (editText.trim()) {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, text: editText } : todo
      ));
    }
    setEditingId(null);
    setEditText("");
  };

  return (
    <DraggableCard title="To-Do List" icon="📝" transparent={transparent}>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <Button onClick={addTodo} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-2 p-2 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
              />
              {editingId === todo.id ? (
                <>
                  <Input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit(todo.id);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    className="flex-1 h-8"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => saveEdit(todo.id)}
                    className="h-8 w-8"
                  >
                    ✓
                  </Button>
                </>
              ) : (
                <>
                  <span
                    className={`flex-1 text-sm cursor-pointer ${
                      todo.completed ? "line-through text-muted-foreground" : ""
                    }`}
                    onDoubleClick={() => startEdit(todo)}
                  >
                    {todo.text}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>

        {todos.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-4">
            No tasks yet. Add one to get started! 🚀
          </p>
        )}
      </div>
    </DraggableCard>
  );
};