"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect } from "react"
import { useState } from "react";

import toast, { Toaster } from 'react-hot-toast';


export default function Home() {


  const [todos, setTodos] = useState([]);

  const [formData, setFormData] = useState({
    todoText: "",
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

  const editTodo = (todoId, todoText) => {

    axios.post("http://localhost:8080/api/todo/edit",
      JSON.stringify({ todoId: todoId, todoText: document.getElementById('todoText' + todoId).textContent.trim() }), {
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

  return (

    <div className="container">

      <div className="centered" style={{ border: '1px solid black', marginBottom: '2%', padding: '15px' }}>
        <h2>Todo Ekle</h2>

        <form action="" onSubmit={addTodo}>
          <input type="text" name="todoText" onChange={handleInput} placeholder="Todo giriniz." />
          <button style={{ marginLeft: '5px' }}>Ekle</button>
        </form>

      </div>

      <table className="centered">
        <thead>
          <tr>

            <th>ID</th>
            <th>Todo</th>
            <th>Action</th>
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
                  <td><button onClick={() => editTodo(todo.id)}>Düzenle</button>&nbsp;<button onClick={() => deleteTodo(todo.id)}>Sil</button></td>
                </tr>
              )}
            </>
          ) : (

            <tr>

              <td colSpan={3} style={{ textAlign: 'center' }}>Todo bulunamadı</td>
            </tr>

          )}

          {/* {todos?.map(todo =>
            <tr key={todo.id}>

              <td style={{ width: '10% !important' }}>{todo.id}</td>
              <td><div id={"todoText" + todo.id} style={{ width: '98%', padding: '1%' }} suppressContentEditableWarning={true} contentEditable="true" spellCheck="false"
              >{todo.todo}</div></td>
              <td><button onClick={() => editTodo(todo.id)}>Düzenle</button>&nbsp;<button onClick={() => deleteTodo(todo.id)}>Sil</button></td>
            </tr>
          )} */}
        </tbody>
      </table>


      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>

  );
}
