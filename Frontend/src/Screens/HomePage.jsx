import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import Backend from '../Axios';
import './HomePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import OwlImg from '../assets/owl-question-clipart-xl.png'

function HomePage() {

    let [todos, setTodos] = useState([]);

    const getTodos = async () => {
        try {
            let data = await Backend.get("/getTodos");

            setTodos(data.data);
        } catch (error) {
            console.log(error?.message || error?.data?.message);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);


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
                        <h4 className='text-light'>Let's Accomplish Task Together!</h4>
                    </div>
                    <div className="image-box">
                        <img src={OwlImg} alt="Owl Thinking" className='img' />
                    </div>
                </div>
                <div className="main-box ms-auto me-5 mt-5 p-5 order-2 order-md-1" style={{ height: 'fit-content' }}>
                    <div className="form-box text-light text-center">
                        <form action="">
                            <h2>Get Things Done!</h2>
                            <div className="fields d-flex flex-column gap-3 pt-4">
                                <input type="text" placeholder='Enter Title' className='p-2 text-light' />
                                <input type="text" placeholder='Enter description' className='p-2 text-light' />
                                <button className='p-2'>ADD</button>
                            </div>
                        </form>
                    </div>
                    <div className="display text-light pt-5">
                        {todos.map((item, index) => (
                            <p className='p-2 d-flex flex-row'>
                                <div key={index}>
                                    <p>
                                        {index + 1} Title : {item.title}
                                    </p>
                                    <p>Description : {item.description}</p>
                                </div>
                                <div className="buttons ms-auto d-flex flex-column pe-2">
                                    <button><FontAwesomeIcon icon={faPen} style={{ cursor: "pointer" }} /></button>
                                    <button className='pt-2'><FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer" }} /></button>
                                </div>
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage

