import React from "react";

interface Todo {
  id: number;
  name: string;
  description: string;
}

const Todo = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [todo, setTodo] = React.useState<Todo>();
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!name) {
      alert("name is required");
      return;
    }
    if (!description) {
      alert("description is required");
      return;
    }
    const newTodo: Todo = {
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
      name,
      description,
    };
    setName("");
    setDescription("");
    setTodos([...todos, newTodo]);
  };

  const onDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onEdit = () => {
    setTodos(
      todos.map((data) => {
        if (todo && data.id === todo.id) {
          data = todo;
        }
        return data;
      })
    );
    setTodo(undefined);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={name}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setName(e.currentTarget.value)
          }
        />
        <input
          value={description}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setDescription(e.currentTarget.value)
          }
        />
        <input type="submit" />
      </form>
      <div>
        {todos.map((data: Todo) => {
          const { id, name, description } = data;
          return (
            <div className="flex justify-between" key={id}>
              {todo && todo.id === id ? (
                <div>
                  <form>
                    <span>{todo.id}</span>
                    <input
                      value={todo.name}
                      onChange={(e: React.FormEvent<HTMLInputElement>) =>
                        setTodo({ ...todo, name: e.currentTarget.value })
                      }
                    />
                    <input
                      value={todo.description}
                      onChange={(e: React.FormEvent<HTMLInputElement>) =>
                        setTodo({ ...todo, description: e.currentTarget.value })
                      }
                    />
                  </form>
                  <button type="button" onClick={() => onEdit()}>
                    Save
                  </button>
                  <button type="button" onClick={() => setTodo(undefined)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex justify-between flex-1 mr-2">
                  <div>{id}</div>
                  <div>{name}</div>
                  <div>{description}</div>
                </div>
              )}

              <div>
                <button onClick={() => setTodo(data)}>Edit</button>
                <button onClick={() => onDelete(id)} type="button">
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
