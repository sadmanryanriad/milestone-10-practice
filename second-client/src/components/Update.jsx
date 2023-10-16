import { useLoaderData, useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();

  const loadedData = useLoaderData();

  const handleAddData = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);
    fetch(`http://localhost:5000/data/${id}`,{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
    })
  };

  return (
    <div>
      <h2>update here: </h2>
      <form onSubmit={handleAddData}>
        <input type="text" name="name" defaultValue={loadedData.name} />
        <br />
        <input type="text" name="email" defaultValue={loadedData.email} />
        <br />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default Update;
