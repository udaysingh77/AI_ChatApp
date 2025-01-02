import {useContext} from 'react'
import {UserContext} from '../context/user.context.jsx'


const Home = () => {
  const {user} = useContext(UserContext)
  
  return (
    <main>
      <div className="projects">
        <button onClick={} className="project p-4 border border-slate-300 rounded-md">
        <i className="ri-link"></i>
        </button>
      </div>
    </main>
  )
}

export default Home