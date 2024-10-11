"use client"
import { useEffect, useState } from "react"

export default function TodoList() {
  const [title, setTitle] = useState<string>("")
  const [desc, setDesc] = useState<string>("")
const [mainTask, setMainTask] = useState<(string | number | { title: string; desc: string})[]>([]);


useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
      setMainTask(savedTodos);
    }
  }, []);

  useEffect(() =>  {
    if (typeof window !== "undefined") {
      localStorage.setItem("todos", JSON.stringify(mainTask));
    }}, [mainTask]);


  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMainTask([...mainTask, { title, desc }]);
    setTitle("");
    setDesc("");
  }

  function deleteHandler(i: number) {
    const copyTask:(string | number | {title: string;desc: string})[] = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  }

let renderTask: JSX.Element[] | string = "No task added";
  if (mainTask.length > 0) {
    renderTask = mainTask
      .filter((value) => typeof value === "object" && "title" in value && "desc" in value)
      .map((value: { title: string; desc: string }, i: number) => {
        return (
          <li className="flex justify-between items-center" key={i}>
            <div className="flex justify-between items-center w-2/4">
              <h5 className="font-black">{value.title}</h5>
              <h6 className="font-semibold">{value.desc}</h6>
            </div>
            <button
              className="bg-red-600 px-2 py-1 rounded mb-3"
              onClick={() => {
                deleteHandler(i);
              }}
            >
              Delete
            </button>
          </li>
        );
      });
  }

  return (
    <div className="h-screen w-full bg-red-500">
      <h1 className="bg-black text-white text-center text-xl p-2 md:text-3xl">
        Owais Khan&apos;s Todo List
      </h1>
      <form className="m-3 flex flex-col items-center md:flex-row" onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="Type your task here"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="border-black border-2 px-3 py-1 m-8"
        />
        <input
          type="text"
          placeholder="Type description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="border-black border-2 px-3 py-1 m-8"
        />
        <button type="submit" className="bg-black rounded text-white px-2 py-1">
          Add task
        </button>
      </form>
      <hr />
      <div className=" bg-slate-700 p-2">
        <h1 className="font-semibold">{renderTask} </h1>
      </div>
    </div>
  );
}
