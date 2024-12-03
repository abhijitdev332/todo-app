let object=JSON.parse(localStorage.getItem("todos"))

let todos =object.length>0?object:
[
    {
      id: 1,
      title: "this is todo",
      createdAt: "29/11/2024",
      status: "pending",
      category: "work",
    },
    {
      id: 2,
      title: "this is second todo",
      createdAt: "29/11/2024",
      status: "completed",
      category: "grocery",
    },
  ];

  export default todos