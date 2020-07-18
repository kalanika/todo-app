import axios from "axios";

export const getList = () => {
  return axios
    .get("http://localhost:5000/api/tasks", {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      return res.data
    });
};

export const getActiveList = () => {
  return axios
    .get('http://localhost:5000/api/tasks', {
      headers: { "Content-Type": "application/json" }
    }
    ).then(response => {
      var activeList = response.data.filter(function (activeitem) {
        return activeitem[2] === false;

      });
      console.log(activeList)
      return activeList
    });
};

export const getCompleteList = () => {
  return axios
    .get('http://localhost:5000/api/tasks',
      {
        headers: { "Content-Type": "application/json" }
      }
    ).then(response => {
      var completedList = response.data.filter(function (completeditem) {
        return completeditem[2] === true;
      });
      return completedList
    });
};

export const addToList = term => {
  return axios
    .post(
      "http://localhost:5000/api/task",
      {
        title: term
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(function (response) {
      console.log(response);
    });
};

export const deleteItem = term => {
  axios
    .delete(`http://localhost:5000/api/task/${term}`, {
      headers: { "Content-Type": "application/json" }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const updateActive = (term, id) => {
  console.log("updateItem Listfunction class");
  console.log(id);
  return axios
    .put(
      `http://localhost:5000/api/task/${id}`,
      {
        title: term,
        isDone: false
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(function (response) {
      console.log(response);
    });
};

export const updateComplete = (term, id) => {
  console.log("updateItem Listfunction class");
  console.log(id);
  return axios
    .put(
      `http://localhost:5000/api/task/${id}`,
      {
        title: term,
        isDone: true
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(function (response) {
      console.log(response);
    });
};