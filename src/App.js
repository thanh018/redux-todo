import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import {connect} from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taskEditing: null,
			filter : {
					name: '',
					status: -1
			},
			keyword: '',
			sortBy: 'name',
			sortValue: 1
		}
	}

    // onGenerateData = () => {
    //     var tasks = [
    //         {
    //             id: this.generateID(),
    //             name: 'Angular',
    //             status: true
    //         },
    //         {
    //             id: this.generateID(),
    //             name: 'React',
    //             status: false
    //         },
    //         {
    //             id: this.generateID(),
    //             name: 'Nodejs',
    //             status: true
    //         }
    //     ];
    //     console.log(tasks);
    //     this.setState({
    //         tasks: tasks
    //     });
    //     localStorage.setItem('tasks', JSON.stringify(tasks));
    // }

    // s4() {
    //     return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    // }
    // generateID() {
    //     return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() ;
    // }

    onToggleForm = () => {
			// if(this.state.isDisplayForm && this.state.taskEditing !== null) {
			//     this.setState({
			//         isDisplayForm : true,
			//         taskEditing: null
			//     });
			// }
			// else {
			//     this.setState({
			//         isDisplayForm : !this.state.isDisplayForm,
			//         taskEditing: null
			//     });
			// }
			this.props.onToggleForm();
    }

    onShowForm = () => {
        this.setState({
            isDisplayForm: true
        });
    }

    onSubmit = (data) => {
        console.log(data);
        var {tasks} = this.state;
        if(data.id === '') {
            data.id = this.generateID();
            tasks.push(data);
        }
        else {
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }

        this.setState({
            tasks : tasks,
            taskEditing: null
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // onUpdateStatusonUpdateStatus = (id) => {
    //     //console.log(id);
    //     var {tasks} = this.state;
    //     var index = this.findIndex(id);
    //     //console.log(index);

    //     if(index !== -1) {
    //         tasks[index].status = !tasks[index].status;
    //         this.setState({
    //             tasks : tasks
    //         });
    //         localStorage.setItem('tasks', JSON.stringify(tasks));
    //     }
    // }

    findIndex = (id) => {
        var {tasks} = this.state;
        var result = -1;
        tasks.forEach((task, index)=>{
            if(task.id === id) {
                //console.log(index);
                result = index;
            }
        });
        return result;
    }

    onDelete = (id) => {
        //console.log(id);
        var index = this.findIndex(id);
        var {tasks} = this.state;
        //console.log(index);
        if(index !== -1) {
            tasks.splice(index, 1);
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        this.onCloseForm();
    }

    onUpdate = (id) => {
        var {tasks} = this.state;
        var index = this.findIndex(id);
        // console.log(index);
        var taskEditing = tasks[index];
        this.setState({
            taskEditing : taskEditing
        });
        // console.log(taskEditing);
        this.onShowForm();
    }
    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter : {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        });

    }

    onSearch = (keyword) => {
        //console.log(keyword);
        this.setState({
            keyword: keyword
        });
    }

    onSort = (sortBy, sortValue) => {
        // console.log(sortBy, sortValue);
        this.setState({
            sortBy: sortBy,
            sortValue: sortValue
        })
        //console.log(this.state);
    }

    render() {
        var {
            taskEditing,
            // filter,
            // keyword,
            sortBy,
            sortValue 
				} = this.state; 
				var {isDisplayForm} = this.props;
				//var tasks = this.state.tasks
        //console.log(filter);
        // if(filter) {
        //     if(filter.name) {
        //         tasks = tasks.filter((task) => {
        //             return task.name.toLowerCase().indexOf(filter.name) !== -1;
        //         });
        //     }
        //     tasks = tasks.filter((task) => {
        //         if(filter.status === -1) {
        //             return task;
        //         }
        //         else {
        //             return task.status === (filter.status === 1 ? true : false)
        //         }
        //     });
        // }
        // console.log(sortBy, sortValue);
        // if(keyword) {
        //     tasks = tasks.filter((task) => {
        //         return task.name.toLowerCase().indexOf(keyword) !== -1;
        //     });
        // }

        // if(sortBy === 'name') {
        //     tasks.sort((a, b) => {
        //         if(a.name > b.name) return sortValue;
        //         else if(a.name < b.name) return -sortValue;
        //         else return 0;
        //     });
        // }
        // else {
        //     tasks.sort((a, b) => {
        //         if(a.status > b.status) return -sortValue;
        //         else if(a.status < b.status) return sortValue;
        //         else return 0;
        //     });
        // }

        var eleTaskForm = isDisplayForm ?
            <TaskForm
                onSubmit = {this.onSubmit}
                task = { taskEditing }
            />
            : '';
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr/>
                </div>
                <div className="row">
                    <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
                        {/* {Form} */}
                        {eleTaskForm}
                    </div>

                    <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.onToggleForm}
                        >
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>&nbsp;
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={this.onGenerateData}
                            >
                            Gernerate Data
                        </button>
                        <Control
                            onSearch = {this.onSearch}
                            onSort ={this.onSort}
                            sortBy ={sortBy}
                            sortValue ={sortValue}

                        />
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList
                                    onUpdateStatus = {this.onUpdateStatus}
                                    onDelete = {this.onDelete}
                                    onUpdate = {this.onUpdate}
                                    onFilter = {this.onFilter}
                            />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = state => {
	return {
		isDisplayForm: state.isDisplayForm
	};
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		onToggleForm : () => {
			dispatch(actions.toggleForm());
		}
	};
}

export default connect(mapStatetoProps, mapDispatchToProps)(App);
