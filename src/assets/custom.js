document.getElementById("memeButton").addEventListener("click", fetchMeme);

async function fetchMeme() {
  const meme_container = document.getElementById("meme");

  const limit = 50;

  meme.innerHTML = "<p>...<p>";

  try {
    const resp = await fetch(
      `https://www.reddit.com/r/ProgrammerHumor/new.json?limit=${limit}`,
    );
    const data = await resp.json();

    if (
      data &&
      data.data &&
      data.data.children &&
      data.data.children.length > 0
    ) {
      const meme_actual =
        data.data.children[Math.floor(Math.random() * limit)].data;

      const html_to_insert = `
        <h2>${meme_actual.title}</h2>
        <img src = '${meme_actual.url}' alt = "This is a Meme">
        <p>Source: <a href="https://reddit.com${meme_actual.permalink}" target="_blank">Reddit</a></p>
      `;

      meme.innerHTML = html_to_insert;
    } else {
      memes.innerHTML =
        "<p>No memes here, sorry. (Yes, this is an error, either on this end or ProgrammerHumor's end.)";
    }
  } catch (error) {
    console.error("Error Fetching meme:", error);
    meme_container.innerHTML =
      "<p>Sorry! If you want to, check the console for errors (DM if you have suggestions for a fix).";
  }
}
