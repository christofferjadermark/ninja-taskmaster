import {  useState,useEffect, FormEvent } from "react";

function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    if(localStorage.getItem("user_id")){
      fetch('http://localhost:8080/' + localStorage.getItem("user_id"))
      .then(response => response.json())
      .then(result => {
        setData(result)
        console.log(result)
      })
      .catch(error => console.error(error));
    }
  },[] )
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: localStorage.getItem("user_id"),
          title: title,
          description:description,
          date: date,
        }),
      });
      console.log(response)
      if (response.ok) {
        console.log("Tillagd")
      } else {
        console.log("Inte tillagd")
      }
    } catch (error) {
      console.log("fel")
      // Handle ne twork or server error
    }
  };
  const handleDelete = (activity: number) => {
    fetch('http://localhost:8080/delete/' + activity, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data: any) => {
        console.log('Objektet har tagits bort:', data);
      })
      .catch((error: Error) => {
        console.error('Fel vid borttagning av objektet:', error);
      });
  };
  return <div><ul>
  {data.map((item, index) => (
    <div className="bg-gray-100 rounded-lg shadow-lg p-4 relative mb-4 max-w-md mx-auto" key={index}>
    <h2 className="text-xl font-semibold mb-2 text-secondary">{item["title"]}</h2>
    <p className="text-gray-700 mb-2">Description: {item["description"]}</p>
    <p className="text-gray-700">Date: {item["due_date"]}</p>
    <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500 focus:text-red-500" onClick={() => handleDelete(item["activity_id"])}>Delete</button>
  </div>
  ))}

</ul>
<form className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md" onSubmit={handleSubmit}>
  <div className="mb-4">
    <label htmlFor="title" className="block text-gray-700">Title</label>
    <input
      type="text"
      id="title"
      className="form-input mt-1 block w-full rounded-md border-gray-300 focus:outline-none focus:ring focus:border-sky-500"
      placeholder="Enter title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  </div>
  <div className="mb-4">
    <label htmlFor="description" className="block text-gray-700">Description</label>
    <input
      type="text"
      id="description"
      className="form-input mt-1 block w-full rounded-md border-gray-300 focus:outline-none focus:ring focus:border-sky-500"
      placeholder="Enter description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
  </div>
  <div className="mb-4">
    <label htmlFor="date" className="block text-gray-700">Date</label>
    <input
      type="date"
      id="date"
      className="form-input mt-1 block w-full rounded-md border-gray-300 focus:outline-none focus:ring focus:border-sky-500"
      placeholder="Select date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />
  </div>
  <button
    type="submit"
    className="btn bg-secondary text-primary px-4 py-2 rounded-md hover:bg-blue-600"
  >
    Skicka
  </button>
</form>
</div>
}

export default App
