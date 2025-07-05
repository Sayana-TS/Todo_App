import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import './HomePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import OwlImg from '../assets/owl-question-clipart-xl.png'
import { useGetTodosQuery, useCreateTodoMutation, useDeleteTodoMutation } from '../slices/todoApiSlice';

function HomePage() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const { data: todos, refetch } = useGetTodosQuery()
    const [createTodo] = useCreateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()


    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            let response = await createTodo({ title, description }).unwrap()
            refetch()
            setTitle('')
            setDescription('')
        } catch (error) {
            console.log(error?.message || error?.data?.message);
        }
    }

    const deleteHandler = async (id) => {
        try {
            let response = await deleteTodo(id).unwrap()
            refetch()
        } catch (error) {
            console.log(error?.message || error?.data?.message);
        }
    }


    return (
        <>
            <div className="container-fluid d-flex flex-wrap main-screen" style={{ minHeight: '100vh' }}>
                <div className="design d-flex flex-column gap-2 pt-3 order-1">
                    <div className="design-row d-flex gap-2">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="design-row d-flex gap-2">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="design-row d-flex gap-2">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="design-row d-flex gap-2">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="design-row d-flex gap-2">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="design-row d-flex gap-2">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className="left-screen d-flex flex-column m-auto order-1">
                    <div className="headings pb-5">
                        <h1 className='pb-3'>ToDo App</h1>
                        <h4 className='text-light'>Let's Accomplish Task Together !</h4>
                    </div>
                    <div className="image-box">
                        <img src={OwlImg} alt="Owl Thinking" className='img' />
                    </div>
                </div>
                <div className="main-box ms-auto mt-5 p-5 order-2 order-md-1" style={{ height: 'fit-content' }}>
                    <div className="form-box text-light text-center">
                        <form action="" onSubmit={submitHandler}>
                            <h2>Get Things Done !</h2>
                            <div className="fields d-flex flex-column gap-3 pt-4">
                                <input type="text" placeholder='Enter Title' className='p-2 text-light' value={title} onChange={(e) => setTitle(e.target.value)} />
                                <input type="text" placeholder='Enter description' className='p-2 text-light' value={description} onChange={(e) => setDescription(e.target.value)} />
                                <button className='p-2'>ADD</button>
                            </div>
                        </form>
                    </div>
                    <div className="display text-light pt-3 mt-4">
                        {todos && todos.length > 0 ? (
                            todos.map((item, index) => (
                                <div className='display-box d-flex flex-row mb-3' key={item._id}>
                                    <div>
                                        <p>{index + 1} Title : {item.title}</p>
                                        <p>Description : {item.description}</p>
                                    </div>
                                    <div className="buttons ms-auto d-flex flex-column pe-3">
                                        <button><FontAwesomeIcon icon={faPen} style={{ cursor: "pointer" }} /></button>
                                        <button className='pt-2' onClick={() => deleteHandler(item._id)}>
                                            <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer" }} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No todos found or still loading...</p>
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage

