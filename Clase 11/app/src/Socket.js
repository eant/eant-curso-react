import abrirSocket from "socket.io-client"

class Socket {
  constructor(){
    this.socket = abrirSocket("http://localhost:9000", { forceNew : true })
  }

  async getAll(callback){
    await this.socket.on('tasks_emit', data => {
      let tasks = data.map( element => {
  				return {
  					id : element.$loki,
  					created : element.meta.created,
  					title : element.title,
  					responsible : element.responsible,
  					description : element.description,
  					priority : element.priority
  				}
      })
      callback && callback(tasks)
    })

  }
  async create(task){
    this.socket.emit('task_create', task)
  }
  async delete(task){
    this.socket.emit('task_delete', task)
  }
}
export default Socket
