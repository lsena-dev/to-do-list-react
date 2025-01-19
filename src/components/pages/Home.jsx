import { useEffect, useState } from "react";

// components provided by me
import apiRequest from "../services/Connect";
import SimpleTable from "../tables/SimpleTable";
import SimpleModal from "../pop-ups/Modal";
//bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({});
  const [taskDescription, setTaskDescription] = useState("");

  //modal update
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => {
    setTaskDescription("");
    setShowUpdate(false);
  };
  const handleShowUpdate = (id) => {
    getTask(id);
    setShowUpdate(true);
  };

  //modal delete
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => {
    setTaskDescription("");
    setShowDelete(false);
  };
  const handleShowDelete = (id) => {
    getTask(id);
    setShowDelete(true);
  };

  // FILL IN THE TABLE
  useEffect(() => {
    apiRequest("GET")
      .then((data) => {
        console.log(data);
        setTasks(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function createTask(e) {
    e.preventDefault();

    // Verifica se o campo está vazio ou contém apenas espaços
    if (taskDescription.trim() === "") {
      alert("A descrição da tarefa não pode estar vazia!");
      return; // Interrompe a execução da função
    }

    const calculateId = tasks.length > 0 ? Number(tasks.length) + 1 : 1;

    const newTask = {
      id: calculateId.toString(),
      description: taskDescription,
      concluded: false,
    };

    apiRequest("POST", "", newTask)
      .then(() => {
        setTasks([...tasks, newTask]);
        setTaskDescription("");
      })
      .catch((err) => console.log(err));
  }

  function getTask(id) {
    apiRequest("GET", id)
      .then((data) => {
        console.log(data);
        setTaskDescription(data.description);
        setCurrentTask(data);
      })
      .catch((err) => console.log(err));
  }

  function updateTask(e) {
    e.preventDefault();

    if (taskDescription.trim() === "") {
      alert("A descrição da tarefa não pode estar vazia!");
      return;
    }

    const updatedTask = {
      id: currentTask.id,
      description: taskDescription,
      concluded: currentTask.concluded,
    };

    // update the list of tasks in the component state
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );

    apiRequest("PATCH", currentTask.id, updatedTask)
      .then((data) => {
        console.log(data);
        handleCloseUpdate();
      })
      .catch((err) => console.log(err));
  }

  function deleteTask() {
    apiRequest("DELETE", currentTask.id)
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== currentTask.id)
        );
        handleCloseDelete();
      })
      .catch((err) => console.log(err));
  }

  function toggleTaskCompletion(taskId) {
    const task = tasks.find((t) => t.id === taskId);

    if (task) {
      const updatedTask = { ...task, concluded: !task.concluded };
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskId ? updatedTask : t))
      );

      apiRequest("PATCH", taskId, updatedTask).catch((err) =>
        console.log("Erro ao atualizar a tarefa", err)
      );
    }
  }

  return (
    <Container>
      {/* =====================DELETE=========================== */}
      <SimpleModal
        show={showDelete}
        headModal="Deseja deletar essa atividade?"
        close={handleCloseDelete}
      >
        <p className="text-center">{currentTask.description}</p>
        <hr />
        <Button
          variant="danger"
          className="col-12"
          onClick={() => deleteTask()}
        >
          Deletar
        </Button>
      </SimpleModal>

      {/* =====================CREATE=========================== */}
      <Form onSubmit={createTask}>
        <Form.Group className="m-3" controlId="formCreateTask">
          <div className="d-flex justify-content-around">
            <Form.Control
              type="text"
              placeholder="Nova atividade"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            <Button variant="success" type="submit">
              Adicionar
            </Button>
          </div>
        </Form.Group>
      </Form>

      {/* =====================UPDATE=========================== */}
      <SimpleModal
        show={showUpdate}
        headModal="Atualizar atividade"
        close={handleCloseUpdate}
      >
        <Form onSubmit={updateTask}>
          <Form.Group className="mb-3" controlId="formCreateTask">
            <Form.Label>Descrição da atividade</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            <div className="d-flex justify-content-end mt-3">
              <Button variant="success" type="submit" className="col-auto">
                atualizar
              </Button>
            </div>
          </Form.Group>
        </Form>
      </SimpleModal>

      {/* =====================TABLE=========================== */}
      <SimpleTable
        columns={["ID", "Descrição", "Ação"]}
        content={tasks.map((task) => [
          task.id,
          task.description,
          <>
            <Button
              variant="warning"
              key={`btn-update-task-${task.id}`}
              onClick={() => handleShowUpdate(task.id)}
              className="me-3"
            >
              <i className="bi bi-pencil-square"></i>
            </Button>
            <Button
              variant="danger"
              key={`btn-delete-task-${task.id}`}
              onClick={() => handleShowDelete(task.id)}
            >
              <i className="bi bi-x-square"></i>
            </Button>
          </>,
          task.concluded,
        ])}
        onRowDoubleClick={toggleTaskCompletion}
      />
    </Container>
  );
}
