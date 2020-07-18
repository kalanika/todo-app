import React, { Component } from "react";
import { getList, addToList, deleteItem, updateComplete, updateActive, getActiveList, getCompleteList } from "../ListFunctions";

class List extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      term: "",
      editDisabled: false,
      isDone: false,
      items: [],
      activetaskcount: 0
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onActiveEdit = this.onActiveEdit.bind(this);
    this.onCompleteEdit = this.onCompleteEdit.bind(this);
    this.setActiveCount = this.setActiveCount.bind(this);
  }

  componentDidMount() {
    this.getAll();
    this.setActiveCount();

  }

  onChange = event => {
    event.preventDefault();
    this.setState({ term: event.target.value, editDisabled: "disabled" });
    console.log(this.state.editDisabled);
  };

  getAll = () => {
    this.setActiveCount();
    getList().then(data => {
      this.setState(
        {
          term: "",
          items: [...data]
        },
        () => {
          console.log(this.state.items.length);
        }
      );
    });
  };

  onSubmit = e => {
    e.preventDefault();
    addToList(this.state.term).then(() => {
      this.getAll();
    });
  };


  onActiveTaks = e => {
    getActiveList().then(data => {
      this.setState(
        {
          term: "",
          items: [...data],
          activetaskcount: data.length
        },
        () => {
          console.log(this.state.items.length);
        }
      );
    });
  };

  onCompleteTaks = e => {
    e.preventDefault();
    this.setActiveCount();
    getCompleteList().then(data => {
      this.setState(
        {
          term: "",
          items: [...data]
        },
        () => {
          console.log(this.state.items);
        }
      );
    });

  };


  onAllTasks = e => {
    e.preventDefault();
    this.setActiveCount();
    getList().then(data => {
      this.setState(
        {
          term: "",
          items: [...data]
        },
        () => {
          console.log(this.state.items);
        }
      );
    });

  };



  onActiveEdit = (item, itemid, event) => {
    this.setActiveCount();
    this.setState({
      id: itemid,
      term: item,

    });
    updateActive(item, itemid).then(() => {
      this.getAll();
    });
  };

  setActiveCount = () => {
    getActiveList().then(data => {
      this.setState(
        {

          activetaskcount: data.length
        },
      );
    });
  }

  onCompleteEdit = (item, itemid, event) => {
    this.setActiveCount();
    console.log(itemid)
    console.log(item)

    this.setState({
      id: itemid,
      term: item,
    });
    updateComplete(item, itemid).then(() => {
      this.getAll();
    });
  };

  onDelete = (val, e) => {
    this.setActiveCount();
    deleteItem(val);

    var data = [...this.state.items];
    data.filter(function (item, index) {
      if (item[1] === val) {
        data.splice(index, 1);
      }
      return true;
    });
    this.setState({ items: [...data] });

  };

  render() {
    return (
      <div className="col-md-12">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Enter Task Name</label>
            <div className="row">
              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={this.state.term || ""}
                  onChange={this.onChange.bind(this)}
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <button
                type="submit"
                onClick={this.getAll.bind(this)}
                className="btn btn-secondary btn-block"
              >
                All
          </button>
            </div>
            <div class="col">
              <button
                type="submit"
                onClick={this.onActiveTaks.bind(this)}
                className="btn btn-secondary btn-block"
              >
                Active
          </button>
            </div>
            <div class="col">
              <button
                type="submit"
                onClick={this.onCompleteTaks.bind(this)}
                className="btn btn-secondary btn-block"
              >
                Completed
          </button>
            </div>
          </div>

        </form>
        <table className="table">
          <tbody>
            {this.state.items.map((item, index) => (
              <tr key={index}>
                <td className="text-left">{item[0]}</td>
                <td className="text-right">
                  <label>
                    Active
                  <input

                      value="Active"
                      type="radio"
                      id="ss"
                      name="status"
                      onChange={this.onActiveEdit.bind(this, item[0], item[1])} />
                  </label>
                  <label>
                    Completed
                  <input
                      name="status"
                      id="sss"
                      value="Complete"
                      type="radio"

                      onChange={this.onCompleteEdit.bind(this, item[0], item[1])} />
                  </label>

                  <button
                    href=""
                    className="btn btn-info"
                    onClick={this.onDelete.bind(this, item[1])}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h4>Active task count  :{this.state.activetaskcount}</h4>
      </div>
    );
  }
}

export default List;