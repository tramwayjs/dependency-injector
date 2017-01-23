import MainController from "../controllers/MainController";

const routesValues = [
    {
        "methods": ["get"],
        "controller": MainController.index
    },
    {
        "arguments": ["id"],
        "path": "get",
        "methods": ["get"],
        "controller": MainController.get
    },
    {
        "methods": ["get"],
        "path": "create",
        "controller": MainController.create
    },
    {
        "arguments": ["id"],
        "path": "update",
        "methods": ["get"],
        "controller": MainController.update
    },
    {
        "arguments": ["id"],
        "path": "delete",
        "methods": ["get"],
        "controller": MainController.delete
    },
    
];

export default routesValues;