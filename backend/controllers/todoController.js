import Todos from "../model/todoModel.js";

const createTodo = async (req, res)=>{
    try {
        let {title, description} = req.body

        let newTodo = await Todos.create({
            title,
            description
        })

        res.json(newTodo)

    } catch (error) {
        console.log(error)
    }
}


const getTodo = async (req, res) => {
    try {
        const todos = await Todos.find()
        res.json(todos)
    } catch (error) {
        res.status(500).json(error)
    }
}


const deleteTodo = async (req, res) => {
    try {
        const deleted = await Todos.findByIdAndDelete(req.params.id)

        if(!deleted){
            return res.status(404).json({ message : 'Todo not found '})
        }

        res.json({ message : 'Todo deleted successfully'})

    } catch (error) {
        res.status(500).json(error)
    }
}


export {
    createTodo,
    getTodo,
    deleteTodo
}