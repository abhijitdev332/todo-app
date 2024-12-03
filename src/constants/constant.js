const sidebar=JSON.parse(localStorage.getItem("sidebar"))??
[
    {
        id:Math.floor(Math.random()*100),
        title:"grocery",
        link:"grocery",
        bg:"#27AE60"
    },
    {
        id:Math.floor(Math.random()*100),
        title:"work",
        link:"work",
        bg:"#2F80ED"
    },
    {
        id:Math.floor(Math.random()*100),
        title:"study",
        link:"study",
        bg:"#F2994A"
    },
    {
        id:Math.floor(Math.random()*100),
        title:"sport",
        link:"sport",
        bg:"#9B51E0"
    }
]


export {sidebar}