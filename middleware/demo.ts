/**
 *
 */
class Middleware {
  constructor(parameters) {
    this.tasks = [this.task_1, this.task_2, this.task_3]
  }
  private tasks: Function[]
  public run = (req, res) => {
    const next = () => {
      const task = this.tasks.shift()
      let type = Object.prototype.toString.call(task)
      if (type.includes('Function')) {
        task(req, res, next)
      }
    }
    next()
  }
  private task_1 = (req, res, next) => {
    console.log('task_1 start')
    next()
  }
  private task_2 = (req, res, next) => {
    console.log('task_2 start')
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 3000)
    })
      .then((result) => {
        next()
      })
      .catch((err) => {})
  }
  private task_3 = (req, res, next) => {
    console.log('task_3 start')
    next()
  }
}
const middleware = new Middleware(null)
middleware.run(null, null)
module.exports = Middleware
