import React from "react";
import task from "../components/Task/Task";
import { GetDB } from "../actions/getDB";
import axios from "axios";

const db = {
  lists: [
    {
      id: 1,
      name: "Продажи",
      colorId: 5,
    },
    {
      id: 2,
      name: "Фронтенд",
      colorId: 4,
    },
    {
      id: 3,
      name: "Фильмы и сериалы",
      colorId: 3,
    },
    {
      id: 4,
      name: "Книги",
      colorId: 2,
    },
    {
      id: 5,
      name: "Личное",
      colorId: 1,
    },
    {
      id: 6,
      name: "Спорт",
      colorId: 3,
    },
    {
      id: 7,
      name: "Курс по ReactJS ToDo",
      colorId: 7,
    },
  ],
  tasks: [
    {
      id: 1,
      listId: 2,
      text: "Изучить JavaScript",
      completed: true,
    },
    {
      id: 2,
      listId: 2,
      text: "Изучить паттерны проектирования",
      completed: false,
    },
    {
      id: 3,
      listId: 2,
      text: "ReactJS Hooks (useState, useReducer, useEffect и т.д.)",
      completed: true,
    },
    {
      id: 4,
      listId: 2,
      text: "Redux (redux-observable, redux-saga)",
      completed: false,
    },
    {
      listId: 2,
      text: "123",
      completed: true,
      id: 5,
    },
    {
      listId: 1,
      text: "test",
      completed: false,
      id: 6,
    },
    {
      listId: 1,
      text: "qweqwe",
      completed: false,
      id: 7,
    },
    {
      listId: 1,
      text: "qweqwe",
      completed: true,
      id: 8,
    },
    {
      listId: 1,
      text: "123",
      completed: false,
      id: 9,
    },
    {
      listId: 4,
      text: "Купить 1984!",
      completed: true,
      id: 10,
    },
    {
      listId: 2,
      text: "222",
      completed: true,
      id: 12,
    },
    {
      listId: 7,
      text: "Сделали сайдбар",
      completed: true,
      id: 15,
    },
    {
      listId: 7,
      text: "Сделали список задач",
      completed: true,
      id: 16,
    },
    {
      listId: 7,
      text: "Сделали удаление и редактирование задач и списков",
      completed: true,
      id: 17,
    },
    {
      listId: 8,
      text: "tttt",
      completed: false,
      id: 18,
    },
  ],
  colors: [
    {
      id: 1,
      hex: "#C9D1D3",
      name: "grey",
    },
    {
      id: 2,
      hex: "#42B883",
      name: "green",
    },
    {
      id: 3,
      hex: "#64C4ED",
      name: "blue",
    },
    {
      id: 4,
      hex: "#FFBBCC",
      name: "pink",
    },
    {
      id: 5,
      hex: "#B6E6BD",
      name: "lime",
    },
    {
      id: 6,
      hex: "#C355F5",
      name: "purple",
    },
    {
      id: 7,
      hex: "#110133",
      name: "black",
    },
    {
      id: 8,
      hex: "#FF6464",
      name: "red",
    },
  ],
};

export const AppContext = React.createContext(null);
export const AppProvider = ({ children }) => {
  const [lists, setLists] = React.useState([]);
  const [tasks, setTasks] = React.useState([]);
  const [colors, setColors] = React.useState([]);
  const [selectedListId, setSelectedListId] = React.useState(null);
  const [isTaskSending, setIsTaskSending] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [listsResponse, tasksResponse, colorsResponse] =
          await Promise.all([
            axios.get("https://emsa.herokuapp.com/lists"),
            axios.get("https://emsa.herokuapp.com/tasks"),
            axios.get("https://emsa.herokuapp.com/colors"),
          ]);

        setLists(listsResponse.data);
        setTasks(tasksResponse.data);
        setColors(colorsResponse.data);
      } catch (err) {
        alert("Ошибка приполучении данных");
      }
    }

    fetchData();
  }, []);

  const addNewFolder = async (obj) => {
    await axios
      .post("https://emsa.herokuapp.com/lists", {
        ...obj,
      })
      .then((resp) => {
        setLists([...lists, { ...resp.data }]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteList = async (id) => {
    await axios
      .delete(`https://emsa.herokuapp.com/lists/${id}`)
      .then((resp) => {
        if (resp.statusText === "OK") {
          console.log("ok");
        }
        setLists(lists.filter((list) => list.id !== id));
        setTasks(tasks.filter((task) => task.listId !== id));
        selectedListId === id && setSelectedListId(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleIsCompleted = (taskId) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          task.completed = !task.completed;

          axios
            .patch(`https://emsa.herokuapp.com/tasks/${taskId}`, {
              completed: task.completed,
            })
            .then((resp) => {
              if (resp.statusText === "OK") {
                console.log("ok");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
        return task;
      })
    );
  };
  const addTask = async (listId, text) => {
    setIsTaskSending(true);
    await axios
      .post("https://emsa.herokuapp.com/tasks", {
        listId,
        text,
        completed: false,
      })
      .then((resp) => setTasks([...tasks, { ...resp.data }]))
      .catch((error) => console.log(error))
      .finally(() => setIsTaskSending(false));
  };
  const deleteTask = async (id) => {
    await axios
      .delete(`https://emsa.herokuapp.com/tasks/${id}`)
      .then((resp) => {
        if (resp.statusText === "OK") {
          console.log("ok");
        }
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editTitle = async (value, id) => {
    if (value.trim()) {
      await axios
        .patch(`https://emsa.herokuapp.com/lists/${id}`, {
          name: value,
        })
        .then((resp) => {
          if (resp.statusText === "OK") {
            setLists(
              lists.map((list) => {
                if (list.id === id) {
                  list.name = value;
                }
                return list;
              })
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    //  {
    //
    // }
  };

  const value = {
    lists,
    setLists,
    tasks,
    colors,
    addNewFolder,
    deleteList,
    selectedListId,
    setSelectedListId,
    toggleIsCompleted,
    addTask,
    deleteTask,
    editTitle,
    isTaskSending
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
