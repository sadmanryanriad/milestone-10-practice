import { Link } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://second-server.vercel.app/")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  const handleAddData = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);
    fetch("https://second-server.vercel.app/data", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchData();
        form.reset();
        toast.success("User Added Successfully!");
      });
  };

  const handleDeleteButton = (id) => {
    console.log(id);
    fetch(`https://second-server.vercel.app/data/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchData();
      });
  };

  return (
    <>
      <div>
        <Toaster></Toaster>
        <div>
          <h1>Total data: {data.length}</h1>
          <form onSubmit={handleAddData}>
            <input type="text" name="name" />
            <br />
            <input type="text" name="email" />
            <br />
            <input type="submit" value="Add data" />
          </form>
        </div>
        <div>
          {data.map((el) => (
            <p key={el._id}>
              {el._id} : {el.name} : {el.email}{" "}
              <Link to={`/update/${el._id}`}>
                <button>Update</button>
              </Link>{" "}
              <button onClick={() => handleDeleteButton(el._id)}>X</button>
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
