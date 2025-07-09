import React, { useEffect, useState } from 'react';
import './EditPage.css'
import { useParams, useNavigate } from 'react-router-dom';
import { useGetTodoByIdQuery, useUpdateTodoMutation, useGetTodosQuery } from '../slices/todoApiSlice';

function EditPage() {

  const { id } = useParams()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)

  const { data: todo, refetch } = useGetTodoByIdQuery({ id })
  const [updateTodo] = useUpdateTodoMutation()
  const {data, refetch : getAllTodos} = useGetTodosQuery()

  const navigate = useNavigate()

  const editHandler = async (e) => {
    e.preventDefault()
    try {
      await updateTodo({
        title,
        description,
        isCompleted,
        id
      }).unwrap()

      setTitle('')
      setDescription('')
      setIsCompleted(false)

      refetch()
      getAllTodos()

      navigate('/')

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(todo){
      setTitle(todo?.title)
      setDescription(todo?.description)
      setIsCompleted(todo?.isCompleted)
    }
  }, [todo])

  return (
    <>
      <div className="container-fluid screen" style={{ minHeight: '100vh' }}>
        <div className="main-box m-auto p-5" style={{ height: 'fit-content' }}>
          <div className="form-box text-light text-center">
            <form onSubmit={editHandler}>
              <h2>Edit. Improve. Achieve!</h2>
              <div className="fields d-flex flex-column gap-3 pt-4">
                <input type="text" placeholder='Enter Title' className='p-2 text-light' value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder='Enter description' className='p-2 text-light' value={description} onChange={(e) => setDescription(e.target.value)} />
                <select value={isCompleted.toString()} onChange={(e) => setIsCompleted(e.target.value === "true")} className='p-2 text-light'>
                  <option value="false" className='p-2 text-light'>Pending</option>
                  <option value="true" className='p-2 text-light'>Completed</option>
                </select>
                <button type='submit' className='p-2'>UPDATE</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  );
}

export default EditPage;
