export const getActivities = async (token) => {
    try {
        const response = await fetch("http://localhost:8000/activity", {
            method: "GET",
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        })
        const data = await response.json();

        if (response.ok) {
            return data
        }
    } catch(error){
        console.error(error);
    }
}