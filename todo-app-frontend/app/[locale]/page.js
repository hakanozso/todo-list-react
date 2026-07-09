"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect } from "react"
import { useState } from "react";

import toast, { Toaster } from 'react-hot-toast';

import { useTranslations, useLocale } from 'next-intl';


export default function Home() {

  const t = useTranslations('Home');
  const locale = useLocale();

  const [todos, setTodos] = useState([]);

  const [formData, setFormData] = useState({
    todoText: "",
    todoPriority: "LOW"
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

    setTodos(prev =>
      prev.map(todoI =>
        todoI.id === todoId
          ? { ...todoI, priority: "HIGH" }
          : todoI
      )
    );

    // console.log(todos[todos.findIndex((todo) => todo.id === todoId)])


    axios.post("http://localhost:8080/api/todo/edit",
      JSON.stringify({ todoId: todoId, todoText: todo.todo, todoPriority: todo.priority }), {
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
      ["todoText"]: ""
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
          <input type="text" name="todoText" onChange={handleInput} placeholder={t('addTodoPlaceholder')} />
          <button style={{ marginLeft: '5px' }}>{t('addTodo')}</button>
        </form>

      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>{t("id")}</th>
              <th>{t("todoDescription")}</th>
              <th>{t("todoPriority")}</th>
              <th>{t("action")}</th>
            </tr>
          </thead>

          <tbody>

            {todos.length > 0 ? (
              <>
                {todos?.map(todo =>
                  <tr key={todo.id}>

                    <td style={{ width: '10% !important' }}>{todo.id}</td>
                    <td><div id={"todoText" + todo.id} style={{ width: '98%', padding: '1%' }} suppressContentEditableWarning={true} contentEditable="true" spellCheck="false"
                    >{todo.todo}</div></td>

                    <td>

                      {todo.priority}

                      <select name="todos" id="todos" onChange={(e) =>
                        setTodos(prevTodos =>
                          prevTodos.map(todoI =>
                            todoI.id === todo.id
                              ? { ...todoI, priority: e.target.value }
                              : todoI
                          ))
                      } defaultValue={todo.priority}>

                        <option value="LOW">LOW</option>
                        <option value="MEDIUM" >MEDIUM</option>
                        <option value="HIGH" >HIGH</option>

                      </select>



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
