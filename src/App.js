import Alert from './components/Alert'
import LoginForm from './components/LoginForm'
import './App.css';

export default function App() {
  return (
    <>
      <div className="alert position-absolute" style={{ margin: 0, padding: 0, width: "100%" }}>
        <Alert />
      </div>
      <main style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
      }}>
        <LoginForm />
      </main>
    </>
  )
}