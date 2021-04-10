import { Container } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Definitions from "./components/Definitions/Definitions";
import Header from "./components/Header/Header";

//Hooks Initialization
function App() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState("en");

  //Fetching Api Data
  const dictionaryApi = async () => {
    // var app_id = "1ddd9d59";
    // var app_key = "862017c4b60e9d0d342c2722648cf86b";
    try {
      const data = await axios.get(
        // `https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v2/${category}/${word}`
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );
      console.log(data);
      setMeanings(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dictionaryApi();
    // eslint-disable-next-line
  }, [word, category]);

  //Returning different components
  return (
    <div className='App'>
      <Container
        maxWidth='md'
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-evenly",
        }}
      >
        <Header
          setWord={setWord}
          category={category}
          setCategory={setCategory}
          word={word}
          setMeanings={setMeanings}
        />
        {meanings && <Definitions meanings={meanings} word={word} />}
      </Container>
    </div>
  );
}

export default App;
