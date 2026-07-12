"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useMemo } from "react"
import { useState } from "react";

import toast, { Toaster } from 'react-hot-toast';

import { useTranslations, useLocale } from 'next-intl';


export default function Home() {

  const t = useTranslations('Home');
  const locale = useLocale();

  const [todos, setTodos] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    priority: "LOW",
    createdAt: new Date().toISOString()
  });

  const handleInput = (e) => {
    // console.log(e.target.name)
    // console.log(e.target.value)
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }




  const getAllTodos = async () => {
    let a = await fetch('http://localhost:8080/api/todo/getall');
    return await a.json();
  }



  const addTodo = (e) => {
    e.preventDefault()

    const formURL = "http://localhost:8080/api/todo/add"

    axios.post(formURL, JSON.stringify(formData), {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then((resp) => {
      if (resp.data.success) {
        setTodos([...todos, resp.data.data])
      }
      notify(resp.data.success, resp.data.message)


    })

  }


  const deleteTodo = (todoId) => {
    // e.preventDefault();

    axios.post("http://localhost:8080/api/todo/delete", JSON.stringify({ todoId: todoId }), {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then((resp) => {

      // console.log('resp', formData)
      // console.log('resp', resp)
      if (resp.data.success) {
        setTodos(todos.filter(td => td.id != todoId))
      }
      notify(resp.data.success, resp.data.message)
    })

  }

  const editTodo = (todoId) => {

    let todo = todos[todos.findIndex((todo) => todo.id === todoId)]

    // setTodos(prev =>
    //   prev.map(todoI =>
    //     todoI.id === todoId
    //       ? { ...todoI, priority: "HIGH" }
    //       : todoI
    //   )
    // );

    // console.log(todos[todos.findIndex((todo) => todo.id === todoId)])


    axios.post("http://localhost:8080/api/todo/edit",
      JSON.stringify({ id: todo.id, title: todo.title, priority: todo.priority }), {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then((resp) => {
      notify(resp.data.success, resp.data.message)
    })
  }

  useEffect(() => {
    getAllTodos().then((resp) => {
      // console.log('resp', resp)
      setTodos(resp.data)
    })


    setFormData((prevState) => ({
      ...prevState,
      ["title"]: ""
    }));
  }, [])




  const notify = (success, message) => (
    (success) ? (<b>{toast.success(message)}</b>) : (<b>{toast.error(message)}</b>)
  );


  const todoPriorityOptions = [
    "LOW",
    "MEDIUM",
    "HIGH"
  ];


  const todoPriorityOptionsSorted = [
    { value: "mostRecent", label: t("mostRecent") },
    { value: "leastRecent", label: t("leastRecent") },
    { value: "highToLow", label: t("highPriority") + " → " + t("lowPriority") },
    { value: "lowToHigh", label: t("lowPriority") + " → " + t("highPriority") },
    { value: "titleDesc", label: t("titleDesc") },
    { value: "titleAsc", label: t("titleAsc") }
  ];


  const [todoSortBy, setTodoSortBy] = useState("mostRecent");


  const sortedTodos = useMemo(() => {
    const list = [...todos];

    switch (todoSortBy) {
      case "mostRecent":
        list.sort((a, b) => b.id - a.id);
        break;

      case "leastRecent":
        list.sort((a, b) => a.id - b.id);
        break;

      case "highToLow":
        list.sort((a, b) => {
          const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
        break;

      case "lowToHigh":
        list.sort((a, b) => {
          const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
        break;

      case "titleAsc":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "titleDesc":
        list.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return list;
  }, [todos, todoSortBy]);




  return (

    <div className="container">

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2%' }}>
        <Link className="lang-btn" href={locale === "en" ? "/tr" : "/en"}>
          {locale === "en" ? "Turkish" : "English"}
        </Link>
      </div>

      <div style={{ border: '1px solid black', marginBottom: '2%', padding: '15px', borderRadius: "6px" }}>

        <h2>{t('todoManagement')}</h2>

        <form action="" onSubmit={addTodo}>
          <input type="text" name="title" onChange={handleInput} placeholder={t('addTodoPlaceholder')} />
          <button style={{ marginLeft: '5px' }}>{t('addTodo')}</button>
        </form>

      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2%' }}>

        <select
          style={{ padding: '5px', borderRadius: '6px', border: '1px solid black' }}
          name="todos" id="todos" onChange={(e) =>
            setTodoSortBy(e.target.value)
          } defaultValue={todoSortBy}>

          <option value="mostRecent">{t("mostRecent")}</option>
          <option value="leastRecent" >{t("leastRecent")}</option>
          <option value="highToLow" >{t("highPriority") + " → " + t("lowPriority")}</option>
          <option value="lowToHigh" >{t("lowPriority") + " → " + t("highPriority")}</option>
          <option value="titleAsc" >{t("titleAsc")}</option>
          <option value="titleDesc" >{t("titleDesc")}</option>

        </select>

      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>{t("id")}</th>
              <th>{t("todoTitle")}</th>
              <th>{t("todoPriority")}</th>
              <th>{t("todoCreatedDate")}</th>
              <th>{t("action")}</th>
            </tr>
          </thead>

          <tbody>

            {todos.length > 0 ? (
              <>
                {sortedTodos?.map(todo =>
                  <tr key={todo.id}>

                    <td style={{ textAlign: 'center' }}>{todo.id}</td>
                    <td>
                      <div id={"title" + todo.id} suppressContentEditableWarning={true} contentEditable="true" spellCheck="false"
                        style={{
                          maxWidth: "300px",
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                          padding: "2%",
                        }}

                        onInput={(e) => {
                          const updatedTitle = e.currentTarget.textContent;
                          setTodos(prevTodos =>
                            prevTodos.map(todoI =>
                              todoI.id === todo.id
                                ? { ...todoI, title: updatedTitle }
                                : todoI
                            ))
                        }}

                      >{todo.title}</div>
                    </td>

                    <td style={{ textAlign: 'center' }}>



                      <select
                        style={{ padding: '5px', borderRadius: '6px', border: '1px solid black', marginLeft: '10px' }}
                        name="todos" id="todos" onChange={(e) =>
                          setTodos(prevTodos =>
                            prevTodos.map(todoI =>
                              todoI.id === todo.id
                                ? { ...todoI, priority: e.target.value }
                                : todoI
                            ))
                        } defaultValue={todo.priority}>

                        <option value="LOW">{t('low')}</option>
                        <option value="MEDIUM" >{t('medium')}</option>
                        <option value="HIGH" >{t('high')}</option>

                      </select>



                    </td>


                    <td>

                      {new Date(todo.createdAt).toLocaleString(locale, { calendar: 'gregory', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}

                    </td>

                    <td>
                      <div className="action-buttons">
                        <button onClick={() => editTodo(todo.id)}>{t('edit')}</button>
                        <button onClick={() => deleteTodo(todo.id)}>{t('delete')}</button>
                      </div>
                    </td>

                  </tr>
                )}
              </>
            ) : (

              <tr>

                <td colSpan={3} style={{ textAlign: 'center' }}>{t("noTodo")}</td>
              </tr>

            )}


          </tbody>
        </table>
      </div>


      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div >

  );
}
