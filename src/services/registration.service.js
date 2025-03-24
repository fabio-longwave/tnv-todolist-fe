export const signUp = async (signUpData) => {
    try {
        const response = await fetch("http://localhost:8000/api/user", {
            method: "POST",
            contentType: "application/json",
            body: JSON.stringify(signUpData)
        })
        const data = await response.json();

        if (response.ok) {
            return data
        } else {
            throw new Error("Something went wrong");
        }
    } catch(error){
        console.error(error);
    }
}