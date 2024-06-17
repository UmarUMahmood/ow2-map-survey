export async function sendVote(map1, map2, voted) {
    try {
        const response = await fetch("http://localhost:3000/vote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                map1: map1,
                map2: map2,
                voted: voted
            })
        })
        if (response.ok) {
            console.log("Successfully sent votes to server")
        }
    } catch (err) {
        console.error("Error sending votes to the server: ", err)
    }
}