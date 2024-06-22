export async function sendVote(map1, map2, voted) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT_URL}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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
