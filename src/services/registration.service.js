export const signUp = async (signUpData) => {
    try {
        const response = await fetch("http://localhost:8000/user", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(signUpData)
        })
        const data = await response.json();

        if (response.ok) {
            return data
        }
    } catch(error){
        console.error(error);
    }
}