import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import './HomePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import OwlImg from '../assets/owl-question-clipart-xl.png'
import { useGetTodosQuery, useCreateTodoMutation, useDeleteTodoMutation } from '../slices/todoApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useLogoutUserMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';


function HomePage() {

    const { userInfo } = useSelector((state) => state.auth)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const { data: todos, refetch } = useGetTodosQuery({ userId: userInfo?._id })
    const [logoutUser] = useLogoutUserMutation()


    const [createTodo] = useCreateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            let response = await createTodo({ title, description, userId: userInfo?._id }).unwrap()

            toast.success("Boom! Your to-do’s in the list", {
                className: 'toast-success'
            });

            refetch()
            setTitle('')
            setDescription('')
        } catch (error) {
            toast.error(error?.message || error?.data?.message || "Something went wrong!", {
                className: "toast-error"
            });

        }
    }

    const deleteHandler = async (id) => {
        try {
            let response = await deleteTodo(id).unwrap()
            refetch()
            toast.success("Poof! Task gone like magic", {
                className: 'toast-success'
            });
        } catch (error) {
            console.log(error?.message || error?.data?.message);
        }
    }

    const logoutHandler = async () => {
        try {
            await logoutUser().unwrap()
            await dispatch(logout())
            toast.success("Peace out! See you next time", {
                className: 'toast-success'
            });
            navigate('/login')
        } catch (error) {
            toast.error(error?.message || error?.data?.message || "Something went wrong!", {
                className: "toast-error"
            });
        }
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
    }, [])


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
                        <h4 className='text-light'>Let's Accomplish Task Together, <span className="fw-bold text-capitalize"> {userInfo?.name}</span> !</h4>
                    </div>
                    <div className="image-box">
                        <img src={OwlImg} alt="Owl Thinking" className='img' />
                    </div>
                </div>
                <div className="logout-wrapper">
                    <button className="logout-btn" onClick={() => logoutHandler()}>
                        LogOut
                    </button>
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
                                        <p className={item?.isCompleted ? 'completed' : null}>{index + 1} Title : {item.title}</p>
                                        <p className={item?.isCompleted ? 'completed' : null}>Description : {item.description}</p>
                                    </div>
                                    <div className="buttons ms-auto d-flex flex-column pe-3">
                                        {!item.isCompleted && (
                                            <button onClick={() => navigate(`/edit/${item._id}`)}><FontAwesomeIcon icon={faPen} style={{ cursor: "pointer" }} /></button>
                                        )}
                                        <button className='pt-2' onClick={() => deleteHandler(item._id)}>
                                            <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer" }} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Either you're super fast… or it's still loading!</p>
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage

